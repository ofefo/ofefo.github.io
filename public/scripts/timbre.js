let engineReady = false;
let engineStarting = false;

const TOTAL_ROUNDS = 10;
const TEMPO = 0.35;

let difficulty = "facil";
let score = 0;
let round = 0;
let answered = false;
let game = null;

const gameEl = document.getElementById("game");

function buildOptions(pool, correct) {
  const others = lp.shuffle(pool.filter((p) => p !== correct)).slice(0, 2);
  const opts = lp.shuffle([correct, ...others]);
  return { opts, correctIdx: opts.indexOf(correct) };
}

function renderStart() {
  answered = false;
  const diffs = [
    ["facil", "Fácil"],
    ["dificil", "Difícil"],
  ]
    .map(
      ([v, label]) =>
        `<button class="mem-btn mem-diff${difficulty === v ? " on" : ""}" data-diff="${v}">${label}</button>`,
    )
    .join("");
  gameEl.innerHTML = `
  <div class="mem-card">
    <p class="mem-prompt">Escolha o nível de dificuldade:</p>
    <div class="mem-diffs">${diffs}</div>
    <button class="mem-btn mem-start" data-start="1">COMEÇAR</button>
  </div>`;
}

function startEngine(fn) {
  if (engineReady) {
    fn();
    return;
  }
  if (engineStarting) return;
  engineStarting = true;
  lpRun(() => {
    engineReady = true;
    fn();
  });
}

function beginSession() {
  score = 0;
  round = 0;
  newRound();
}

function newRound() {
  round += 1;
  answered = false;
  if (round > TOTAL_ROUNDS) {
    endGame();
    return;
  }
  
  const song = lp.choose(MELODIES);
  
  const validFamilies = difficulty === "dificil"
      ? FAMILIES.filter(f => f.instruments.length >= 3)
      : FAMILIES;
      
  const correctFamObj = lp.choose(validFamilies);
  const correct = lp.choose(correctFamObj.instruments);
  
  let pool = [];
  if (difficulty === "dificil") {
    pool = correctFamObj.instruments;
  } else {
    const otherFams = FAMILIES.filter(f => f !== correctFamObj);
    pool = otherFams.map(f => lp.choose(f.instruments));
    pool.push(correct);
  }
  
  const { opts, correctIdx } = buildOptions(pool, correct);
  game = { type: "melody", song, instrument: correct, opts, correctIdx };
  
  renderRound();
  playRound();
}

function renderRound() {
  const answers = game.opts
    .map(
      (o, i) => `<button class="mem-btn mem-ans" data-answer="${i}">${o.name}</button>`,
    )
    .join("");
  gameEl.innerHTML = `
  <div class="mem-top">
    <span>Rodada ${round} de ${TOTAL_ROUNDS}</span>
    <span data-score="1">Pontos: ${score}</span>
  </div>
  <p class="mem-prompt">Qual instrumento está tocando?</p>
  <div class="mem-answers">${answers}</div>
  <div class="mem-controls">
    <button class="mem-btn mem-replay" data-replay="1">Ouvir de novo</button>
  </div>
  <div class="mem-feedback" data-feedback="1"></div>`;
}

function playRound() {
  answered = false;
  const fb = document.querySelector("[data-feedback]");
  if (fb) fb.textContent = "Ouvindo...";
  const done = () => {
    const inst = lp[game.instrument.inst];
    let currentTime = 0;
    
    const events = game.song.sequence.map(([pitch, beats]) => {
      const durationSecs = beats * TEMPO;
      const event = [pitch, lp.loud, currentTime, durationSecs * 0.85, inst];
      currentTime += durationSecs;
      return event;
    });
    
    lp.eventList.create(...events).play();
  };
  if (engineReady) {
    lp.reset().then(done);
  } else {
    done();
  }
}

function playJingle(correct) {
  if (correct) {
    lp.arpeggio([C4, lp.loud, 0, 0.3, lp.glockenspiel], [C4, E4, G4, B4], 1, "forward").play();
  } else {
    lp.arpeggio([G4, lp.loud, 0, 0.3, lp.trombone], [G3, D3, B2, Ab2], 1, "forward").play();
  }
}

function answer(i) {
  if (answered || !game) return;
  answered = true;
  const fb = document.querySelector("[data-feedback]");
  const btn = document.querySelector(`[data-answer="${i}"]`);
  const rightBtn = document.querySelector(`[data-answer="${game.correctIdx}"]`);
  if (i === game.correctIdx) {
    btn.classList.add("mem-correct");
    fb.className = "mem-feedback mem-ok";
    fb.textContent = "Muito bem! " + game.opts[i].name + "!";
    score += 1;
    const sc = document.querySelector("[data-score]");
    if (sc) sc.textContent = "Pontos: " + score;
    lp.reset().then(() => setTimeout(() => playJingle(true), 60));
  } else {
    btn.classList.add("mem-wrong");
    rightBtn.classList.add("mem-correct");
    fb.className = "mem-feedback mem-nope";
    fb.textContent = "Não foi dessa vez. Era " + game.opts[game.correctIdx].name + ".";
    lp.reset().then(() => setTimeout(() => playJingle(false), 60));
  }
  const replay = document.querySelector("[data-replay]");
  if (replay) {
    replay.outerHTML = `<button class="mem-btn mem-next" data-next="1">${
      round >= TOTAL_ROUNDS ? "Ver resultado" : "Próxima"
    }</button>`;
  }
}

function next() {
  if (!answered) return;
  newRound();
}

function endGame() {
  answered = false;
  const pct = score / TOTAL_ROUNDS;
  const msg =
    pct < 0.4
      ? "Boa tentativa! Vamos ouvir com atenção e tentar de novo?"
      : pct < 0.7
        ? "Muito bem! Você está aprendendo!"
        : pct < 1
          ? "Parabéns! Você conhece bem os instrumentos!"
          : "Perfeito! Você é um mestre dos instrumentos!";
  gameEl.innerHTML = `
  <div class="mem-card mem-end">
    <p class="mem-score">${score} de ${TOTAL_ROUNDS}</p>
    <p class="mem-endmsg">${msg}</p>
    <button class="mem-btn mem-start" data-restart="1">JOGAR DE NOVO</button>
  </div>`;
}

function selectDifficulty(d) {
  difficulty = d;
  document.querySelectorAll("[data-diff]").forEach((b) => {
    b.classList.toggle("on", b.getAttribute("data-diff") === d);
  });
}

gameEl.addEventListener("click", (e) => {
  const t = e.target.closest("button");
  if (!t) return;
  if (t.hasAttribute("data-diff")) {
    selectDifficulty(t.getAttribute("data-diff"));
  } else if (t.hasAttribute("data-start")) {
    startEngine(beginSession);
  } else if (t.hasAttribute("data-replay")) {
    playRound();
  } else if (t.hasAttribute("data-next")) {
    next();
  } else if (t.hasAttribute("data-restart")) {
    renderStart();
  } else if (t.hasAttribute("data-answer")) {
    answer(Number(t.getAttribute("data-answer")));
  }
});

renderStart();
