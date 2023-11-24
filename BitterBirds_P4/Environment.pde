
class Environment {


  float groundHeight;
  boolean drawUnderGround = true;
  SunAndMoon sunAndMoon = new SunAndMoon();
  Cloud[] clouds = new Cloud[30]; //Array of 30 cloud objects
  Mountain[] mountains = new Mountain[11];
  Star[] stars = new Star[1000];  //1000 stars to light up the nigh sky
  int mountx = width + width/10;
  float skyAlpha = 255;  //For day and night
  boolean displayStars = true;  //Whether or not to display the stars


  Environment() {

    groundHeight = height - height/10;  //Ground adapts to resolution size

    for (int i = 0; i < clouds.length; i++) {
      clouds[i] = new Cloud(random(-100, width + 100), random (50, height/3), random(-3, -1), random(100, 150), random(100, 200));
    }

    for (int i = 0; i < mountains.length; i++) {
      mountains[i] = new Mountain(mountx);
      mountx -= width/10;
    }

    for (int i = 0; i < stars.length; i++) {
      stars[i] = new Star(random(0, width), random(0, height));
    }
  }

  void drawField() {

    if (sunAndMoon.getDay() && skyAlpha < 255) {
      skyAlpha += 2;  //To change the sky to day quickly
    } else if (sunAndMoon.getDay() == false && skyAlpha > 0) {
      skyAlpha -= 2;  //To change the sky to night quickly
    }

    if (displayStars) {
      for (int i = 0; i < stars.length; i++) {
        stars[i].display();  //Stars are displayed here so that they are not present during the day (i.e while the sky colour is opaque)
      }
    }

    //Draw the sky here as opposed to as a background command, to allow day and night
    rectMode(CORNERS);
    noStroke();
    fill(#B2E2FF, skyAlpha);
    rect(0, 0, width, groundHeight);

    //Draw the sun and moon
    sunAndMoon.display();   
    sunAndMoon.move();

    //Draw the mountains
    for (int i = 0; i < mountains.length; i ++) {
      mountains[i].display();
    }

    //Draw the ground
    rectMode (CORNERS);
    noStroke();
    fill(#2f7825);
    rect(0, groundHeight, width, height);
    stroke(#2e5128);
    strokeWeight(10);
    line(0, groundHeight, width, groundHeight);

    //Draw the clouds using an array
    for (int i = 0; i <30; i++) {
      clouds[i].display();
    }
  }

  float getGroundHeight() {

    return groundHeight;  //For other objects to use
  }

  float getSkyAlpha() {

    return skyAlpha;
  }
}