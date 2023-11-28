let globalGravity = 0.3; //Gravity value for all objects affected by physics

let pointMultiplier = 1; //Award more or less points to player according to difficulty level

let points = 0; //Amount of points the player has; is calculated as a float so that fractions of a point can be added, displayed later as an int so that no decimals appear on the screen

let difficulty; //Level of ifficulty - 1, 2, and 3

let eggStartx = 300; //For the eggs array, allows any number of eggs to exist without issue

let eggsCount = 3; //How many eggs exist, used to initialize size of array and acts as a counter for how many eggs are left

let eggsArray = eggsCount; //^^^^^

let startUp = true; //Used to display or not display start screen

let gameOver = false; //Used to display or not display start screen

let enablePredictor = false; //For difficulty levels

let enableReset = false; //For difficulty levels

let ui = new UI(); //Declares and initializes the graphical user interface

let eggs = [{}, {}, {}]; //Declares and initializes the array used for the eggs

//Arraylist used for the many small balls that predict the trajectory of the bird
predictor = []; //Learned from the ListBall example and Daniel Shiffman's "Nature of Code" webseries, chapter 4

let bird; //declares the singular bird object

let sling; //Declares the singular sling object

let env; //Declares the environment object

let pig; //declares the sinular pig object

let font; //Declares the font, is called font because it's the only font ever used

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight); //For windowed mode, almost the whole game scales with resolution

  cnv.style('display', 'block');

  frameRate(60); //For buttery smooth gameplay

  smooth(); //For sharp visuals, somehow more laggy without it

  //fullScreen();  //Default running mode, game can adapt to smaller screens (displays as small as 1280 * 720 work well, but pig speeds will be faster relative to screen size)

  env = new Environment(); //Background and foreground environment and its effects

  sling = new SlingShot(200, height - height / 10, 50, color('#58320B')); //Slingshot object

  bird = new Bird(
    sling.getStartx(),
    sling.getStarty(),
    0,
    0,
    20,
    color(255, 0, 0),
    color(255, 255, 0),
    globalGravity
  ); //Bird object, one one exists because only one is on screen at any given time

  pig = new Pig(
    2 /*type of pig*/,
    width + 50,
    height / 2,
    random(-5, -2),
    0,
    50,
    1 /* 1=red, 2 = blue, 3 = green*/,
    globalGravity,
    env.getGroundHeight()
  ); //Pig object, Player must hit it

  font = loadFont('angrybirds-regular.ttf'); //Loads the font used throughout the whole game

  predictor = []; //Initialization for the predictor feature

  for (let i = 0; i < eggsCount; i++) {
    //Spawns all of the eggs

    eggs[i] = new Egg(eggStartx, height - height / 10 - 30);

    eggStartx += 50;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0); // seems redundant, but is used to make the sky into nighttime

  env.drawField(); //Draws the whole environment

  if (gameOver == false && startUp == false) {
    //So game does not run at the same time as the heom screen and game over screen

    sling.drawBehind(); //So it gives the effect of layers
    sling.drawStringsRight(
      bird.getDrawStrings(),
      bird.getx(),
      bird.gety(),
      bird.getSize()
    ); //diffrent functions for drawing both strings so one is behind and one is in front of the bird

    //\/\/\/\/\/\/\/\/\/\
    pig.display(bird.getx(), bird.gety());
    pig.move(
      bird.isDead(),
      bird.getx(),
      bird.gety(),
      bird.getSize(),
      bird.getLaunched()
    ); //The pig's code
    pig.balloonPop();
    pig.die();
    //\/\/\/\/\/\/\/\/\/\

    //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
    if (bird.getDragged() && enablePredictor) {
      predictor.push(new Prediction(globalGravity));

      for (let i = 0; i < predictor.length; i++) {
        predictor[i].predict(sling.getStartx(), sling.getStarty());
        predictor[i].display();

        if (predictor[i].isDead() || bird.isDead()) {
          predictor.shift();
        }
      }
    }
    //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

    bird.display(); //Displays the bird

    //println(pointMultiplier + "  " + points);  //Debugging

    //println(bird.getx() + " " + bird.gety());  //Debugging
    sling.drawStringsLeft(
      bird.getDrawStrings(),
      bird.getx(),
      bird.gety(),
      bird.getSize()
    );
    sling.drawFront();

    //\/\/\/\/\/\/\/\/\/\
    bird.wallBounce(env.getGroundHeight());
    bird.launchBird(sling.getStartx(), sling.getStarty()); //Bird gameplay and physics
    bird.die(sling.getStartx(), sling.getStarty());
    //\/\/\/\/\/\/\/\/\/\

    for (let i = 0; i < eggsCount; i++) {
      /*if (eggs[i].getEaten() == false) {
        eggs[i].display(); //Code for the eggs
        eggs[i].getStolen();
      }*/

      if (!eggs[i].isEaten()) {
        eggs[i].display(pig.getx(), pig.gety(), pig.getSize());

        if (pig.getx() <= eggs[i].getx() && !eggs[i].isStolen()) {
          pig.setSpeed(-1);
          eggs[i].setStolen(true);
        }

        if (eggs[i].getx() >= width + (eggs[i].getSize() * 3) / 4) {
          eggs[i].setEaten(true);
          eggsCount--;
        }
      }
    }

    //\/\/\/\/\/\/\/\
    textFont(font, 75); //Sets size for point counter
    text(int(points), width / 2, height / 2); //Point counter, text variable is a float but is displayed as an integer so there is no decimals
    //\/\/\/\/\/\/\/\

    if (ui.getDiff() == 'Dodo') {
      //If the difficulty string rturns as "Dodo", allow the use of the reset button (this is specifically for mobile(mobile support!))

      ui.resetButton();
    }
  } else if (gameOver) {
    //Game over/restart screen
    ui.displayEnd(font);
  } else if (startUp) {
    //Start up/restart screen
    ui.displayStart(font);
  }

  if (eggsCount <= 0) {
    //It is game over if there is no eggs left
    gameOver = true;
  }

  function keyPressed() {
    if (key == ' ' && bird.getLaunched() && bird.getPassed() && enableReset) {
      //On PC, press space to reset the bird
      //bird.reset();
      bird.setDead(true);
      bird.setSpeedx(0);
      bird.setSpeedy(0);
    }
  }
}
