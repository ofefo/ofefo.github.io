var tStart = 1 // Start transition 100px from top
  , tEnd = 5000   // End at 500px
  , cStart = [75, 75, 75]  // Black
  , cEnd = [32, 32, 32]   // Black grey
  , cDiff = [cEnd[0] - cStart[0], cEnd[1] - cStart[1], cEnd[2] - cStart[2]];

  $(document).ready(function(){
    $(document).scroll(function() {
        var p = ($(this).scrollTop() - tStart) / (tEnd - tStart); // % of transition
        p = Math.min(1, Math.max(0, p)); // Clamp to [0, 1]
        var cBg = [Math.round(cStart[0] + cDiff[0] * p), Math.round(cStart[1] + cDiff[1] * p), Math.round(cStart[2] + cDiff[2] * p)];
        $("body").css('background-color', 'rgb(' + cBg.join(',') +')');
    });
});