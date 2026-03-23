<CsoundSynthesizer>
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
