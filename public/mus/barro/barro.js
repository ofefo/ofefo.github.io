let width = window.innerWidth/2;
let height = window.innerHeight/2;
let fontsize = 60;
let texto, time;
let slider = document.getElementById('timeRange');
let value = slider.value;
let output = document.getElementById('prob');

function preload() {
	opensans = loadFont('OpenSans-Regular.ttf');
}

let array = [
'Estropiar', 
'Comer do ínfimo', 
'Prender o silêncio com fivela',
'Encolher o horizonte',
'Aveludar seu canto', 
'Aumentar o silêncio', 
'Procurar por lugar nenhum', 
'Descomeçar', 
'Escutar a cor dos passarinhos', 
'Sofrer decomposição lírica', 
'Deixar o mato sair na voz', 
'Silêncio alto', 
'O fim de um lugar', 
'Avançar para o começo', 
'Pegar no estame do som', 
'Antíteses consagram', 
'Expressão reta não sonha', 
'Puxar o alarme do silêncio', 
'Usar um deformante para a voz',
'Experimentar o gozo de criar', 
'Silêncio que grita',
'Deslimitar', 
'Fotografar o silêncio', 
'Gorjeios', 
'Ver o silêncio das formas', 
'Ar em movimento', 
'O tato é mais que o ver', 
'O tato é mais que o ouvir', 
'O silêncio do bezerro', 
'Silêncio de chão', 
'A gente queria o arpejo', 
'Voz sem boca', 
'Compôr silêncios', 
'Amar os restos', 
'O silêncio de onde acabas de voltar', 
'Repetir até ficar diferente', 
'Som que ainda não deu liga', 
'Sua voz tem um som vegetal', 
'O delírio é uma sensatez', 
'Dar formato de canto à aspereza da pedra', 
'Cantar sem interesse de informar', 
'Aprender a harmonia dos gorjeios', 
'A altura do som é quase azul', 
'Barulinho vermelho'];


function setup() {
	let canvas = createCanvas(width, height);
	canvas.parent('canvas');
	noLoop();
}

function startSketch() {
	textFont(opensans);
	textSize(fontsize);
	textAlign(CENTER, CENTER);
	frameRate(1);
	fill(255);
	noStroke();
	loop();
}

function stopSketch() {
	text("BARRO");
	noLoop();
}

slider.oninput = function() {
	time = this.value * 0.016;
	output.innerHTML = time;
}

function draw() {
	let r = floor(random(0, (array.length)));
	let p = random(0, 1);
	if (p > 0.9) {texto=array[r]} else {texto=texto};
	background(32);
	text(texto, width/2, height/2);  
}

/*
function windowResized() {
        resizeCanvas();  
}
*/

/*
 let mic, recorder, soundFile;

let state = 0; // mousePress will increment from Record, to Stop, to Play

function setup() {
  createCanvas(400, 400);
  background(200);
  fill(0);
  text('Enable mic and click the mouse to begin recording', 20, 20);

  // create an audio in
  mic = new p5.AudioIn();

  // users must manually enable their browser microphone for recording to work properly!
  mic.start();

  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  // create an empty sound file that we will use to playback the recording
  soundFile = new p5.SoundFile();
}

function mousePressed() {
  // use the '.enabled' boolean to make sure user enabled the mic (otherwise we'd record silence)
  if (state === 0 && mic.enabled) {
    // Tell recorder to record to a p5.SoundFile which we will use for playback
    recorder.record(soundFile);

    background(255, 0, 0);
    text('Recording now! Click to stop.', 20, 20);
    state++;
  } else if (state === 1) {
    recorder.stop(); // stop recorder, and send the result to soundFile

    background(0, 255, 0);
    text('Recording stopped. Click to play & save', 20, 20);
    state++;
  } else if (state === 2) {
    soundFile.play(); // play the result!
    saveSound(soundFile, 'mySound.wav'); // save file
    state++;
  }
}
*/

