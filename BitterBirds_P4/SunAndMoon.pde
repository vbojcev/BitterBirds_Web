
class SunAndMoon {  //The sun and moon is actually one ball that changes colour
  
  float size = height / 20;
  float xPos = width / 2;
  float yPos = height/4;
  float speed = 1;
  color clr = #FFC400;
  boolean day = true;
  boolean resetting;
  
  SunAndMoon(){
  }
  
  void move() {
    
    xPos += speed;
    
    if (xPos >= width + size) {
      
      xPos = 0 - 130;  //So moon doesn't come out before sky is dark and vice versa
      
      reset();
      
    }
    
  }
  
  void display() {
    
    fill(clr);
    noStroke();
    ellipseMode(RADIUS);
    ellipse(xPos, yPos, size, size);
    
    
  }
  
  void reset() {
    
    day = !day;
    
    if (day) {
      clr = #FFC400;
    } else if (day == false) {
      clr = color(225);
    }

  }
  
  boolean getDay() {
    return day;
  }
  
}