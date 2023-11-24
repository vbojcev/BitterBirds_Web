class Star {
  //Simple small ellipse that has a 1% chance to become slightly bigger, giving the effect of twinkling

  constructor(x, y) {
    this.xPos = x;
    this.yPos = y;
    this.size;
    this.twinkle;
  }

  display() {
    fill(255);
    noStroke();
    ellipseMode(RADIUS);

    this.twinkle = int(random(0, 10000));
    if (this.twinkle == 2) {
      this.size = 2; //Twinkle, twinkle, little star...
    } else this.size = 1;

    ellipse(this.xPos, this.yPos, this.size, this.size);
  }
}
