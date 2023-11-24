class SunAndMoon {
  //The sun and moon is actually one ball that changes colour

  constructor() {
    this.size = height / 20;
    this.xPos = width / 2;
    this.yPos = height / 4;
    this.speed = 1;
    this.clr = '#FFC400';
    this.day = true;
    this.resetting;
  }

  move() {
    this.xPos += this.speed;

    if (this.xPos >= width + this.size) {
      this.xPos = 0 - 130; //So moon doesn't come out before sky is dark and vice versa

      this.reset();
    }
  }

  display() {
    fill(clr);
    noStroke();
    ellipseMode(RADIUS);
    ellipse(this.xPos, this.yPos, this.size, this.size);
  }

  reset() {
    this.day = !this.day;

    if (this.day) {
      this.clr = '#FFC400';
    } else if (this.day == false) {
      this.clr = color(225);
    }
  }

  getDay() {
    return this.day;
  }
}
