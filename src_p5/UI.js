class UI {
  constructor() {
    this.xPos;
    this.yPos;
    this.xSize;
    this.ySize;
    this.resetButtonClr = 200;
    this.clr;
    this.difficulty;
  }

  displayStart(font) {
    textAlign(CENTER, CENTER);

    rectMode(CENTER);
    strokeWeight(10);

    textFont(font, 50);

    //Dodo(easy) difficulty button
    fill(0, 255, 0);
    stroke(0, 200, 0);
    rect((width * 1) / 3, height / 2, 200, 100);
    fill(20);
    text('Dodo', (width * 1) / 3, height / 2);
    if (
      mouseIsPressed &&
      mouseX >= (width * 1) / 3 - 100 &&
      mouseX <= (width * 1) / 3 + 100 &&
      mouseY >= height / 2 - 50 &&
      mouseY <= height / 2 + 50
    ) {
      enablePredictor = true;
      enableReset = true;
      startUp = false;
      this.difficulty = 'Dodo';
      pointMultiplier = 0.5;
      pig.reset();
    }

    //Robin(normal) difficulty button
    fill(255, 255, 0);
    stroke(255, 200, 0);
    rect(width / 2, height / 2, 200, 100);
    fill(20);
    text('Robin', width / 2, height / 2);
    if (
      mouseIsPressed &&
      mouseX >= width / 2 - 100 &&
      mouseX <= width / 2 + 100 &&
      mouseY >= height / 2 - 50 &&
      mouseY <= height / 2 + 50
    ) {
      enablePredictor = true;
      enableReset = false;
      startUp = false;
      this.difficulty = 'Robin';
      pointMultiplier = 1;
      pig.reset();
    }

    //Eagle(hard) difficulty button
    fill(255, 0, 0);
    stroke(200, 0, 0);
    rect((width * 2) / 3, height / 2, 200, 100);
    fill(20);
    text('Eagle', (width * 2) / 3, height / 2);
    if (
      mouseIsPressed &&
      mouseX >= (width * 2) / 3 - 100 &&
      mouseX <= (width * 2) / 3 + 100 &&
      mouseY >= height / 2 - 50 &&
      mouseY <= height / 2 + 50
    ) {
      enablePredictor = false;
      enableReset = false;
      startUp = false;
      this.difficulty = 'Eagle';
      pointMultiplier = 2;
      pig.reset();
    }

    fill(20);
    textFont(font);
    text('BitterBirds', width / 2, height / 3);
  }

  displayEnd(font) {
    fill(20);
    textFont(font);
    text('Game Over', width / 2, height / 3);

    rectMode(CENTER);
    textFont(font, 50);
    fill(255);
    text(
      'Your final score is ' +
        points +
        ' (' +
        pointMultiplier +
        'x ' +
        this.difficulty +
        ' this.difficulty multiplier)',
      width / 2,
      height / 2
    );

    fill(0, 255, 0);
    stroke(0, 200, 0);
    rect(width / 2, (height * 2) / 3, 250, 100);
    fill(255);
    text('Home Screen', width / 2, (height * 2) / 3);
    if (
      mouseIsPressed &&
      mouseX >= width / 2 - 100 &&
      mouseX <= width / 2 + 100 &&
      mouseY >= (height * 2) / 3 - 50 &&
      mouseY <= (height * 2) / 3 + 50
    ) {
      //exit();
      startUp = true;
      gameOver = false;
      points = 0;
      eggsCount = eggsArray;
      bird.reset();

      for (let i = 0; i < eggs.length; i++) {
        eggs[i].reset();
      }
    }
  }

  resetButton() {
    fill(this.resetButtonClr);
    stroke(this.resetButtonClr - 50);
    rectMode(CENTER);
    rect(width / 10, height / 10, 200, 100);
    fill(20);
    text('Reset', width / 10, height / 10);
    if (
      mouseIsPressed &&
      mouseX >= width / 10 - 100 &&
      mouseX <= width / 10 + 100 &&
      mouseY >= height / 10 - 50 &&
      mouseY <= height / 10 + 50 &&
      bird.getLaunched()
    ) {
      this.resetButtonClr = 150;
      bird.setDead(true);
      bird.setSpeedx(0);
      bird.setSpeedy(0);
    } else {
      this.resetButtonClr = 200;
    }
  }

  getDiff() {
    return this.difficulty;
  }
}
