var dvds = [];
var dvd;
var hit;
var pops;
var total = 25;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

function preload() {
  dvd = loadImage("dvd.png");
  hit = loadSound("hit.mp3");
  pops = loadSound("pop.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  for (let i = dvds.length - 1; i >= 0; i--) {
    dvds[i].show();
    dvds[i].move();
  }
}

function mouseClicked() {
  if (dvds.length <= total) {
    pops.play(0, random(0.9, 1.1));
    let x = random(5, width - 200);
    let y = random(5, height - 100);
    let w = random(100, 195);
    let h = random(50, 95);
    let xspd = random(2, 6);
    let yspd = random(1, 3);
    dvds.push(new DVD(x, y, w, h, xspd, yspd));
  }
}

function keyPressed() {
  if (keyCode == 32 && dvds.length > 0) {
    pops.play(0, random(0.9, 1.1));
    dvds.splice(0, 1);
    background(0);
  }
}

class DVD {
  constructor(x, y, w, h, xspd, yspd) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.xspd = xspd;
    this.yspd = yspd;
    this.r = random(100, 255);
    this.g = random(100, 255);
    this.b = random(100, 255);
  }

  show() {
    tint(this.r, this.g, this.b);
    fill(this.r - 100, this.g - 100, this.b - 100);
    rect(this.x, this.y, this.w, this.h);
    image(dvd, this.x, this.y, this.w, this.h);
  }

  move() {
    this.x += this.xspd;
    this.y += this.yspd;

    if (this.x >= width - this.w || this.x <= 0) {
      this.r = random(100, 255);
      this.g = random(100, 255);
      this.b = random(100, 255);
      this.xspd = -this.xspd;
      hit.play(0, random(0.9, 1.1));
    }

    if (this.y >= height - this.h || this.y <= 0) {
      this.r = random(100, 255);
      this.g = random(100, 255);
      this.b = random(100, 255);
      this.yspd = -this.yspd;
      hit.play(0, random(0.9, 1.1));
    }
  }
}
