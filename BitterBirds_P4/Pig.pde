
class Pig {

  float xPos;
  float yPos;
  float speedx;
  float speedy;
  float size;
  float alpha = 255;
  boolean balloonPopped = false;
  boolean killed = false;
  boolean killable = true;
  int randomizer;
  int type;
  int balloonclr;


  Pig( int tp, float x, float y, float xspeed, float yspeed, float sz, int clr) {

    type = tp;
    xPos = x;
    yPos = y;
    speedx = xspeed;
    speedy = yspeed;
    size = sz;
    balloonclr = clr;
  }




  void move() {

    //println(height - (size * 4/5) - size - env.getGroundHeight());

    if (type == 1 || balloonPopped) {  //Normal gravity only applies to bouncy pig
      gravity();
    }

    //\/\/\/\/\/\/\/\
    xPos += speedx;
    yPos += speedy;
    //\/\/\/\/\/\/\/\

    /*if (xPos <= size || xPos >= width - size) {

      speedx *= -1;
    }*/

    if ( type == 1 && yPos >= height - (size * 4/5) - size - (height - env.getGroundHeight())) {

      yPos = height - (size * 4/5) - size - (height - env.getGroundHeight());

      speedy *= -1;
    } else if ( type == 3 && yPos > env.getGroundHeight() + size * 1.3) {
      yPos = env.getGroundHeight() + size * 1.3;
    }
    
    if ( xPos >= width + size * 3 && bird.isDead() == false) {
      reset();
    }
        
    if (dist(bird.getx(), bird.gety(), xPos, yPos) - bird.getSize() < size && bird.getLaunched() && bird.gety() + bird.getSize() > yPos - size * 4/5 && bird.gety() - bird.getSize() < yPos + size * 4/5 && bird.isDead() == false && type == 1 && killable) {
      //reset();
      points += 2 * pointMultiplier;
      killed = true;
      killable = false;
    }
    
    if (dist(bird.getx(), bird.gety(), xPos, yPos) - bird.getSize() < size && bird.getLaunched() && bird.gety() + bird.getSize() > yPos - size * 4/5 && bird.gety() - bird.getSize() < yPos + size * 4/5 && bird.isDead() == false && type == 2 && killable) {
      //reset();
      points += 1 * pointMultiplier;
      killed = true;
      killable = false;
    }
    
    if (dist(bird.getx(), bird.gety(), xPos, yPos) - bird.getSize() < size && bird.getLaunched() && bird.gety() + bird.getSize() > yPos - size * 4/5 && bird.gety() - bird.getSize() < yPos + size * 4/5 && bird.isDead() == false && type == 3 && killable) {
      //reset();
      points += 1 * pointMultiplier;
      killed = true;
      killable = false;
    }
    
    if (type == 2 && bird.gety() + bird.getSize() > yPos - size * 3.5 && bird.gety() - bird.getSize() < yPos - size * 1.5 && bird.getx() - bird.getSize() > xPos - size / 1.5 - size / 2 && bird.getx() + bird.getSize() < xPos + size / 1.5 + size / 2 && bird.isDead() == false) {
      balloonPopped = true;
    }
    
  }

  void gravity() {

    if (type == 1 && killed == false) {
    speedy += globalGravity;
    }
  }
  
  void reset() {

    killed = false;
    killable = true;
    alpha = 255;
    balloonPopped = false;
    xPos = width + size * 2;
    randomizer = int(random(0, 100));
    size = random(30, 70);
    if (randomizer <= 20) {
      type = 1;
      yPos = random(height/10, height/2);
      speedx = random(-3, -2);
      speedy = random(-5, 6);
    } else if (randomizer >= 21 && randomizer <= 60) {
      balloonPopped = false;
      type = 2;
      yPos = random(height/10, height/2);
      speedy = 0;
      speedx = random(-5, -2);
      balloonclr = int(random(1, 4));
    } else if (randomizer >= 61) {
      type = 3;
      speedy = 0;
      yPos = env.getGroundHeight() - size * 1.3;
      speedx = random(-8, -4);
    }

  }
  
  void balloonPop() {
    
    if (balloonPopped && type == 2) {
      
      speedy += globalGravity;
      
      if (yPos + size >= env.getGroundHeight() && killable) {
        //reset();
        yPos = env.getGroundHeight() - size - 1;
        killable = false;
        points += 1 * pointMultiplier;
        killed = true;
      }
           
    }
    
  }
  
  void die() {
    
    if (killed) {
      
      alpha -= 6;
      speedx = 0;
      speedy = 0; 
      yPos -= 0.5;
      if (alpha <= 0) {

        reset();
        
      }
           
    }
    
  }

  void display() {

    if (type == 1 && killed == false) {
      spring();
    } else if (type == 2 && balloonPopped == false && killed == false) {
      balloon();
    }
    

    //Body and ears
    fill(#6BB72E, alpha);
    stroke(#4A7E20, alpha);
    strokeWeight(size/10);
    ellipseMode(RADIUS);
    ellipse(xPos - size * 3/4, yPos - (size *4/5) * 3/4, size/4, size/4);
    ellipse(xPos + size * 3/4, yPos - (size *4/5) * 3/4, size/4, size/4);
    ellipse(xPos, yPos, size, size * 4/5);

    if (type == 3 && killed == false) {  //Cart() is here so it is in front of the pig's body
      cart();
    }

    //Eyes
    strokeWeight(size/20);
    stroke(0, alpha);
    fill(255, alpha);
    ellipse(xPos - size/2, yPos - size/4, size/5, size/5);
    ellipse(xPos + size/2, yPos - size/4, size/5, size/5);

    if (dist(xPos, yPos, bird.getx(), bird.gety()) <= size * 8 || balloonPopped || killed) {  //If the bird is too close to the pig or if the balloon is popped, it gets scared
      scared();
    } else angry();

    //Pupils
    fill(0, alpha);
    strokeWeight(size/20);
    ellipse(xPos - size/2, yPos - size/4, size/10, size/10);
    ellipse(xPos + size/2, yPos - size/4, size/10, size/10);

    //Snout;
    stroke(#4A7E20, alpha);
    strokeWeight(size/10);
    fill(#6BB72E, alpha);
    ellipse(xPos, yPos, size/3, size/3 * 4/5);
    fill(#6BB72E, alpha);
    ellipse(xPos - size/9, yPos, size/15, size/15);
    ellipse(xPos + size/9, yPos, size/15, size/15);

    
  }

  void angry() {

    //Draws angry eyebrows, default setting
    strokeWeight(size/10);
    stroke(0, alpha);
    line(xPos - size/2 - size/5, yPos - size/4 - size/4, xPos - size/2 + size/4, yPos - size/4 - size/6);
    line(xPos + size/2 - size/5, yPos - size/4 - size/6, xPos + size/2 + size/4, yPos - size/4 - size/4);
  }

  void scared() {

    //Draws scared eyebrows, for when bird is near pig
    strokeWeight(size/10);
    stroke(0, alpha);
    line(xPos - size/2 - size/5, yPos - size/4 - size/6, xPos - size/2 + size/4, yPos - size/4 - size/4);
    line(xPos + size/2 - size/5, yPos - size/4 - size/4, xPos + size/2 + size/4, yPos - size/4 - size/6);
  }

  void spring() {

    noFill();
    stroke(150, alpha);
    strokeWeight(size/10);
    beginShape();
    vertex(xPos - size/5, yPos + size * 4/5);
    vertex(xPos + size/5, yPos + size * 4/5 + (size/5)); 
    vertex(xPos - size/5, yPos + size * 4/5 + (size/5)*2); 
    vertex(xPos + size/5, yPos + size * 4/5 + (size/5)*3); 
    vertex(xPos - size/5, yPos + size * 4/5 + (size/5)*4); 
    vertex(xPos + size/5, yPos + size * 4/5 + (size/5)*5); 
    endShape();
    line(xPos + size/5, yPos + size * 4/5 + (size/5)*5, xPos - size/5, yPos + size * 4/5 + (size/5)*5);
  }

  void balloon() {

    strokeWeight(size/10);
    stroke(0, alpha);
    line(xPos, yPos, xPos - size/2, yPos - size*1.5);
    line(xPos, yPos, xPos + size/2, yPos - size*1.5);

    //Balloon colours
    if (balloonclr == 1) {
      fill(255, 0, 0, alpha);
      stroke(150, 0, 0, alpha);
    } else if (balloonclr == 2) {
      fill(0, 255, 0, alpha);
      stroke(0, 150, 0, alpha);
    } else if (balloonclr == 3) {
      fill(0, 0, 255, alpha);
      stroke(0, 0, 150, alpha);
    }

    ellipseMode(RADIUS);
    ellipse(xPos - size/2, yPos - size*2.5, size/1.5, size);
    ellipse(xPos + size/2, yPos - size*2.5, size/1.5, size);
  }
  
  void cart() {
    
    fill(#A06023, alpha);
    stroke(#6A3E14, alpha);
    
    strokeWeight(size/10);
    rectMode(CENTER);
    rect(xPos, yPos + size * 4/5, size * 2, size / 3);
    
    ellipseMode(RADIUS);
    ellipse(xPos + size, yPos + size * 4/5, size/2, size/2);
    ellipse(xPos - size, yPos + size * 4/5, size/2, size/2);
    
  }
  
  float getx() {
    return xPos;
  }
  
  float gety() {
    return yPos;
  }
  
  float getSize() {
    return size;
  }
  
  void setSpeed(float s) {
    
    speedx *= s;
    
  }
  
}