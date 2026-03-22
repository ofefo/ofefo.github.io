//var time = Math.floor((Math.random() * 10000) + 5000);

let frases = ['Estropiar', 'Comer do ínfimo', 'Prender o silêncio com fivela', 'Encolher o horizonte', 'Aveludar seu canto', 'Aumentar o silêncio', 'Procurar por lugar nenhum', 'Descomeçar', 'Escutar a cor dos passarinhos', 'Sofrer decomposição lírica', 'Deixar o mato sair na voz', 'Silêncio alto', 'O fim de um lugar', 'Avançar para o começo', 'Pegar no estame do som', 'Antíteses consagram', 'Expressão reta não sonha', 'Puxar o alarme do silêncio', 'Usar um deformante para a voz', 'Experimentar o gozo de criar', 'Silêncio que grita', 'Deslimitar', 'Fotografar o silêncio', 'Gorjeios', 'Ver o silêncio das formas', 'Ar em movimento', 'O tato é mais que o ver', 'O tato é mais que o ouvir', 'O silêncio do bezerro', 'Silêncio de chão', 'A gente queria o arpejo', 'Voz sem boca', 'Compôr silêncios', 'Amar os restos', 'O silêncio de onde acabas de voltar', 'Repetir até ficar diferente', 'Som que ainda não deu liga', 'Sua voz tem um som vegetal', 'O delírio é uma sensatez', 'Dar formato de canto à aspereza da pedra', 'Cantar sem interesse de informar', 'Aprender a harmonia dos gorjeios', 'A altura do som é quase azul', 'Barulinho vermelho'];

function new_random() {	
    what.textContent = frases[Math.floor(Math.random() * frases.length)];
    setTimeout(randomwhat, whatTime);
}

window.onload = init;

function init() {
    const what = document.getElementById('what');
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
	var what_timer;
    
    startButton.onclick = function() {
        new_random();
        var time = Math.floor((Math.random() * 6000) + 6000);
		what_timer = setTimeout(randomwhat, whatTime);
    }
    stopButton.onclick = function () {
		clearTimeout(what_timer);
    }
}
