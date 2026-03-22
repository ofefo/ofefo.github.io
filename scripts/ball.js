import { Csound } from '@csound/browser';
let csound = null;

window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
window.windowResized = windowResized;

const code = `
sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

instr 1
	kEnv = linseg(0, .001, .5, p3/2, .1, p3/2, 0)
	aOsc = poscil(kEnv*p4, mtof(p5))
	aLeft, aRight pan2 tanh(aOsc), p6
    
	outs aLeft, aRight
endin
`

async function startSound(note, amp) {
	if(csound === null) {
		csound = await Csound();
		await csound.setOption('-odac');
		await csound.compileOrc(code);
		await csound.start();
	}
}

async function playNote(note, amp, pan){
	await csound.inputMessage('i 1 0 1 '+amp+' '+note+' '+pan);
}

var x, y, c, acc1, acc2;
let balls = [];

let scale = [60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82];
let noteIndex = 0;

let note, amp, ball;
let WIDTH = 100;
let HEIGHT = 100;

function setup(){
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	canvas.style('z-index', '-1');
	frameRate(24);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(32);
	for (let i = balls.length - 1; i >= 0; i--){
		balls[i].move();
		balls[i].show();
		if (balls[i].n > 10) {
			balls.splice(i, 1);	
		}
	}
}

function mousePressed () {
	startSound();
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
		this.n = 0; //number of collisions
	}
	
	move() {
		let bounced = false;

		if (this.x > windowWidth) {
			amp = Math.abs(this.acc1 / 20);
			this.acc1 = random(10) * -1;
			bounced = true;
		}
		else if (this.x < 0) {
			amp = Math.abs(this.acc1 / 20);
			this.acc1 = random(1, 10);
			bounced = true;
		}
		if (this.y > windowHeight) {
			amp = Math.abs(this.acc2 / 20);
			this.acc2 = random(10) * -1;
			bounced = true;
		}
		else if (this.y < 0) {
			amp = Math.abs(this.acc2 / 20);
			this.acc2 = random(1, 10);		
			bounced = true;
		}
		if (bounced) {
			let randomNoteIndex = int(random(0, scale.length));
			note = scale[randomNoteIndex];
			let pan = constrain(this.x / windowWidth, 0, 1);
			playNote(note, amp, pan);
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
