function Mountain(x) {
  this.xPos = x;

  //float xPos = width + width / 10;

  this.display = function (groundHeight) {
    fill(187);
    stroke(165);
    strokeWeight(7.5);

    triangle(
      this.xPos,
      groundHeight,
      this.xPos - width / 4,
      groundHeight,
      this.xPos - width / 8,
      height - height / 3.5
    );
  };
}
