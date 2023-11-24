class Prediction {
  constructor(grav) {
    this.xPos = bird.getx();
    this.yPos = bird.gety();
    this.speedx = 0;
    this.speedy = 0;
    this.dieTime = millis() + 2000;
    this.launched = false;
    this.dead;
    this.g = grav;
  }

  display() {
    fill(255, 150);
    noStroke();
    ellipse(this.xPos, this.yPos, 5, 5);
  }

  predict(slingStartx, slingStarty, birdLaunched) {
    if (this.launched == false) {
      //Only allows this block of code to run once
      this.speedx = (slingStartx - this.xPos) / 1; //uses distance from resting x to dragged-to x to make speed; divided by less than the bird's so that it updates quickly
      this.speedy = (slingStarty - this.yPos) / 0.875; //uses distance from resting y to dragged-to y to make speed; divided by less than the bird's so that it updates quickly
    }

    this.launched = true; //If this variable didn't exst, the speed would update constantly while the ball is moving and it would come to a rest at the sling rest position.

    if (this.launched) {
      this.speedy += this.g * 60; //to adapt to the increased speed of the predictor balls relative to the bird, 64 isn't completely accurate for some reason

      this.xPos += this.speedx;
      this.yPos += this.speedy;
    }
  }

  isDead() {
    if (millis() >= this.dieTime || birdLaunched) {
      return true;
    } else return false;
  }
}
