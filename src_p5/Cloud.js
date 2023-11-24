class Cloud {
  //Moving, randomly generated clouds

  constructor(x, y, wSpeed, sz, a) {
    //Constructor, all variables will be random to a point

    this.xPos = x; //Positions of the cloud
    this.xyPos = y;
    this.xwindSpeed = wSpeed; //How fast the clouds move in the right direction
    this.xsize = sz; //How big the clouds are
    this.xalpha = a; //For transparency
  }

  display() {
    this.xPos = this.xPos + this.windSpeed; //moves the cloud

    if (this.xPos <= 0 - this.size * 3) {
      //resets the cloud on the right side of the screen
      this.xPos = this.width + this.size * 3;
    }

    noStroke();
    fill(255, alpha); //Alpha variable so there is transparency in the white clouds; compounds when multiple clouds are in one place
    ellipseMode(RADIUS);
    ellipse(xPos, yPos, size, size / 2);
  }
}
