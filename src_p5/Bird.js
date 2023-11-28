function Bird(
  x,
  y,
  xspeed,
  yspeed,
  tempSize,
  tempbodyclr,
  tempbeakclr,
  globalGrav
) {
  this.xPos = x; //x and y positions of the bird
  this.yPos = y;
  this.speedx = xspeed; //speeds of the bird
  this.speedy = yspeed;
  this.size = tempSize; //size variable(radius), is used often
  this.bodyclr = tempbodyclr;
  this.beakclr = tempbeakclr;
  this.mouseBirdDist = 0;
  this.birdSlingDist = 0;
  this.alpha = 255; //used for dying animation
  this.dieTime = 0; //for dying function **CURRENTLY 0 FOR A FASTER-PACED GAME**
  this.launched = false; //for alunching mechanism
  this.birdDragged = false; //for alunching mechanism

  this.birdDragged = false; //for alunching mechanism
  this.drawStrings = true; //cosmetics
  this.leftSide = true; //^^^^^
  this.rightSide = true; //^^^^^
  this.slingPassed = false; //^^^^^
  this.dead = false; //for checking if the bird is dead
  this.stopped = false; //becomes true when bird comes to a stop
  this.checkStopped = true;
  this.dropBird = false;

  this.bodyclr = 'red';
  this.beakclr = [255, 204, 0];

  this.grav = globalGrav;

  this.move = function () {
    //simple move function
    this.xPos += this.speedx;
    this.yPos += this.speedy;
  };

  this.launchBird = function (slingStartx, slingStarty) {
    //launching mechanism; interaction between the sling and the bird(s)

    this.mouseBirdDist = dist(mouseX, mouseY, this.xPos, this.yPos); //determines the distance between the cursor and the bird

    this.birdSlingDist = dist(this.xPos, this.yPos, slingStartx, slingStarty); //determines the distance from the bird to th initial launch position

    if (
      mouseIsPressed &&
      this.mouseBirdDist <= this.size &&
      this.launched == false
    ) {
      //activates if the cursor is over the bird and the bird is not launched yet

      this.birdDragged = true;
    } else if (
      mouseIsPressed == false &&
      this.birdSlingDist >= 50 &&
      this.birdDragged
    ) {
      //activates if the mouse is released after picking the bird up

      this.launched = true; //makes it impossible to drag bird around after it has been launched
      this.birdDragged = false; //the bird is not being dragged

      this.speedx = (slingStartx - this.xPos) / 8; //uses distance from resting x to dragged-to x to make speed; it is divided so the bird is not too fast
      this.speedy = (slingStarty - this.yPos) / 7; //uses distance from resting y to dragged-to y to make speed; divided by 7 so launch looks believable

      this.speedx = constrain(this.speedx, -20, 20); //makes sure the speed does not get too high
      this.speedy = constrain(this.speedy, -30, 30); //^^^^^
    } else if (
      mouseIsPressed == false &&
      this.birdSlingDist < 50 &&
      this.birdDragged
    ) {
      //resets the bird to starting position if it is let go too close to the sling

      this.xPos = slingStartx; //resets postion
      this.yPos = slingStarty; //^^^^^

      this.birdDragged = false; //ensures the bird is not in a launched state
      this.launched = false; //^^^^^
      this.slingPassed = false; //^^^^^
    }

    if (this.birdDragged) {
      this.xPos = mouseX; //allows user to postion bird for launch
      this.yPos = mouseY; //^^^^^
      this.xPos = constrain(this.xPos, slingStartx - 170, slingStartx + 170); //constrains postion so string cannot be streched infinitely
      this.yPos = constrain(this.yPos, slingStarty - 170, slingStarty + 170); //^^^^^

      if (this.xPos <= slingStartx) {
        //for cosmetic purposes(keeps string in view until bird is released fully)
        this.leftSide = true;
        this.rightSide = false;
      } else if (this.xPos > slingStartx) {
        //^^^^^
        this.leftSide = false;
        this.rightSide = true;
      }
    }

    if (this.launched) {
      this.birdDragged = false;
      if (this.dead == false) {
        this.gravity(); //applies physics
      }

      this.move(); //^^^^^

      if (this.slingPassed == false) {
        if (this.leftSide && this.rightSide == false) {
          //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
          if (this.xPos >= slingStartx) {
            this.slingPassed = true; //Basic check to detect to draw strings or not
          } else {
            this.slingPassed = false;
          }
          //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
        }

        if (this.leftSide == false && this.rightSide) {
          //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
          if (this.xPos < slingStartx) {
            this.slingPassed = true; //Basic check to detect to draw strings or not
          } else {
            this.slingPassed = false;
          }
          //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
        }
      }
    }

    if (this.slingPassed) {
      this.drawStrings = false; //stops displaying strings when bird is past the sling
    } else {
      this.drawStrings = true; //keeps displaying strings while bird is not past the sling
    }
  };

  this.wallBounce = function (groundHeight) {
    //bounces off the edges of the screen, top and sides may be removed

    if (this.xPos - this.size <= 0) {
      //left side, probably not in final game
      this.speedx *= -0.5;
      this.xPos = 0 + this.size;
    }

    if (this.xPos + this.size >= width) {
      //right side, probably not in final game
      this.speedx *= -0.5;
      this.xPos = width - this.size;
    }

    /*if (yPos - size <= 0) {//will probably not be in final game
     speedy *= -0.5;
     yPos = 0 + size;
     }*/

    //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
    if (this.yPos + this.size >= groundHeight) {
      this.speedy *= -0.45;
      this.yPos = height - height / 10 - this.size;

      if (this.speedx < 1.5 && this.speedx > -1.5) {
        this.speedx = 0;
      } else if (this.speedx < -1) {
        //This block of code allows the bird to lose horizontral energy when
        this.speedx += 0.8; //it hits the ground and keeps it from bouncing infinitely
      } else if (this.speedx > 1) {
        this.speedx -= 0.8;
      }

      if (this.speedx == 0 && this.dead == false) {
        // makes the bird completely stop moving
        this.speedy = 0;
      }
    }
    //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

    if (this.checkStopped) {
      //"checkstopped" boolean is used for the "die" function
      if (this.speedx == 0 && this.speedy == 0 && this.launched) {
        //even though bird speed is 0 when it is in the sling, this check ignores that
        this.stopped = true; //used in "die" function, possibly others
      } //else stopped = false;
    }
  };

  this.gravity = function () {
    //simple gravity function
    this.speedy += this.grav;
    //println(speedx + " " + speedy + " " + launched);
  };

  this.display = function () {
    //displays the bird(**I may add more types of birds on the future**)

    //println(speedx + " " + speedy);  //Debugging

    ellipseMode(RADIUS); //sets drawing mode and other things
    strokeWeight(this.size / 8);
    stroke(0, this.alpha);

    /*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*\
     most of the drawing uses size variable for the proportions
     \*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

    //draw the body
    fill(255, 0, 0, this.alpha); // TO RGB
    ellipse(this.xPos, this.yPos, this.size, this.size);

    //draw the beak
    fill(this.beakclr[0], this.beakclr[1], this.beakclr[2], this.alpha);
    triangle(
      this.xPos + this.size / 2,
      this.yPos,
      this.xPos + this.size * 1.5,
      this.yPos + this.size / 2,
      this.xPos,
      this.yPos + this.size / 2
    );

    //draw the eyes
    fill(255, this.alpha);
    ellipse(this.xPos, this.yPos - this.size / 4, this.size / 4, this.size / 4);
    ellipse(
      this.xPos + this.size,
      this.yPos - this.size / 4,
      this.size / 4,
      this.size / 4
    );
    fill(0, this.alpha);

    //Draw the pupils
    ellipse(
      this.xPos + this.size / 8,
      this.yPos - this.size / 4,
      this.size / 8,
      this.size / 8
    );
    ellipse(
      this.xPos + this.size + this.size / 8,
      this.yPos - this.size / 4,
      this.size / 8,
      this.size / 8
    );

    //Draw the eyebrows
    line(
      this.xPos - this.size / 4,
      this.yPos - this.size / 2,
      this.xPos + this.size / 4,
      this.yPos - this.size / 2
    );
    line(
      this.xPos + this.size - this.size / 4,
      this.yPos - this.size / 2,
      this.xPos + this.size + this.size / 4,
      this.yPos - this.size / 2
    );
  };

  this.reset = function (slingStartx, slingStarty) {
    this.alpha = 255;
    this.size = int(random(15, 20));
    this.launched = false;
    this.slingPassed = false;
    this.speedx = 0;
    this.speedy = 0;
    this.xPos = slingStartx;
    this.yPos = slingStarty;
    this.dead = false;
    this.checkStopped = true;
    this.dropBird = false;
  };

  this.die = function (slingStartx, slingStarty) {
    //the process of the bird stopping, waiting, fading, and resetting onto the slingshot

    //println(millis() + " " + dieTime);  //for debugging

    if (this.stopped == true) {
      this.dieTime = millis() + 0; //No delay now, but can be modified to have a delay by changing 0
      this.checkStopped = false; //Stops the previous check for the "stopped" boolean in order for the function to only run once
      this.stopped = false; //Also so the function runs once
      this.dead = true;
    }

    if (millis() >= this.dieTime && this.dead) {
      this.yPos -= 0.5; //Bird slowly rises
      this.alpha -= 6; //Bird slowly fades
      if (this.alpha <= 0) {
        this.xPos = slingStartx;
        this.yPos = -50;
        this.alpha = 255;
        this.dead = false; //So the bird appears to fall from the heavens
        this.gravity();
        this.speedy = 15;
        this.dropBird = true;
      }
    }
    if (this.yPos >= slingStarty && this.dropBird) {
      this.reset(slingStartx, slingStarty);
    }
  };

  this.getSize = function () {
    //allows size to be used outside of this object
    return this.size;
  };

  this.getx = function () {
    //allows the x position to be use outside of this object
    return this.xPos;
  };

  this.gety = function () {
    //allows the y position to be used outside of this object
    return this.yPos;
  };

  this.setx = function (x) {
    //allows x position to be changed outside of object exclusive constructor/functions
    this.xPos = x;
  };

  this.sety = function (y) {
    //allows y position to be changed outside of object exclusive constructor/functions
    this.yPos = y;
  };

  this.setSpeedx = function (x) {
    //allows x speed to be changed after initialization
    this.speedx = x;
  };

  this.setSpeedy = function (y) {
    //allows y speed to be changed after initialization
    this.speedy = y;
  };

  this.setDead = function (dead) {
    //For manual respawning of bird
    this.stopped = dead;
  };

  this.getSpeedx = function () {
    return this.speedx;
  };

  this.getSpeedy = function () {
    return this.speedy;
  };

  this.getDrawStrings = function () {
    return this.drawStrings;
  };

  this.getLaunched = function () {
    return this.launched;
  };

  this.getStopped = function () {
    return this.stopped;
  };

  this.getDragged = function () {
    return this.birdDragged;
  };

  this.getPassed = function () {
    return this.slingPassed;
  };

  this.getSize = function () {
    return this.size;
  };

  this.isDead = function () {
    return this.dead;
  };
}
