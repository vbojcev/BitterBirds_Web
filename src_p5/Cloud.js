function Cloud(x, y, wSpeed, sz, a) {
  //Moving, randomly generated clouds
  this.xPos = x; //Positions of the cloud
  this.yPos = y;
  this.windSpeed = wSpeed; //How fast the clouds move in the right direction
  this.size = sz; //How big the clouds are
  this.alpha = a; //For transparency

  this.display = function () {
    this.xPos = this.xPos + this.windSpeed; //moves the cloud

    if (this.xPos <= 0 - this.size * 3) {
      //resets the cloud on the right side of the screen
      this.xPos = width + this.size * 3;
    }

    noStroke();
    fill(255, this.alpha); //Alpha variable so there is transparency in the white clouds; compounds when multiple clouds are in one place
    ellipseMode(RADIUS);
    ellipse(this.xPos, this.yPos, this.size, this.size / 2);
  };
}
