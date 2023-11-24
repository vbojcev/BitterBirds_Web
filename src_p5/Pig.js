class Pig {
  constructor(tp, x, y, xspeed, yspeed, sz, clr, grav, groundHeight) {
    this.type = tp;
    this.xPos = x;
    this.yPos = y;
    this.speedx = xspeed;
    this.speedy = yspeed;
    this.size = sz;
    this.balloonclr = clr;
    this.alpha = 255;
    this.balloonPopped = false;
    this.killed = false;
    this.killable = true;
    this.randomizer;
    this.type = 1;
    this.balloonclr;
    this.g = grav;
    this.groundHeight = groundHeight;
  }

  move(birdDead, birdx, birdy, birdSize, isLaunched) {
    //println(height - (size * 4/5) - size - this.groundHeight);

    if (this.type == 1 || this.balloonPopped) {
      //Normal gravity only applies to bouncy pig
      this.gravity();
    }

    //\/\/\/\/\/\/\/\
    this.xPos += this.speedx;
    this.yPos += this.speedy;
    //\/\/\/\/\/\/\/\

    /*if (xPos <= size || xPos >= width - size) {

      speedx *= -1;
    }*/

    if (
      this.type == 1 &&
      this.yPos >=
        height - (this.size * 4) / 5 - this.size - (height - this.groundHeight)
    ) {
      this.yPos =
        height - (this.size * 4) / 5 - this.size - (height - this.groundHeight);

      this.speedy *= -1;
    } else if (type == 3 && yPos > this.groundHeight + this.size * 1.3) {
      this.yPos = this.groundHeight + size * 1.3;
    }

    if (this.xPos >= width + this.size * 3 && !birdDead) {
      this.reset();
    }

    if (
      dist(birdx, birdy, this.xPos, this.yPos) - birdSize < this.size &&
      isLaunched &&
      birdy + birdSize > this.yPos - (this.size * 4) / 5 &&
      birdy - birdSize < this.yPos + (this.size * 4) / 5 &&
      birdDead == false &&
      this.type == 1 &&
      this.killable
    ) {
      //reset();
      points += 2 * pointMultiplier;
      this.killed = true;
      this.killable = false;
    }

    if (
      dist(birdx, birdy, this.xPos, this.yPos) - birdSize < this.size &&
      isLaunched &&
      birdy + birdSize > this.yPos - (this.size * 4) / 5 &&
      birdy - birdSize < this.yPos + (this.size * 4) / 5 &&
      birdDead == false &&
      this.type == 2 &&
      this.killable
    ) {
      //reset();
      points += 1 * pointMultiplier;
      this.killed = true;
      this.killable = false;
    }

    if (
      dist(birdx, birdy, this.xPos, this.yPos) - birdSize < this.size &&
      isLaunched &&
      birdy + birdSize > this.yPos - (this.size * 4) / 5 &&
      birdy - birdSize < this.yPos + (this.size * 4) / 5 &&
      birdDead == false &&
      this.type == 3 &&
      this.killable
    ) {
      //reset();
      points += 1 * pointMultiplier;
      this.killed = true;
      this.killable = false;
    }

    if (
      this.type == 2 &&
      birdy + birdSize > this.yPos - this.size * 3.5 &&
      birdy - birdSize < this.yPos - this.size * 1.5 &&
      birdx - birdSize > this.xPos - this.size / 1.5 - this.size / 2 &&
      birdx + birdSize < this.xPos + this.size / 1.5 + this.size / 2 &&
      birdDead == false
    ) {
      this.balloonPopped = true;
    }
  }

  gravity() {
    if (this.type == 1 && this.killed == false) {
      this.speedy += this.g;
    }
  }

  reset() {
    this.killed = false;
    this.killable = true;
    this.alpha = 255;
    this.balloonPopped = false;
    this.xPos = width + this.size * 2;
    this.randomizer = int(random(0, 100));
    this.size = random(30, 70);
    if (this.randomizer <= 20) {
      this.type = 1;
      this.yPos = random(height / 10, height / 2);
      this.speedx = random(-3, -2);
      this.speedy = random(-5, 6);
    } else if (this.randomizer >= 21 && this.randomizer <= 60) {
      this.balloonPopped = false;
      this.type = 2;
      this.yPos = random(height / 10, height / 2);
      this.speedy = 0;
      this.speedx = random(-5, -2);
      this.balloonclr = int(random(1, 4));
    } else if (randomizer >= 61) {
      this.type = 3;
      this.speedy = 0;
      this.yPos = this.groundHeight - this.size * 1.3;
      this.speedx = random(-8, -4);
    }
  }

  balloonPop() {
    if (this.balloonPopped && this.type == 2) {
      this.speedy += this.g;

      if (this.yPos + this.size >= this.groundHeight && this.killable) {
        //reset();
        this.yPos = this.groundHeight - size - 1;
        this.killable = false;
        points += 1 * pointMultiplier;
        this.killed = true;
      }
    }
  }

  die() {
    if (this.killed) {
      this.alpha -= 6;
      this.speedx = 0;
      this.speedy = 0;
      this.yPos -= 0.5;
      if (this.alpha <= 0) {
        this.reset();
      }
    }
  }

  display(birdx, birdy) {
    if (this.type == 1 && this.killed == false) {
      this.spring();
    } else if (
      this.type == 2 &&
      this.balloonPopped == false &&
      this.killed == false
    ) {
      this.balloon();
    }

    //Body and ears
    fill('#6BB72E', alpha);
    stroke('#4A7E20', alpha);
    strokeWeight(this.size / 10);
    ellipseMode(RADIUS);
    ellipse(
      this.xPos - (this.size * 3) / 4,
      this.yPos - (((this.size * 4) / 5) * 3) / 4,
      this.size / 4,
      this.size / 4
    );
    ellipse(
      this.xPos + (this.size * 3) / 4,
      this.yPos - (((this.size * 4) / 5) * 3) / 4,
      this.size / 4,
      this.size / 4
    );
    ellipse(this.xPos, this.yPos, this.size, (this.size * 4) / 5);

    if (this.type == 3 && this.killed == false) {
      //Cart() is here so it is in front of the pig's body
      this.cart();
    }

    //Eyes
    strokeWeight(this.size / 20);
    stroke(0, this.alpha);
    fill(255, this.alpha);
    ellipse(
      this.xPos - this.size / 2,
      this.yPos - this.size / 4,
      this.size / 5,
      this.size / 5
    );
    ellipse(
      this.xPos + this.size / 2,
      this.yPos - this.size / 4,
      this.size / 5,
      this.size / 5
    );

    if (
      dist(this.xPos, this.yPos, birdx, birdy) <= this.size * 8 ||
      this.balloonPopped ||
      this.killed
    ) {
      //If the bird is too close to the pig or if the balloon is popped, it gets scared
      this.scared();
    } else {
      this.angry();
    }

    //Pupils
    fill(0, this.alpha);
    strokeWeight(this.size / 20);
    ellipse(
      this.xPos - this.size / 2,
      this.yPos - this.size / 4,
      this.size / 10,
      this.size / 10
    );
    ellipse(
      this.xPos + this.size / 2,
      this.yPos - this.size / 4,
      this.size / 10,
      this.size / 10
    );

    //Snout;
    stroke('#4A7E20', this.alpha);
    strokeWeight(this.size / 10);
    fill('#6BB72E', this.alpha);
    ellipse(this.xPos, this.yPos, this.size / 3, ((this.size / 3) * 4) / 5);
    fill('#6BB72E', this.alpha);
    ellipse(
      this.xPos - this.size / 9,
      this.yPos,
      this.size / 15,
      this.size / 15
    );
    ellipse(
      this.xPos + this.size / 9,
      this.yPos,
      this.size / 15,
      this.size / 15
    );
  }

  angry() {
    //Draws angry eyebrows, default setting
    strokeWeight(this.size / 10);
    stroke(0, this.alpha);
    line(
      this.xPos - this.size / 2 - this.size / 5,
      this.yPos - this.size / 4 - this.size / 4,
      this.xPos - this.size / 2 + this.size / 4,
      this.yPos - this.size / 4 - this.size / 6
    );
    line(
      this.xPos + this.size / 2 - this.size / 5,
      this.yPos - this.size / 4 - this.size / 6,
      this.xPos + this.size / 2 + this.size / 4,
      this.yPos - this.size / 4 - this.size / 4
    );
  }

  scared() {
    //Draws scared eyebrows, for when bird is near pig
    strokeWeight(this.size / 10);
    stroke(0, this.alpha);
    line(
      this.xPos - this.size / 2 - this.size / 5,
      this.yPos - this.size / 4 - this.size / 6,
      this.xPos - this.size / 2 + this.size / 4,
      this.yPos - this.size / 4 - this.size / 4
    );
    line(
      this.xPos + this.size / 2 - this.size / 5,
      this.yPos - this.size / 4 - this.size / 4,
      this.xPos + this.size / 2 + this.size / 4,
      this.yPos - this.size / 4 - this.size / 6
    );
  }

  spring() {
    noFill();
    stroke(150, this.alpha);
    strokeWeight(this.size / 10);
    beginShape();
    vertex(this.xPos - this.size / 5, this.yPos + (this.size * 4) / 5);
    vertex(
      this.xPos + this.size / 5,
      this.yPos + (this.size * 4) / 5 + this.size / 5
    );
    vertex(
      this.xPos - this.size / 5,
      this.yPos + (this.size * 4) / 5 + (this.size / 5) * 2
    );
    vertex(
      this.xPos + this.size / 5,
      this.yPos + (this.size * 4) / 5 + (this.size / 5) * 3
    );
    vertex(
      this.xPos - this.size / 5,
      this.yPos + (this.size * 4) / 5 + (this.size / 5) * 4
    );
    vertex(
      this.xPos + this.size / 5,
      this.yPos + (this.size * 4) / 5 + (this.size / 5) * 5
    );
    endShape();
    line(
      this.xPos + this.size / 5,
      this.yPos + (this.size * 4) / 5 + (this.size / 5) * 5,
      this.xPos - this.size / 5,
      this.yPos + (this.size * 4) / 5 + (this.size / 5) * 5
    );
  }

  balloon() {
    strokeWeight(this.size / 10);
    stroke(0, this.alpha);
    line(
      this.xPos,
      this.yPos,
      this.xPos - this.size / 2,
      this.yPos - this.size * 1.5
    );
    line(
      this.xPos,
      this.yPos,
      this.xPos + this.size / 2,
      this.yPos - this.size * 1.5
    );

    //Balloon colours
    if (this.balloonclr == 1) {
      fill(255, 0, 0, this.alpha);
      stroke(150, 0, 0, this.alpha);
    } else if (this.balloonclr == 2) {
      fill(0, 255, 0, this.alpha);
      stroke(0, 150, 0, this.alpha);
    } else if (this.balloonclr == 3) {
      fill(0, 0, 255, this.alpha);
      stroke(0, 0, 150, this.alpha);
    }

    ellipseMode(RADIUS);
    ellipse(
      this.xPos - this.size / 2,
      this.yPos - this.size * 2.5,
      this.size / 1.5,
      this.size
    );
    ellipse(
      this.xPos + this.size / 2,
      this.yPos - this.size * 2.5,
      this.size / 1.5,
      this.size
    );
  }

  cart() {
    fill('#A06023', this.alpha);
    stroke('#6A3E14', this.alpha);

    strokeWeight(this.size / 10);
    rectMode(CENTER);
    rect(
      this.xPos,
      this.yPos + (this.size * 4) / 5,
      this.size * 2,
      this.size / 3
    );

    ellipseMode(RADIUS);
    ellipse(
      this.xPos + this.size,
      this.yPos + (this.size * 4) / 5,
      this.size / 2,
      this.size / 2
    );
    ellipse(
      this.xPos - this.size,
      this.yPos + (this.size * 4) / 5,
      this.size / 2,
      this.size / 2
    );
  }

  getx() {
    return this.xPos;
  }

  gety() {
    return this.yPos;
  }

  getSize() {
    return this.size;
  }

  setSpeed(s) {
    this.speedx *= s;
  }
}
