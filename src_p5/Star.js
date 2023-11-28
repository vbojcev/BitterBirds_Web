function Star(x, y) {
  //Simple small ellipse that has a 1% chance to become slightly bigger, giving the effect of twinkling

  this.xPos = x;
  this.yPos = y;
  this.size = 1;
  this.twinkle = 1;

  this.display = function () {
    fill(255);
    noStroke();
    ellipseMode(RADIUS);

    this.twinkle = int(random(0, 10000));
    if (this.twinkle == 2) {
      this.size = 4; //Twinkle, twinkle, little star...
    } else this.size = 1;

    ellipse(this.xPos, this.yPos, this.size, this.size);
  };
}
