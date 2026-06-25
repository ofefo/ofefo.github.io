---
title: ". lab"
layout: ../../layouts/BaseLayout.astro
---

<div id="canvas-container" style="text-align:center;"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/2.0.5/p5.min.js" is:inline></script>

<script>
const width = 800;
const height = 800;
var secondCanvas;
var pixelCanvas;

var balls = [];
var lines = [];
var pollocks = [];
var impacts = [];
var dots = [];
var stains = [];
var parametrics = [];

var generator = 0;
var lineGrowing = 0;
var pollockAlive = 0;
var dotAlive = 0;
var paraAlive = 0;
var xoff = 0;
var inc = 0.03;
var t = 0;
var rx1, rx2, ry1, ry2;
var arrayX = [];
var arrayY = [];
var arrayS = [];

var maxBalls = 11;

var pr, pg, pb;
var paper;

function mod(n, m) {
  return ((n % m) + m) % m;
}

var overAllTexture;

window.setup = function () {
  let renderer = createCanvas(width, height);
  renderer.parent("canvas-container");

  paper = new makeFilter();

  secondCanvas = createGraphics(width, height);
  secondCanvas.clear();

  background(255, 236, 223);
  frameRate(30);
  angleMode(DEGREES);

  pr = random(255);
  pg = random(255);
  pb = random(255);
};

window.draw = function () {
  generator = random();

  background(255, 255, 255);
  image(secondCanvas, 0, 0);

  makeBall(generator);

  if (lineGrowing == 0) {
    makeLine(generator);
  }

  if (pollockAlive == 0) {
    makePollock(generator);
  }

  for (let i = 0; i < pollocks.length; i++) {
    pollocks[i].paint(generator);
    if (pollocks[i].isAlive == 1) {
      pollockAlive = 1;
      pr = mod(pollocks[i].r, 255);
      pg = mod(pollocks[i].g, 255);
      pb = mod(pollocks[i].b, 255);
    } else {
      pollockAlive = 0;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    lines[i].grow();
    lines[i].show();
    if (lines[i].growing == 1) {
      lineGrowing = 1;
    } else {
      lineGrowing = 0;
    }
  }

  if (dotAlive == 0) {
    makeDots(generator);
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].move();
    if (dots[i].isAlive == 1) {
      dots[i].show();
      dotAlive = 1;
    } else {
      dotAlive = 0;
    }
  }

  maxBalls = 11 - balls.length;
  for (let i = 0; i < balls.length; i++) {
    balls[i].move();
    if (balls[i].col) {
      impacts[i].move(balls[i].x, balls[i].y);
      impacts[i].show(balls[i].s);
    }
    balls[i].show();
    if (balls[i].n > maxBalls) {
      let stain = new Stain(balls[i].x, balls[i].y, balls[i].s, balls[i].c);
      stain.define();
      stains.push(stain);

      balls.splice(i, 1);
      impacts.splice(i, 1);
    }
  }

  for (let i = 0; i < stains.length; i++) {
    stains[i].show();
  }

  image(overAllTexture, 0, 0);

  if (paraAlive == 0) {
    makeParametric(generator);
  }
  for (let i = 0; i < parametrics.length; i++) {
    if (parametrics[i].isAlive == 1) {
      parametrics[i].show();
    } else {
      paraAlive == 0;
      parametrics.splice(i, 1);
    }
  }
};

function makeBall(generator) {
  if (generator > 0.999) {
    let ball = new Ball;
    balls.push(ball);
    let impact = new Impact(ball.x, ball.y, ball.s);
    impacts.push(impact);
  }
}

function makePollock(generator) {
  if (generator < 0.001) {
    let pollock = new Pollock(mod(pr, 255), mod(pg, 255), mod(pb, 255));
    pollocks.push(pollock);
  }
}

function makeLine(generator) {
  if (generator > 0.499 && generator < 0.5) {
    let line = new Line();
    lines.push(line);
  }
}

function makeDots(generator) {
  if (generator > 0.199 && generator < 0.2) {
    let dot = new Dot();
    dots.push(dot);
  }
}

function makeParametric(generator) {
  if (generator > 0.299 && generator < 0.3) {
    rx1 = random(width);
    ry1 = random(width);
    rx2 = random(width);
    ry2 = random(width);

    let n = random(1, 5);
    let parametric = new Parametric(n);
    parametrics.push(parametric);
  }
}

class Ball {
  constructor() {
    this.s = random(70, 100);
    this.x = random(width - this.s);
    this.y = random(height - this.s);

    this.vx = random(-5, 5);
    this.vy = random(-5, 5);

    this.c = color(random(255), random(255), random(255), random(50, 200));
    this.sc = color(0);
    this.n = 0;
    this.col = false;
  }

  move() {
    this.col = false;
    if (this.x + (this.s / 2) > width) {
      this.col = true;
      this.vx = random(5) * -1;
      this.n++;
    } else if (this.x - (this.s / 2) < 0) {
      this.col = true;
      this.vx = random(5);
      this.n++;
    }
    if (this.y + (this.s / 2) > height) {
      this.col = true;
      this.vy = random(5) * -1;
      this.n++;
    } else if (this.y - (this.s / 2) < 0) {
      this.col = true;
      this.vy = random(5);
      this.n++;
    }
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;
  }

  show() {
    stroke(this.sc);
    strokeWeight(2);
    fill(this.c);
    ellipse(this.x, this.y, this.s);
  }
}

class Impact {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.c = color(random(255), random(255), random(255), random(150, 200));
  }

  move(x, y) {
    this.x = x;
    this.y = y;
  }

  show() {
    noStroke();
    fill(this.c);
    ellipse(this.x, this.y, this.s * 2);
  }
}

class Stain {
  constructor(x, y, s, c) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.c = c;
    this.l = int(random(5, 10));
  }
  define() {
    for (let i = 0; i < this.l; i++) {
      let x = random(10);
      let y = random(10);
      let s = random(1);
      arrayX.push(x);
      arrayY.push(y);
      arrayS.push(s);
    }
  }

  show() {
    noStroke();
    fill(this.c);
    for (let i = 0; i < this.l; i++) {
      ellipse(this.x + arrayX[i], this.y + arrayY[i], this.s * arrayS[i]);
    }
  }
}

class Line {
  constructor() {
    this.x1 = random(width * 0.2, width * 0.8);
    this.y1 = random(height * 0.2, height * 0.8);
    this.x2 = this.x1;
    this.y2 = this.y1;

    this.xg = random(-2, 2);
    this.yg = random(-2, 2);
    this.sW = random(2, 10);

    this.size = random(height / 2, width / 2);
    this.growing = 0;
  }
  grow() {
    if (dist(this.x1, this.y1, this.x2, this.y2) < this.size) {
      this.growing = 1;
      this.x2 += this.xg;
      this.y2 += this.yg;
    } else if (this.x2 == width || this.y2 == height || this.x2 == 0 || this.y2 == 0) {
      this.growing = 0;
      this.xg = 0;
      this.yg = 0;
    } else {
      this.growing = 0;
      this.xg = 0;
      this.yg = 0;
    }
  }
  show() {
    stroke(0);
    strokeWeight(this.sW);
    line(this.x1, this.y1, this.x2, this.y2);
  }
}

class Pollock {
  constructor(r, g, b) {
    this.x = random(width);
    this.y = random(height);
    this.n = 0;
    this.pos = createVector(this.x, this.y);
    this.prev = this.pos.copy();
    this.r = r;
    this.g = g;
    this.b = b;
    this.isAlive = 1;
  }
  paint(generator) {
    secondCanvas.stroke(
      this.r = this.r + map(random(), 0, 1, -2, 2),
      this.g = this.g + map(random(), 0, 1, -2, 2),
      this.b = this.b + map(random(), 0, 1, -2, 2),
      map(generator, 0, 1, 0, 100));

    secondCanvas.noFill(100);
    secondCanvas.strokeWeight(generator * random(5));
    if (this.n < 10) {
      if (generator > 0.9) {
        secondCanvas.point(this.pos.x, this.pos.y);
        secondCanvas.bezier(this.pos.x,
          this.pos.y,
          random(width / 2),
          random(width / 2),
          random(width / 2),
          random(width / 2),
          random(width / 2) - this.prev.x,
          random(height / 2) - this.prev.y);
        this.prev.set(this.pos);

        this.step = p5.Vector.random2D();
        this.step.mult(random(width / 5) + 1);
        this.pos.add(this.step);
        this.n++;
      } else {
        secondCanvas.point(this.pos.x, this.pos.y);
        secondCanvas.bezier(
          this.pos.x,
          this.pos.y,
          this.pos.x + random(width * random(-1, 1), height * random(-1, 1)),
          this.pos.y + random(width * random(-1, 1), height * random(-1, 1)),
          this.prev.x + random(width * random(-1, 1), height * random(-1, 1)),
          this.prev.y + random(width * random(-1, 1), height * random(-1, 1)),
          this.prev.x,
          this.prev.y);
        this.prev.set(this.pos);

        this.step = p5.Vector.random2D();
        this.step.mult(random(5, 10) + 1);
        this.pos.add(this.step);
        this.n++;
      }
      this.n++;
    } else {
      this.isAlive = 0;
    }
  }
}

class Dot {
  constructor() {
    this.x = random(width);
    this.y = random(height);

    this.sw = random(10);
    this.c = random(255);
    this.n = 0;
    this.isAlive = 1;

    this.r = random();
  }

  move() {
    if (this.r > 0.15 && this.r < 0.25) {
      this.sw = random(1, 10);
      this.c = random(100);
      if (this.n < 100) {
        this.x = (this.x + random(-15, 15));
        this.y = (this.y + random(-15, 15));
        this.n++;
      } else {
        this.isAlive = 0;
      }
    }
    this.r = random();
  }

  show() {
    secondCanvas.stroke(this.c);
    secondCanvas.strokeWeight(this.sw);
    secondCanvas.point(this.x, this.y);
  }
}

function polygon() {
  translate(width / 10, height / 10);
  fill(random(255), random(255), random(255));
  beginShape()
  for (let i = 0; i < 100; i++) {
    curveVertex(map(noise(xoff), 0, 1, 0, height) + (inc * 10), map(noise(yoff), 0, 1, 0, height) + (inc * 10));
    xoff = xoff + inc;
    yoff = yoff + inc;
  }
  endShape(CLOSE);
}

function curved() {
  secondCanvas.strokeWeight(map(noise(xoff), 0, 1, 1, 30));
  if (mouseIsPressed === true) {
    secondCanvas.line(mouseX, mouseY, pmouseX, pmouseY);
    xoff = xoff + inc;
  }
}

function x1(t) { return sin(t / 10) * 100 + rx1; }

function y1(t) { return cos(t / 10) * 100 + ry1; }

function x2(t) { return sin(t / 10) * 100 + rx2; }

function y2(t) { return cos(t / 10) * 100 + ry2; }

function parametric(n) {
  stroke(0);
  strokeWeight(5);
  translate(width / 2, height / 2);
  for (let i = 0; i < n; i++) {
    line(x1(t + i * 200), y1(t + i * 200), x2(t + i * 200), y2(t + i * 200));
  }
}

class Parametric {
  constructor(n) {
    this.t = 0;
    this.n = n;
    this.vt = random(10, 100);
    this.isAlive = 1;
  }

  show() {
    stroke(0);
    strokeWeight(5);

    for (let i = 0; i < this.n; i++) {
      line(x1(this.t + i + 200), y1(this.t + i + 200), x2(this.t + i + 200), y2(this.t + i + 200));
    }

    this.t = this.t + this.vt;
    t = this.t;

    if (this.t > random(100000, 200000)) {
      this.isAlive = 0;
    }
  }

}

function makeFilter() {
  let scale = 2;
  let w = int(width / scale);
  let h = int(height / scale);
  overAllTexture = createGraphics(w, h);
  overAllTexture.loadPixels();
  for (var i = 0; i < w; i++) {
    for (var j = 0; j < h; j++) {
      overAllTexture.set(i, j, color(0, 0, 0,
        2 * noise(i / 3, j / 3, (i * j) / 50) * (5 + 10 * Math.random())));
    }
  }
  overAllTexture.updatePixels();
  let temp = createGraphics(displayWidth, displayHeight);
  temp.image(overAllTexture, 0, 0, displayWidth, displayHeight);
  push();
  rotate(radians(45));
  temp.image(overAllTexture, 0, 0, displayWidth * 3, displayHeight * 3);
  overAllTexture = temp;
  pop();
}

window.mousePressed = function () {
};
</script>
