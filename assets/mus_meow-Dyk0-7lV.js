import{t as e}from"./csound-DzuKOPi5.js";import"./modulepreload-polyfill-Ds44HaI2.js";/* empty css              */var t=`<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

instr 1 
	iDur = p3
	iFreq = mtof:i(p4)
	iAmp = p5
	
	kPitch = linseg(iFreq * 0.9, iDur * 0.2, iFreq , iDur * 0.6, iFreq, iDur * 0.2, iFreq * 0.8)
	kAmp = linseg(0, iDur * 0.1, iAmp, iDur * 0.6, iAmp * 0.8, iDur * 0.3, 0)
	aSig = vco2(kAmp, kPitch)
	kCutoff = expseg(3000, iDur * 0.5, 1500, iDur * 0.5, 300)
	aFilter = moogladder(aSig, kCutoff, 0.8)
	
	outs tanh(aFilter), tanh(aFilter)
endin

</CsInstruments>
<CsScore>
i 1 0 z
</CsScore>
</CsoundSynthesizer>
`,n=null,r=!1,i={},a=[{char:`a`,midi:60,isBlack:!1,pos:0},{char:`w`,midi:61,isBlack:!0,pos:.5},{char:`s`,midi:62,isBlack:!1,pos:1},{char:`e`,midi:63,isBlack:!0,pos:1.5},{char:`d`,midi:64,isBlack:!1,pos:2},{char:`f`,midi:65,isBlack:!1,pos:3},{char:`t`,midi:66,isBlack:!0,pos:3.5},{char:`g`,midi:67,isBlack:!1,pos:4},{char:`y`,midi:68,isBlack:!0,pos:4.5},{char:`h`,midi:69,isBlack:!1,pos:5},{char:`u`,midi:70,isBlack:!0,pos:5.5},{char:`j`,midi:71,isBlack:!1,pos:6},{char:`k`,midi:72,isBlack:!1,pos:7}],o={};a.forEach(e=>o[e.char]=e.midi);async function s(){n===null&&(n=await e(),await n.setOption(`-odac`),await n.compileCSD(t),await n.start(),r=!0)}function c(e,t,a){r&&(t&&t.classList.add(`active`),setTimeout(()=>{t&&t.classList.remove(`active`)},200),a&&(i[a]=30),n.inputMessage(`i 1 0 0.8 ${e} 0.5`))}document.getElementById(`start-btn`).addEventListener(`click`,async e=>{e.target.disabled=!0,await s(),e.target.style.display=`none`;let t=document.getElementById(`piano`);t&&(t.style.opacity=`1`,t.style.pointerEvents=`auto`)}),document.querySelectorAll(`.key`).forEach(e=>{e.addEventListener(`mousedown`,()=>{c(parseInt(e.getAttribute(`data-midi`)),e,e.getAttribute(`data-key`))})}),document.addEventListener(`keydown`,e=>{if(e.repeat)return;let t=e.key.toLowerCase();if(o.hasOwnProperty(t)){let e=o[t];c(e,document.querySelector(`.key[data-key="${t}"]`),t)}}),window.setup=function(){let e=createCanvas(windowWidth*.9,800);e.parent(document.body),e.elt.style.display=`block`,e.elt.style.margin=`0 auto`,colorMode(HSB,360,100,100)},window.draw=function(){background(12);for(let e of a)i[e.char]>0&&i[e.char]--;let e=width/8;for(let t of a){if(t.isBlack)continue;let n=t.pos*e+e/2,r=i[t.char]>0;l(n,300,color(40,20,95),color(40,30,85),r,e*.5)}for(let t of a){if(!t.isBlack)continue;let n=t.pos*e+e/2,r=i[t.char]>0;l(n,100,color(0,0,45),color(0,0,30),r,e*.5)}};function l(e,t,n,r,i,a){push(),translate(e,t+75),scale(a/80),fill(r),noStroke(),triangle(-60,-40,-80,-100,-20,-60),triangle(60,-40,80,-100,20,-60),fill(n),ellipse(0,0,160,140),fill(255),ellipse(-30,-10,30,40),ellipse(30,-10,30,40),fill(0),ellipse(-30,-10,10,25),ellipse(30,-10,10,25),fill(0),i?ellipse(0,35,30,45):triangle(-10,25,10,25,0,35),pop()}window.windowResized=function(){resizeCanvas(windowWidth,windowHeight)};