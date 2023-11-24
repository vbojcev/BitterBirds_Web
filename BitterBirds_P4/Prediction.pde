
class Prediction {
  
  float xPos = bird.getx();
  float yPos = bird.gety();
  float speedx = 0;
  float speedy = 0;
  float dieTime = millis() + 2000;
  boolean launched = false;
  boolean dead;
  
  Prediction () {

  }
  
  void display () {
    
    fill(255, 150);
    noStroke();
    ellipse(xPos, yPos, 5, 5);
    
  }
  
  void predict () {
    
    if (launched == false) {  //Only allows this block of code to run once
      speedx = (sling.getStartx() - xPos)/1;  //uses distance from resting x to dragged-to x to make speed; divided by less than the bird's so that it updates quickly
      speedy = (sling.getStarty() - yPos)/0.875;  //uses distance from resting y to dragged-to y to make speed; divided by less than the bird's so that it updates quickly
    }
    
    launched = true;  //If this variable didn't exst, the speed would update constantly while the ball is moving and it would come to a rest at the sling rest position.
    
    if (launched) {
      
      speedy += globalGravity * 60;  //to adapt to the increased speed of the predictor balls relative to the bird, 64 isn't completely accurate for some reason
      
      xPos += speedx;
      yPos += speedy;
    }    
  }
  
  boolean dead () {
    
    if (millis() >= dieTime || bird.getLaunched()) {
      return true;
    } else return false;
    
  }
  
  
}