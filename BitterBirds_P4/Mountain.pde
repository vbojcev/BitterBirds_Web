

class Mountain {
  
  float xPos = width + width / 10;
  
  Mountain( float x) {
    
    xPos = x;
    
  }
  
  void display () {
    
    fill(187);
    stroke(165);
    strokeWeight(7.5);
    
    triangle(xPos, env.getGroundHeight(), xPos - width / 4, env.getGroundHeight(), xPos - width / 8, height - height / 3.5);
    
  }  
  
}