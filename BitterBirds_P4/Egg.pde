
class Egg {
  
  float spawnx;  //Initial position of the egg, for game restarting puropses
  float spawny;  //^^^^^
  float xPos;
  float yPos;
  float size = 30;
  boolean stolen = false;  //For when a pig has possession of an egg
  boolean eaten = false;  //For when a pig deposits the egg off the right side of the screen
  
  Egg (float x, float y) {
    
    spawnx = x;
    spawny = y;
    xPos = spawnx;
    yPos = spawny;
    
  }
  
  void display() {
    
    fill(255);  //Simple drawing commands
    stroke(200);
    
    ellipseMode(RADIUS);
    ellipse(xPos, yPos, size * 3/4, size);
    
    if (stolen) {
      
      xPos = pig.getx() + pig.getSize();
      yPos = pig.gety();
      
    }
    
  }
  
  void getStolen() {
    
    if (pig.getx() <= xPos && stolen == false) {
      
      pig.setSpeed(-1);  //Makes the pig change direction when it picks up an egg
      stolen = true;
      
    }
    
    if (xPos >= width + size * 3/4 && eaten == false) {
      
      eaten = true;
      eggsCount --;
      
    }
    
  }
  
  void reset() {
    
    stolen = false;
    eaten = false;
    xPos = spawnx;
    yPos = spawny;
    
  }
  
  boolean getBoolStolen() {
    return stolen;
  }
  
  boolean getEaten() {
    return eaten;
  }
  
}