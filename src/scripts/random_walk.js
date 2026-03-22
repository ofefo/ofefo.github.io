var pos;
var prev;

function windowResized() {
	resizeCanvas()	
}

function setup(){
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	//canvas.style('z-index', '-1');
	//background(32);
	frameRate(10);

	pos = createVector(random(windowWidth), random(windowHeight));
	prev = pos.copy();
	noFill();
}

function draw() {
	stroke(random(0, 100), random(100, 200), random(100, 200), 100);
	strokeWeight(0.5);
	var r = random(1);
	var updown = floor(random(-2, 2));

	if (r > 0.98) {
		point(pos.x, pos.y);
		bezier(pos.x, 
			pos.y, 
			random(windowWidth), 
			random(windowWidth), 
			random(windowWidth), 
			random(windowWidth), 
			prev.x, 
			prev.y)
		prev.set(pos);

		var step = p5.Vector.random2D();
		step.mult(random(windowWidth/5) + 1);
		pos.add(step);
	} else {
		point(pos.x, pos.y);
		bezier(pos.x, 
			pos.y, 
			pos.x + random(-50, 50),
			pos.y + random(-50, 50),
			prev.x + random(-50, 50),
			prev.y + random(-50, 50),
			prev.x, 
			prev.y)
		prev.set(pos);
		
		var step = p5.Vector.random2D();
		step.mult(random(5, 10) + 1);
		pos.add(step);
	}
}
