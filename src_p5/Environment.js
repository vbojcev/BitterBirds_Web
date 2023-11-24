class Environment {
  constructor() {
    this.groundHeight = height - height / 10; //Ground adapts to resolution size
    this.drawUnderGround = true;
    this.mountx = width + width / 10;
    this.skyAlpha = 255;
    this.displayStars = true;

    this.clouds = [];
    this.mountains = [];
    this.stars = [];

    this.numClouds = 30;
    this.numMountains = 11;
    this.numStars = 1000;

    this.sunAndMoon = new SunAndMoon();

    for (let i = 0; i < this.numClouds; i++) {
      this.clouds.push(
        new Cloud(
          random(-100, width + 100),
          random(50, height / 3),
          random(-3, -1),
          random(100, 150),
          random(100, 200)
        )
      );
    }

    for (let i = 0; i < this.numMountains; i++) {
      this.mountains.push(new Mountain(mountx));
      this.mountx -= width / 10;
    }

    for (let i = 0; i < this.numStars; i++) {
      this.stars.push(new Star(random(0, width), random(0, height)));
    }
  }

  drawField() {
    if (this.sunAndMoon.getDay() && this.skyAlpha < 255) {
      this.skyAlpha += 2; //To change the sky to day quickly
    } else if (!this.sunAndMoon.getDay() && this.skyAlpha > 0) {
      this.skyAlpha -= 2; //To change the sky to night quickly
    }

    if (this.displayStars) {
      for (let i = 0; i < this.stars.length; i++) {
        this.stars[i].display(); //Stars are displayed here so that they are not present during the day (i.e while the sky colour is opaque)
      }
    }

    //Draw the sky here as opposed to as a background command, to allow day and night
    rectMode(CORNERS);
    noStroke();
    fill('#B2E2FF', this.skyAlpha);
    rect(0, 0, width, this.groundHeight);

    //Draw the sun and moon
    this.sunAndMoon.display();
    this.sunAndMoon.move();

    //Draw the mountains
    for (let i = 0; i < this.mountains.lenth; i++) {
      this.mountains[i].display(this.groundHeight);
    }

    //Draw the ground
    rectMode(CORNERS);
    noStroke();
    fill('#2f7825');
    rect(0, this.groundHeight, width, height);
    stroke('#2e5128');
    strokeWeight(10);
    line(0, this.groundHeight, width, this.groundHeight);

    //Draw the clouds using an array
    for (let i = 0; i < 30; i++) {
      this.clouds[i].display();
    }
  }

  getGroundHeight() {
    return this.groundHeight; //For other objects to use
  }

  getSkyAlpha() {
    return this.skyAlpha;
  }
}
