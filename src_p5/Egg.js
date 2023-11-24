class Egg {
  constructor(x, y) {
    this.spawnx, (this.xPos = x);
    this.spawny, (this.yPos = y);
    this.size = 30;
    this.stolen = false;
    this.eaten = false;
  }

  display(pigx, pigy, pigSize) {
    fill(255); //Simple drawing commands
    stroke(200);

    ellipseMode(RADIUS);
    ellipse(this.xPos, this.yPos, (this.size * 3) / 4, this.size);

    if (this.stolen) {
      this.xPos = pigx + pigSize;
      this.yPos = pigy;
    }
  }

  /*
  getStolen() {
    if (pig.getx() <= this.xPos && this.stolen == false) {
      pig.setSpeed(-1); //Makes the pig change direction when it picks up an egg
      this.stolen = true;
    }

    if (this.xPos >= this.width + (this.size * 3) / 4 && this.eaten == false) {
      this.eaten = true;
      eggsCount--;
    }
  }*/

  reset() {
    this.stolen = false;
    this.eaten = false;
    this.xPos = this.spawnx;
    this.yPos = this.spawny;
  }

  isStolen() {
    return this.stolen;
  }

  setStolen(s) {
    this.stolen = s;
  }

  setEaten(e) {
    this.eaten = e;
  }

  isEaten() {
    return this.eaten;
  }

  getx() {
    return this.xPos;
  }

  getWidth() {
    return this.width;
  }

  getSize() {
    return this.size;
  }
}
