// Edited from https://github.com/mlhtnc/javascript-chronometer

// Frases
var what;
let frases = ['Estropiar', 'Comer do ínfimo', 'Prender o silêncio com fivela', 'Encolher o horizonte', 'Aveludar seu canto', 'Aumentar o silêncio', 'Procurar por lugar nenhum', 'Descomeçar', 'Escutar a cor dos passarinhos', 'Sofrer decomposição lírica', 'Deixar o mato sair na voz', 'Silêncio alto', 'O fim de um lugar', 'Avançar para o começo', 'Pegar no estame do som', 'Antíteses consagram', 'Expressão reta não sonha', 'Puxar o alarme do silêncio', 'Usar um deformante para a voz', 'Experimentar o gozo de criar', 'Silêncio que grita', 'Deslimitar', 'Fotografar o silêncio', 'Gorjeios', 'Ver o silêncio das formas', 'Ar em movimento', 'O tato é mais que o ver', 'O tato é mais que o ouvir', 'O silêncio do bezerro', 'Silêncio de chão', 'A gente queria o arpejo', 'Voz sem boca', 'Compôr silêncios', 'Amar os restos', 'O silêncio de onde acabas de voltar', 'Repetir até ficar diferente', 'Som que ainda não deu liga', 'Sua voz tem um som vegetal', 'O delírio é uma sensatez', 'Dar formato de canto à aspereza da pedra', 'Cantar sem interesse de informar', 'Aprender a harmonia dos gorjeios', 'A altura do som é quase azul', 'Barulinho vermelho'];

// Add event listeners to buttons
window.addEventListener("load", function() {
  document.getElementById("button-start-stop").addEventListener("click",
    function() {
      isStarted = !isStarted;
      if(isStarted == true) {
        startTime();
      }
      else {
        stopTime();
      }
    }
  );
  document.getElementById("button-reset").addEventListener("click", resetTime);
  document.getElementById("button-lap").addEventListener("click", recordLapTime);

  document.addEventListener("keydown", function(e) {
    e = e || window.event;
    var keycode = e.keyCode || e.which;
    e.preventDefault();

    switch(keycode)
    {
      case 32: // ' ' spacebar
        document.getElementById("button-start-stop").click();
        break;
      case 13:  // 'enter'
        document.getElementById("button-lap").click();
        break;
      case 82:  // 'r'
      case 114: // 'R'
        document.getElementById("button-reset").click();
        break;
    }
  });

  setInterval(checkActiveElement, 100);
});

// Chronometer status
var isStarted = false;
var isReset = true;

var sTime;
var elapsedTime = 0;
var lapCount = 0;

var intervalId;
var buttonIntervalId;


function startTime() {
	sTime = new Date().getTime();
	clearInterval(intervalId);
	intervalId = setInterval(displayTime, 72);
}

function stopTime() {
  clearInterval(intervalId);
  displayTime();

  elapsedTime += getDeltaTime();
}

function resetTime() {
	clearInterval(intervalId);
	isStarted = false;
	elapsedTime = 0;
	lapCount = 0;
	startCount = 0;

  document.getElementById('what').innerHTML = "(...)";
  document.getElementById('time').innerHTML = "00:00:00";
  //document.getElementById('millisec').innerHTML = "000";
  document.getElementById('laps').innerHTML = "";

  // If media matches, slide containers a little bit.
  var media = window.matchMedia("(max-width: 782px)");
  if(media.matches == true) {
    document.getElementsByClassName('button-container')[0].style.top = "55%";
    //document.getElementsByClassName('container')[0].style.minHeight = "50%";
    //document.getElementsByClassName('information')[0].style.minHeight = "50%";
  }
}

// Record lap times
function recordLapTime() {
	if(isStarted == false)
		return;

	elapsedTime += getDeltaTime();
	var timeArr = getTimeAsString(elapsedTime);
	sTime = new Date().getTime();

	what = frases[Math.floor(Math.random() * frases.length)];    
	document.getElementById('what').innerHTML = what;

  // I did a little hack here. after lap#999
  // format would be broken.
  document.getElementById('laps').innerHTML =
  "<pre>#" + (++lapCount) + ((lapCount < 100) ? "\t    " : "    ") + timeArr[0] +
  " - " + what + "</pre>" + document.getElementById('laps').innerHTML;

  // If media matches, slide containers a little bit.
  var media = window.matchMedia("(max-width: 782px)");
  if(media.matches == true) {
    document.getElementsByClassName('button-container')[0].style.top = "45%";
    document.getElementsByClassName('container')[0].style.minHeight ="60%";
    document.getElementsByClassName('information')[0].style.minHeight ="40%";
  }
}

// Gets the passed time since sTime.
function getDeltaTime() {
  var endTime = new Date().getTime();
  return endTime - sTime;
}

// Updates time in HTML.
function displayTime() {
  var delta = elapsedTime + getDeltaTime();
  var timeArr = getTimeAsString(delta);

  document.getElementById('time').innerHTML = timeArr[0];
  //document.getElementById('millisec').innerHTML = timeArr[1];
}

// Get time in milliseconds and return as
// hh:mm:ss | [ms][ms][ms] format.
function getTimeAsString(time) {
  var ms = addLeadingZeros(time % 1000, 3);
  time = parseInt(time / 1000);
  var sec = addLeadingZeros(time % 60, 2);
  time = parseInt(time / 60);
  var min = addLeadingZeros(time % 60, 2);
  time = parseInt(time / 60);
  var hour = addLeadingZeros(time % 60, 2);

  var timeArr = [];
  timeArr.push( hour + ":" + min + ":" + sec );
  timeArr.push( ms );

  return timeArr;
}

// This method helps formating time.
function addLeadingZeros(num, fixedLen) {
  var ret = "";
  var temp = num;
  var numLen = 0;

  while(num != 0 && temp != 0) {
    numLen++;
    temp = parseInt(temp / 10);
  }

  for(var i = 0; i < fixedLen - numLen; i++) {
   ret += "0";
  }

  if(num != 0)
    ret += num;

  return ret;
}

// We don't wanna focus our buttons. Because it has some side effects.
// e.g. spacebar and enter keys will fire activeElement.
function checkActiveElement() {
  var buttonLap = document.getElementById("button-lap");
  var buttonReset = document.getElementById("button-reset");
  var buttonStartStop = document.getElementById("button-start-stop");

  if(document.activeElement == buttonLap   ||
     document.activeElement == buttonReset ||
     document.activeElement == buttonStartStop
  ) {
    document.activeElement.blur();
  }
}
