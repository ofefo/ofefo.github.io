<CsoundSynthesizer>
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
