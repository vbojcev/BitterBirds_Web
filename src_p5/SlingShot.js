class SlingShot {
  constructor(x, y, tempHeight, clr) {
    this.xPos = x;
    this.yPos = y;
    this.c = clr;
    this.hght = tempHeight;
    this.birdRestPos;
    this.birdStartx;
    this.birdStarty;
  }

  drawFront() {
    //Draw the main post
    stroke(this.c);
    strokeWeight(this.hght / 4);
    line(
      this.xPos,
      this.yPos - 30,
      this.xPos,
      this.yPos - this.hght * 2.5 - 25
    );

    //Draw left branch
    line(
      this.xPos,
      this.yPos - this.hght * 2.5 - 30,
      this.xPos - this.hght / 2,
      this.yPos - this.hght * 3.5 - 30
    );

    //Draw the base
    fill('#8E6B48');
    strokeWeight(this.hght / 8);
    rectMode(CORNER);
    rect(this.xPos - this.hght, this.yPos, this.hght * 2, -30);
  }

  drawBehind() {
    stroke(c);
    strokeWeight(this.hght / 4);
    line(
      this.xPos,
      this.yPos - this.hght * 2.5 - 30,
      this.xPos + this.hght / 2,
      this.yPos - this.hght * 3.5 - 30
    );
  }

  getStartx() {
    this.birdStartx = this.xPos;
    return this.birdStartx;
  }

  getStarty() {
    this.birdStarty = this.yPos - this.hght * 3.5 - 30;
    //println (birdStarty);
    return this.birdStarty;
  }

  drawStringsLeft(draw, birdx, birdy, birdSize) {
    if (draw) {
      stroke(0);
      strokeWeight(this.hght / 8);
      line(
        this.xPos - this.hght / 2,
        this.yPos - this.hght * 3.5 - 30,
        birdx - birdSize,
        birdy
      );
    }
  }

  drawStringsRight(draw, birdx, birdy, birdSize) {
    if (draw) {
      stroke(0);
      strokeWeight(this.hght / 8);
      line(
        this.xPos + this.hght / 2,
        this.yPos - this.hght * 3.5 - 30,
        birdx + birdSize,
        birdy
      );
    }
  }
}
