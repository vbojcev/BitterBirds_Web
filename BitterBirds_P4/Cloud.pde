
class Cloud {  //Moving, randomly generated clouds

  float xPos;  //Positions of the cloud
  float yPos;  //^^^^^
  float windSpeed;  //How fast the clouds move in the right direction
  float size;  //How big the clouds are
  float alpha;  //For transparency

  Cloud( float x, float y, float wSpeed, float sz, float a) {  //Constructor, all variables will be random to a point

    xPos = x;
    yPos = y;
    windSpeed = wSpeed;
    size = sz;
    alpha = a;
  }

  void display() {

    xPos = xPos + windSpeed;  //moves the cloud

    if (xPos <= 0 - size * 3) {  //resets the cloud on the right side of the screen
      xPos = width + size * 3;
    }

    noStroke();
    fill(255, alpha);  //Alpha variable so there is transparency in the white clouds; compounds when multiple clouds are in one place
    ellipseMode(RADIUS);
    ellipse(xPos, yPos, size, size/2);
  }
}