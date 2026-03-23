import { Csound } from '@csound/browser';
import csdContent from '../csound/meow.csd?raw';

let csound = null;
let isCsoundReady = false;

let activeNotes = {};

// We added 'isBlack' for color/height, and 'pos' to space them like a real piano
const keys = [
    { char: 'a', midi: 60, isBlack: false, pos: 0 },
    { char: 'w', midi: 61, isBlack: true,  pos: 0.5 },
    { char: 's', midi: 62, isBlack: false, pos: 1 },
    { char: 'e', midi: 63, isBlack: true,  pos: 1.5 },
    { char: 'd', midi: 64, isBlack: false, pos: 2 },
    { char: 'f', midi: 65, isBlack: false, pos: 3 },
    { char: 't', midi: 66, isBlack: true,  pos: 3.5 },
    { char: 'g', midi: 67, isBlack: false, pos: 4 },
    { char: 'y', midi: 68, isBlack: true,  pos: 4.5 },
    { char: 'h', midi: 69, isBlack: false, pos: 5 },
    { char: 'u', midi: 70, isBlack: true,  pos: 5.5 },
    { char: 'j', midi: 71, isBlack: false, pos: 6 },
    { char: 'k', midi: 72, isBlack: false, pos: 7 }
];

const keyMap = {};
keys.forEach(k => keyMap[k.char] = k.midi);

async function startCsound() {
    if (csound === null) {
        csound = await Csound();
        await csound.setOption('-odac');
        await csound.compileCSD(csdContent);
        await csound.start();
        isCsoundReady = true;
    }
}

function playNote(midiNote, keyElement, keyChar) {
    if (!isCsoundReady) return;
    
    if (keyElement) keyElement.classList.add('active');
    setTimeout(() => {
        if (keyElement) keyElement.classList.remove('active');
    }, 200);

    if (keyChar) activeNotes[keyChar] = 30; 

    csound.inputMessage(`i 1 0 0.8 ${midiNote} 0.5`);
}

// --- DOM Event Listeners ---
document.getElementById('start-btn').addEventListener('click', async (e) => {
    e.target.innerText = "Loading Csound...";
    e.target.disabled = true;

    await startCsound();
    
    e.target.style.display = 'none'; 
    
    const piano = document.getElementById('piano');
    if(piano) {
        piano.style.opacity = '1';
        piano.style.pointerEvents = 'auto';
    }
});

document.querySelectorAll('.key').forEach(keyDiv => {
    keyDiv.addEventListener('mousedown', () => {
        const midi = parseInt(keyDiv.getAttribute('data-midi'));
        const keyChar = keyDiv.getAttribute('data-key');
        playNote(midi, keyDiv, keyChar);
    });
});

document.addEventListener('keydown', (event) => {
    if (event.repeat) return; 
    
    const keyStr = event.key.toLowerCase();
    if (keyMap.hasOwnProperty(keyStr)) {
        const midi = keyMap[keyStr];
        const keyElement = document.querySelector(`.key[data-key="${keyStr}"]`);
        playNote(midi, keyElement, keyStr);
    }
});

// --- p5.js Sketch ---
window.setup = function() {
    let canvas = createCanvas(windowWidth*.9, 800);
    canvas.parent(document.body);
    canvas.elt.style.display = "block";
    canvas.elt.style.margin = "0 auto";
    colorMode(HSB, 360, 100, 100);
};

window.draw = function() {
    background(12); 

    // Update all timers first
    for (let k of keys) {
        if (activeNotes[k.char] > 0) activeNotes[k.char]--;
    }

    let numWhiteKeys = 8;
    let whiteSpacing = width / numWhiteKeys;

    for (let k of keys) {
        if (k.isBlack) continue;

        let xPos = (k.pos * whiteSpacing) + (whiteSpacing / 2);
        let yPos = 300;
        let isMeowing = activeNotes[k.char] > 0;
        
        let catColor = color(40, 20, 95);
        let earColor = color(40, 30, 85);

        drawCat(xPos, yPos, catColor, earColor, isMeowing, whiteSpacing * .5);
    }

    for (let k of keys) {
        if (!k.isBlack) continue;

        let xPos = (k.pos * whiteSpacing) + (whiteSpacing / 2);
        let yPos = 100; // Higher up
        let isMeowing = activeNotes[k.char] > 0;
        
        let catColor = color(0, 0, 45); // Greyish
        let earColor = color(0, 0, 30);

        drawCat(xPos, yPos, catColor, earColor, isMeowing, whiteSpacing * .5); 
    }
};

function drawCat(x, y, bodyColor, earColor, isMeowing, scaleFactor) {
    push();
    translate(x, y+75);
    scale(scaleFactor / 80); 
    
    // Ears
    fill(earColor);
    noStroke();
    triangle(-60, -40, -80, -100, -20, -60);
    triangle(60, -40, 80, -100, 20, -60);
    
    // Head
    fill(bodyColor);
    ellipse(0, 0, 160, 140);
    
    // Eyes
    fill(255);
    ellipse(-30, -10, 30, 40);
    ellipse(30, -10, 30, 40);
    fill(0);
    ellipse(-30, -10, 10, 25);
    ellipse(30, -10, 10, 25);

    // Mouth/Nose
    fill(0);
    if (isMeowing) {
        ellipse(0, 35, 30, 45); // Open mouth
    } else {
        triangle(-10, 25, 10, 25, 0, 35); // Closed mouth
    }
    pop();
}

window.windowResized = function() {
    resizeCanvas(windowWidth, windowHeight);
};
