import{t as e}from"./csound-DzuKOPi5.js";import"./modulepreload-polyfill-Ds44HaI2.js";/* empty css              */var t=`<CsoundSynthesizer>
<CsOptions>
</CsOptions>
<CsInstruments>
sr	=	48000
ksmps	=	1
nchnls	=	2
0dbfs	=	1

instr 1
	kFreq = mtof(p5) 
	iFreq = mtof:i(p5) 

	kEnv = linseg(0, .001, .5, p3/2, .1, p3/2, 0)
	aString = pluck(kEnv*p4, kFreq, iFreq, 0, 6)
	aLeft, aRight pan2 tanh(aString), p6
    
	outs aLeft, aRight
endin
</CsInstruments>
<CsScore>
;ins 	number	when	infinite
i 	1 	0	z
e

</CsScore>
</CsoundSynthesizer>
`,n=null;window.setup=d,window.draw=p,window.mousePressed=m,window.windowResized=f;async function r(r,i){n===null&&(n=await e(),await n.setOption(`-odac`),await n.compileCSD(t),await n.start())}async function i(e,t,r){await n.inputMessage(`i 1 0 1 `+t+` `+e+` `+r)}var a=[],o=[60,62,64,66,68,70,72,74,76,78,80,82],s,c,l=100,u=100;function d(){var e=createCanvas(windowWidth,windowHeight);e.position(0,0),e.style(`z-index`,`-1`),frameRate(24)}function f(){resizeCanvas(windowWidth,windowHeight)}function p(){background(32);for(let e=a.length-1;e>=0;e--)a[e].move(),a[e].show(),a[e].n>10&&a.splice(e,1)}function m(){r();let e=new h(mouseX,mouseY);a.push(e)}var h=class{constructor(e,t){this.x=e,this.y=t,this.acc1=random(-10,10),this.acc2=random(-10,10),this.c=color(255,random(184),random(77)),this.n=0}move(){let e=!1;if(this.x>windowWidth-l/2?(c=Math.abs(this.acc1/20),this.acc1=random(10)*-1,e=!0):this.x<0+l/2&&(c=Math.abs(this.acc1/20),this.acc1=random(1,10),e=!0),this.y>windowHeight-u/2?(c=Math.abs(this.acc2/20),this.acc2=random(10)*-1,e=!0):this.y<0+u/2&&(c=Math.abs(this.acc2/20),this.acc2=random(1,10),e=!0),e){s=o[int(random(0,o.length))];let e=constrain(this.x/windowWidth,0,1);i(s,c,e),this.n+=1}this.x+=this.acc1,this.y+=this.acc2}show(){stroke(this.c),strokeWeight(2),fill(32),ellipse(this.x,this.y,l,u)}};