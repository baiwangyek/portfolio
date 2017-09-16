window.addEventListener('load', function(){

  // function getLongestLength(svgGroup) {
  //   var svgLine = svgGroup.children[0].children[1];
  //   var longestLength = 0;
  //
  //   for(var i=0; i<svgLine.children.length; i++){
  //     var pathLength = svgLine.children[i].getTotalLength();
  //     if(longestLength < pathLength){ longestLength = pathLength;}
  //   }
  //   return longestLength;
  // }

  // function hideSvgFill(svgGroup) {
  //   var svgFill = svgGroup.children[0].children[0];
  //   svgFill.style.fillOpacity = 0;
  //   svgFill.style.transition = '0.8s';
  // }
  function baiwangInit() {
    var svgArr = document.getElementsByTagName('svg');
    var svgJSON = [
                  {longestLength: 382, dashOffset: 382},
                  {longestLength: 448, dashOffset: 448},
                  {longestLength: 534, dashOffset: 534},
                  {longestLength: 764, dashOffset: 764},
                  {longestLength: 504, dashOffset: 504},
                  {longestLength: 380, dashOffset: 380},
                  {longestLength: 715, dashOffset: 715},
                  {longestLength: 501, dashOffset: 501},
                  {longestLength: 303, dashOffset: 303},
                  {longestLength: 736, dashOffset: 736}];
    var longestIndex = 3;

    for(var i=0; i<svgArr.length; i++){
      svgArr[i].style.visibility = 'visible';
      var svgGroup = svgArr[i].children[2];
      svgJSON[i].element = svgGroup;
      svgGroup.style.strokeDasharray = svgJSON[i].longestLength;
    }

    function drawSvg(){
      if(svgJSON[longestIndex].dashOffset<=0){
        for(var k=0; k<svgJSON.length; k++){
          svgJSON[k].element.style.strokeDashoffset = 0; //make sure every svg is fully drawn
          svgJSON[k].element.children[0].children[0].style.fillOpacity = 1; //show fill
        }

        document.querySelector('.baiwang__hero-text-container').style.opacity = '1';

      }
      else{
        for(var j=0; j<svgJSON.length; j++){
          if(svgJSON[j].dashOffset<=0){
            svgJSON[j].element.style.strokeDashoffset = 0;
          }
          else{
            svgJSON[j].element.style.strokeDashoffset = svgJSON[j].dashOffset;
            svgJSON[j].dashOffset-=8;
            if(svgJSON[j].dashOffset<0){
              svgJSON[j].dashOffset=0;
            }
          }
        }
        requestAnimationFrame(drawSvg);
      }
    }

    requestAnimationFrame(drawSvg);
  }

  if(document.querySelector('.baiwang__body-container')){
    baiwangInit();
  }

});
