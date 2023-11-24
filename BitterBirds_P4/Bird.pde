class Bird {

  float xPos;//x and y positions of the bird
  float yPos;//^^^^^
  float speedx;//speeds of the bird
  float speedy;//^^^^^
  float size;//size variable(radius), is used often
  float mouseBirdDist;
  float birdSlingDist;
  float alpha = 255; //used for dying animation
  int dieTime = 0; //for dying function **CURRENTLY 0 FOR A FASTER-PACED GAME**
  boolean launched;
  boolean birdDragged = false;  //for alunching mechanism
  boolean drawStrings = true;   //cosmetics
  boolean leftSide;             //^^^^^
  boolean rightSide;            //^^^^^
  boolean slingPassed = false;  //^^^^^
  boolean dead = false;  //for checking if the bird is dead
  boolean stopped = false;  //becomes true when bird comes to a stop
  boolean checkStopped = true;
  boolean dropBird = false;
  color bodyclr;//colour of body
  color beakclr;//colour of beak
  


  Bird (float x, float y, float xspeed, float yspeed, float tempSize, color tempbodyclr, color tempbeakclr) {

    xPos = x;
    yPos = y;
    speedx = xspeed;
    speedy = yspeed;
    size = tempSize;
    bodyclr = tempbodyclr;
    beakclr = tempbeakclr;
  }

  void move() {//simple move function
    xPos += speedx;
    yPos += speedy;
  }


  void launchBird() {  //launching mechanism; interaction between the sling and the bird(s)

    mouseBirdDist = dist(mouseX, mouseY, xPos, yPos);  //determines the distance between the cursor and the bird

    birdSlingDist = dist(xPos, yPos, sling.getStartx(), sling.getStarty());  //determines the distance from the bird to th initial launch position

    if (mousePressed && mouseBirdDist <= size && launched == false) {  //activates if the cursor is over the bird and the bird is not launched yet

      birdDragged = true;
    } else if (mousePressed == false && birdSlingDist >= 50 && birdDragged) {  //activates if the mouse is released after picking the bird up

      launched = true;  //makes it impossible to drag bird around after it has been launched
      birdDragged = false;  //the bird is not being dragged

      speedx = (sling.getStartx() - xPos)/8;  //uses distance from resting x to dragged-to x to make speed; it is divided so the bird is not too fast
      speedy = (sling.getStarty() - yPos)/7;  //uses distance from resting y to dragged-to y to make speed; divided by 7 so launch looks believable

      speedx = constrain(speedx, -20, 20);  //makes sure the speed does not get too high
      speedy = constrain(speedy, -30, 30);  //^^^^^
      
    } else if (mousePressed == false && birdSlingDist < 50 && birdDragged) {  //resets the bird to starting position if it is let go too close to the sling 

      xPos = sling.getStartx();  //resets postion
      yPos = sling.getStarty();  //^^^^^

      birdDragged = false;  //ensures the bird is not in a launched state
      launched = false;     //^^^^^
      slingPassed = false;  //^^^^^
    }

    if (birdDragged) {
      xPos = mouseX;  //allows user to postion bird for launch
      yPos = mouseY;  //^^^^^
      xPos = constrain (xPos, sling.getStartx() - 170, sling.getStartx() + 170);  //constrains postion so string cannot be streched infinitely
      yPos = constrain (yPos, sling.getStarty() - 170, sling.getStarty() + 170);  //^^^^^

      if (xPos <= sling.getStartx()) {  //for cosmetic purposes(keeps string in view until bird is released fully)
        leftSide = true;
        rightSide = false;
      } else if (xPos > sling.getStartx()) {  //^^^^^
        leftSide = false;
        rightSide = true;
      }
    }

    if (launched) {
      birdDragged = false;
      if (dead == false) {
        gravity();  //applies physics
      }
      
      move();     //^^^^^

      if (slingPassed == false) {
        if (leftSide && rightSide == false) {

          //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
          if (xPos >= sling.getStartx()) {
            slingPassed = true;           //Basic check to detect to draw strings or not
          } else slingPassed = false;
          //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
        }

        if (leftSide == false && rightSide) {

          //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
          if (xPos < sling.getStartx()) {
            slingPassed = true;           //Basic check to detect to draw strings or not
          } else slingPassed = false;
          //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
        }
      }
    }

    if (slingPassed) {
      drawStrings = false;  //stops displaying strings when bird is past the sling
    } else if (slingPassed == false) {
      drawStrings = true;   //keeps displaying strings while bird is not past the sling
    }
  }

  void wallBounce() {  //bounces off the edges of the screen, top and sides may be removed

    if (xPos - size <= 0) {  //left side, probably not in final game
      speedx *= -0.5;
      xPos = 0 + size;
    }

    if (xPos + size >= width) {  //right side, probably not in final game
      speedx *= -0.5;
      xPos = width - size;
    }

    /*if (yPos - size <= 0) {//will probably not be in final game
     speedy *= -0.5;
     yPos = 0 + size;
     }*/

    //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
    if (yPos + size >= env.getGroundHeight()) {
      speedy *= -0.45;
      yPos = height - height/10 - size;

      if (speedx < 1.5 && speedx > -1.5) {
        speedx = 0;
      } else if (speedx < - 1) {              //This block of code allows the bird to lose horizontral energy when 
        speedx += 0.8;                        //it hits the ground and keeps it from bouncing infinitely
      } else if (speedx > 1) {
        speedx -= 0.8;
      }

      if (speedx == 0 && dead == false) {// makes the bird completely stop moving
        speedy = 0;
      }
    }
    //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\


    if (checkStopped) {  //"checkstopped" boolean is used for the "die" function
      if (speedx == 0 && speedy == 0 && launched) {  //even though bird speed is 0 when it is in the sling, this check ignores that
        stopped = true;  //used in "die" function, possibly others
      } //else stopped = false;
    }
  }

  void gravity() {//simple gravity function
    speedy += globalGravity;
    //println(speedx + " " + speedy + " " + launched);
  }

  void display() {//displays the bird(**I may add more types of birds on the future**)


    //println(speedx + " " + speedy);  //Debugging


    ellipseMode(RADIUS);//sets drawing mode and other things
    strokeWeight(size/8);
    stroke(0, alpha);

     /*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*\
     most of the drawing uses size variable for the proportions
     \*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/


    //draw the body
    fill(bodyclr, alpha);//uses prev. initialized colour variable
    ellipse(xPos, yPos, size, size);

    //draw the beak
    fill(beakclr, alpha);
    triangle(xPos + (size/2), yPos, xPos + (size *1.5), yPos + (size/2), xPos, yPos + (size/2));

    //draw the eyes
    fill(255, alpha);
    ellipse(xPos, yPos - (size/4), size/4, size/4);
    ellipse(xPos + size, yPos - (size/4), size/4, size/4);
    fill(0, alpha);

    //Draw the pupils
    ellipse(xPos + (size/8), yPos - (size/4), size/8, size/8);
    ellipse(xPos + size + (size/8), yPos - (size/4), size/8, size/8);

    //Draw the eyebrows
    line(xPos - (size/4), yPos - (size/2), xPos + (size/4), yPos - (size/2));
    line(xPos + size - (size/4), yPos - (size/2), xPos + size + (size/4), yPos - (size/2));
  }

  void reset() {

    alpha = 255;
    size = int(random(15, 20));
    launched = false;
    slingPassed = false;
    speedx = 0;
    speedy = 0;
    xPos = sling.getStartx();
    yPos = sling.getStarty();
    dead = false;
    checkStopped = true;
    dropBird = false;
  }

  void die () {  //the process of the bird stopping, waiting, fading, and resetting onto the slingshot

    //println(millis() + " " + dieTime);  //for debugging


    if (stopped == true) {

      dieTime = millis() + 0;  //No delay now, but can be modified to have a delay by changing 0
      checkStopped = false;  //Stops the previous check for the "stopped" boolean in order for the function to only run once
      stopped = false;  //Also so the function runs once
      dead = true;
    }

    if (millis() >= dieTime && dead) {
      yPos -= 0.5;  //Bird slowly rises
      alpha -= 6;  //Bird slowly fades
      if (alpha <= 0) {
        xPos = sling.getStartx();
        yPos = -50;
        alpha = 255;
        dead = false;        //So the bird appears to fall from the heavens
        gravity();
        speedy = 15;
        dropBird = true;
      }
    }
    if (yPos >= sling.getStarty() && dropBird) {
      reset();
    }
  }


  float getSize() {//allows size to be used outside of this object
    return size;
  }

  float getx() {//allows the x position to be use outside of this object
    return xPos;
  }

  float gety() {//allows the y position to be used outside of this object
    return yPos;
  }

  void setx (float x) {//allows x position to be changed outside of object exclusive constructor/functions
    xPos = x;
  }

  void sety (float y) {//allows y position to be changed outside of object exclusive constructor/functions
    yPos = y;
  }

  void setSpeedx(float x) {//allows x speed to be changed after initialization
    speedx = x;
  }

  void setSpeedy(float y) {//allows y speed to be changed after initialization
    speedy = y;
  }
  
  void setDead(boolean dead) {//For manual respawning of bird
    stopped = dead;
  }

  float getSpeedx() {
    return speedx;
  }

  float getSpeedy() {
    return speedy;
  }

  boolean getDrawStrings() {
    return drawStrings;
  }

  boolean getLaunched() {
    return launched;
  }

  boolean getStopped() {
    return stopped;
  }
  
  boolean getDragged() {
    return birdDragged;
  }
  
  boolean getPassed() {
    return slingPassed;
  }

  boolean isDead() {
    return dead;
  }
}