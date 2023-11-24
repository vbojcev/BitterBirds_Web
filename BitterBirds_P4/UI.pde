
class UI {

  float xPos;
  float yPos;
  float xSize;
  float ySize;
  int resetButtonClr = 200;
  color clr;
  String difficulty;
  

  
  UI () {    
    
  }

  void displayStart () {
    
    textAlign(CENTER, CENTER);
    
    rectMode(CENTER);
    strokeWeight(10);
    
    textFont(font, 50);
    
    //Dodo(easy) difficulty
    fill(0, 255, 0);
    stroke(0, 200, 0);
    rect(width * 1/3, height / 2, 200, 100);
    fill(20);
    text("Dodo", width * 1/3, height / 2);
    if (mousePressed && mouseX >= width * 1/3 - 100 && mouseX <= width * 1/3 + 100 && mouseY >= height / 2 - 50 && mouseY <= height / 2 + 50) {
      enablePredictor = true;
      enableReset = true;
      startUp = false;
      difficulty = "Dodo";
      pointMultiplier = 0.5;
      pig.reset();
    }
    
    //Robin(normal) difficulty button
    fill(255, 255, 0);
    stroke(255, 200, 0);
    rect(width / 2, height / 2, 200, 100);
    fill(20);
    text("Robin", width / 2, height / 2);
    if (mousePressed && mouseX >= width / 2 - 100 && mouseX <= width / 2 + 100 && mouseY >= height / 2 - 50 && mouseY <= height / 2 + 50) {
      enablePredictor = true;
      enableReset = false;
      startUp = false;
      difficulty = "Robin";
      pointMultiplier = 1;
      pig.reset();
    }
    
    //Eagle(hard) difficulty button
    fill(255, 0, 0);
    stroke(200, 0, 0);
    rect(width * 2/3, height / 2, 200, 100);
    fill(20);
    text("Eagle", width * 2/3, height / 2);
    if (mousePressed && mouseX >= width * 2/3 - 100 && mouseX <= width * 2/3 + 100 && mouseY >= height / 2 - 50 && mouseY <= height / 2 + 50) {
      enablePredictor = false;
      enableReset = false;
      startUp = false;
      difficulty = "Eagle";
      pointMultiplier = 2;
      pig.reset();
    }
    
    fill(20);
    textFont(font);
    text("BitterBirds", width / 2, height / 3);    

  }
  
  void displayEnd () {
    
    fill(20);
    textFont(font);
    text("Game Over", width / 2, height / 3);
    
    rectMode(CENTER);
    textFont(font, 50);
    fill(255);
    text("Your final score is " + points + " (" + pointMultiplier + "x " + difficulty + " difficulty multiplier)", width / 2, height / 2);
    
    fill(0, 255, 0);
    stroke(0, 200, 0);
    rect(width / 2, height * 2 / 3, 250, 100);
    fill(255);
    text("Home Screen", width / 2, height * 2 / 3);
    if (mousePressed && mouseX >= width / 2 - 100 && mouseX <= width / 2 + 100 && mouseY >= height * 2 / 3 - 50 && mouseY <= height * 2 / 3 + 50) {
      //exit();
      startUp = true;
      gameOver = false;
      points = 0;
      eggsCount = eggsArray;
      bird.reset();
      
      for(int i = 0; i < eggs.length; i++) {
        eggs[i].reset();
      }
      
      
    }
    
  }
  
  void resetButton () {
    
    fill(resetButtonClr);
    stroke(resetButtonClr - 50);
    rectMode(CENTER);
    rect(width / 10, height / 10, 200, 100);
    fill(20);
    text("Reset", width / 10, height / 10);
    if (mousePressed && mouseX >= width / 10 - 100 && mouseX <= width / 10 + 100 && mouseY >= height / 10 - 50 && mouseY <= height / 10 + 50 && bird.getLaunched()) {
      
      resetButtonClr = 150;
      bird.setDead(true);
      bird.setSpeedx(0);
      bird.setSpeedy(0);
      
    } else {
      
      resetButtonClr = 200;
      
    }
    
    
  }
  
  String getDiff() {
    return difficulty;
  }


}