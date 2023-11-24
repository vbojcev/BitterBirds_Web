float globalGravity = 0.3;  //Gravity value for all objects affected by physics

float pointMultiplier = 1;  //Award more or less points to player according to difficulty level

float points;  //Amount of points the player has; is calculated as a float so that fractions of a point can be added, displayed later as an int so that no decimals appear on the screen

int difficulty;  //Level of ifficulty - 1, 2, and 3

int eggStartx = 300;  //For the eggs array, allows any number of eggs to exist without issue

int eggsCount = 3;  //How many eggs exist, used to initialize size of array and acts as a counter for how many eggs are left

int eggsArray = eggsCount;  //^^^^^

boolean startUp = true;  //Used to display or not display start screen

boolean gameOver = false;  //Used to display or not display start screen

boolean enablePredictor = false;  //For difficulty levels

boolean enableReset = false; //For difficulty levels

UI ui = new UI();  //Declares and initializes the graphical user interface

Egg[] eggs = new Egg[eggsArray];  //Declares and initializes the array used for the eggs

//Arraylist used for the many small balls that predict the trajectory of the bird
ArrayList <Prediction> predictor;  //Learned from the ListBall example and Daniel Shiffman's "Nature of Code" webseries, chapter 4

Bird bird;  //declares the singular bird object

SlingShot sling;  //Declares the singular sling object

Environment env;  //Declares the environment object

Pig pig;  //declares the sinular pig object

PFont font;  //Declares the font, is called font because it's the only font ever used

void setup() {

  size (1920, 1080);  //For windowed mode, almost the whole game scales with resolution

  frameRate(60);  //For buttery smooth gameplay

  smooth();  //For sharp visuals, somehow more laggy without it

  //fullScreen();  //Default running mode, game can adapt to smaller screens (displays as small as 1280 * 720 work well, but pig speeds will be faster relative to screen size)

  env = new Environment();  //Background and foreground environment and its effects

  sling = new SlingShot (200, height - height/10, 50, color(#58320B));  //Slingshot object

  bird = new Bird (sling.getStartx(), sling.getStarty(), 0, 0, 20, color(255, 0, 0), color(255, 255, 0));  //Bird object, one one exists because only one is on screen at any given time

  pig = new Pig ( 2/*type of pig*/, width + 50, height/2, random(-5, -2), 0, 50, 1/* 1=red, 2 = blue, 3 = green*/);  //Pig object, Player must hit it

  font = createFont("angrybirds-regular.ttf", 64);  //Loads the font used throughout the whole game

  predictor = new ArrayList<Prediction>();  //Initialization for the predictor feature

  for (int i = 0; i < eggs.length; i ++) {  //Spawns all of the eggs

    eggs[i] = new Egg (eggStartx, height - height / 10 - 30);

    eggStartx += 50;
  }

}

void draw() {
  
  background(0); // seems redundant, but is used to make the sky into nighttime
  
  env.drawField();  //Draws the whole environment

  if (gameOver == false && startUp == false) {  //So game does not run at the same time as the heom screen and game over screen


    sling.drawBehind();  //So it gives the effect of layers
    sling.drawStringsRight(bird.getDrawStrings());  //diffrent functions for drawing both strings so one is behind and one is in front of the bird

    //\/\/\/\/\/\/\/\/\/\
    pig.display();
    pig.move();        //The pig's code
    pig.balloonPop();
    pig.die();
    //\/\/\/\/\/\/\/\/\/\

    //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
    if (bird.getDragged() && enablePredictor) {

      predictor.add(new Prediction());

      for (int i = 0; i < predictor.size(); i ++) {

        Prediction p = predictor.get(i);
                                                          //Prediction feature, using an ArrayList
        p.predict();
        p.display();

        if (p.dead()) {
          predictor.remove(0);
        }
      }
    }
    //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\


    bird.display();  //Displays the bird
    
    //println(pointMultiplier + "  " + points);  //Debugging

    //println(bird.getx() + " " + bird.gety());  //Debugging
    sling.drawStringsLeft(bird.getDrawStrings());
    sling.drawFront();

    //\/\/\/\/\/\/\/\/\/\
    bird.wallBounce();
    bird.launchBird();      //Bird gameplay and physics
    bird.die();
    //\/\/\/\/\/\/\/\/\/\

    for (int i = 0; i < eggs.length; i++) {

      if (eggs[i].getEaten() == false) {
        eggs[i].display();                    //Code for the eggs
        eggs[i].getStolen();
      }
    }

    //\/\/\/\/\/\/\/\
    textFont(font, 75);  //Sets size for point counter
    text((int)points, width/2, height/2);  //Point counter, text variable is a float but is displayed as an integer so there is no decimals
    //\/\/\/\/\/\/\/\
    
    if (ui.getDiff() == "Dodo") {  //If the difficulty string rturns as "Dodo", allow the use of the reset button (this is specifically for mobile(mobile support!))
      
      ui.resetButton();
      
    }
    
  } else if (gameOver) {  //Game over/restart screen
    ui.displayEnd();
  } else if (startUp) {  //Start up/restart screen
    ui.displayStart();
  }

  if (eggsCount <= 0) {  //It is game over if there is no eggs left
    gameOver = true;
  }
}

void keyPressed() {
  if (key == ' ' && bird.getLaunched() && bird.getPassed() && enableReset) {  //On PC, press space to reset the bird
    //bird.reset();
    bird.setDead(true);
    bird.setSpeedx(0);
    bird.setSpeedy(0);
  }
}