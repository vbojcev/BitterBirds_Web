

class Star {  //Simple small ellipse that has a 1% chance to become slightly bigger, giving the effect of twinkling
  
  float xPos;
  float yPos;
  float size;
  int twinkle;
  
  Star(float x, float y) {
    
    xPos = x;
    yPos = y;
    
  }
  
  void display() {
    
    fill(255);
    noStroke();
    ellipseMode(RADIUS);
    
    twinkle = int(random(0, 10000));
    if (twinkle == 2) {
      size = 2;  //Twinkle, twinkle, little star...
    } else size = 1;
    
    ellipse(xPos, yPos, size, size);
    
  }  
  
}