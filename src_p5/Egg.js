function Egg(x, y) {
  this.spawnx = x;
  this.xPos = x;
  this.spawny = y;
  this.yPos = y;
  this.size = 30;
  this.stolen = false;
  this.eaten = false;

  this.display = function (pigx, pigy, pigSize) {
    fill(255); //Simple drawing commands
    stroke(200);

    ellipseMode(RADIUS);
    ellipse(this.xPos, this.yPos, (this.size * 3) / 4, this.size);

    if (this.stolen) {
      this.xPos = pigx + pigSize;
      this.yPos = pigy;
    }
  };

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

  this.reset = function () {
    this.stolen = false;
    this.eaten = false;
    this.xPos = this.spawnx;
    this.yPos = this.spawny;
  };

  this.isStolen = function () {
    return this.stolen;
  };

  this.setStolen = function (s) {
    this.stolen = s;
  };

  this.setEaten = function (e) {
    this.eaten = e;
  };

  this.isEaten = function () {
    return this.eaten;
  };

  this.getx = function () {
    return this.xPos;
  };

  this.getWidth = function () {
    return this.width;
  };

  this.getSize = function () {
    return this.size;
  };
}
