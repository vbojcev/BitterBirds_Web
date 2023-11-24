
class SlingShot {

  float xPos;
  float yPos;
  float hght;
  color c;
  float birdRestPos;
  float birdStartx;
  float birdStarty;

  SlingShot(float x, float y, float tempHeight, color clr) {

    xPos = x;
    yPos = y;
    c = clr;
    hght = tempHeight;
  }

  void drawFront() {
    
    //Draw the main post
    stroke(c);
    strokeWeight(hght/4);
    line(xPos, yPos - 30, xPos, yPos - hght*2.5 - 25);

    //Draw left branch
    line(xPos, yPos - hght*2.5 - 30, xPos - hght/2, yPos - hght*3.5 - 30);
    
    //Draw the base
    fill(#8E6B48);
    strokeWeight(hght/8);
    rectMode(CORNER);
    rect(xPos - hght, yPos, hght*2, - 30);
    
  }

  void drawBehind() {

    stroke(c);
    strokeWeight(hght/4);
    line(xPos, yPos - hght*2.5 - 30, xPos + hght/2, yPos - hght*3.5 - 30);
  }

  float getStartx() {
    birdStartx = xPos;
    return birdStartx;
  }

  float getStarty() {
    birdStarty = yPos - hght*3.5 - 30;
    //println (birdStarty);
    return birdStarty;
  }

  void drawStringsLeft(boolean draw) {

    if (draw) {
      stroke(0);
      strokeWeight(hght/8);
      line(xPos-(hght/2), yPos-(hght*3.5) - 30, bird.getx() - bird.getSize(), bird.gety());

    }
  }

  void drawStringsRight(boolean draw) {

    if (draw) {
      stroke(0);
      strokeWeight(hght/8);
      line(xPos+(hght/2), yPos-(hght*3.5) - 30, bird.getx() + bird.getSize(), bird.gety());

    }
  }
}