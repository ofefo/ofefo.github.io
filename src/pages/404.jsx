let engineReady = false;
let engineStarting = false;

function startAudio() {
  if (!engineReady && !engineStarting) {
    engineStarting = true;
    lpRun(() => { engineReady = true; });
  }
}

let balls = [];

if (
let s1 = [C4, D4, E4, Fs4, Gs4, As4, C5, D5, E5, Fs5, Gs5, As5];
let s2 = [Cs4, Ds4, F4, G4, A4, B4, Cs5, Ds5, F5, G5, A5, B5];
let scale = 

let amp;
let WIDTH = 100;
let HEIGHT = 100;

window.setup = function () {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  frameRate(24);
};

window.windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
};

window.draw = function () {
  background(32);
  for (let i = balls.length - 1; i >= 0; i--) {
    balls[i].move();
    balls[i].show();
    if (balls[i].n > 10) {
      balls.splice(i, 1);
    }
  }
};

window.mousePressed = function () {
  startAudio();
  let ball = new Ball(mouseX, mouseY);
  balls.push(ball);
};

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.acc1 = random(-10, 10);
    this.acc2 = random(-10, 10);
    this.c = color(255, random(184), random(77));
    this.n = 0;
  }

  move() {
    let bounced = false;

    if (this.x > windowWidth - WIDTH / 2) {
      amp = Math.abs(this.acc1 / 20);
      this.acc1 = random(10) * -1;
      bounced = true;
    } else if (this.x < 0 + WIDTH / 2) {
      amp = Math.abs(this.acc1 / 20);
      this.acc1 = random(1, 10);
      bounced = true;
    }
    if (this.y > windowHeight - HEIGHT / 2) {
      amp = Math.abs(this.acc2 / 20);
      this.acc2 = random(10) * -1;
      bounced = true;
    } else if (this.y < 0 + HEIGHT / 2) {
      amp = Math.abs(this.acc2 / 20);
      this.acc2 = random(1, 10);
      bounced = true;
    }
    if (bounced) {
      let randomNoteIndex = int(random(0, scale.length));
      let note = scale[randomNoteIndex];
      if (engineReady) {
        lp.play({what: note, howLoud: amp, onSomething: lp.xylophone});
      }
      this.n += 1;
    }
    this.x = this.x + this.acc1;
    this.y = this.y + this.acc2;
  }

  show() {
    stroke(this.c);
    strokeWeight(2);
    fill(32);
    ellipse(this.x, this.y, WIDTH, HEIGHT);
  }
}
