window.addEventListener('load', function(){
  console.log('in');
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

  function youInit(){
    if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

    var camera, scene, renderer;
    var geometry, material, mesh;

    function setup() {

      var W = window.innerWidth;
      // var H = window.innerHeight;
      //var H = 500;
      if(window.innerWidth <= 650){
        var H = 300;
      }
      else{
        var H = 500;
      }
      renderer = new THREE.WebGLRenderer();
      renderer.setSize( W, H );
      //document.body.appendChild( renderer.domElement );
      if(!document.querySelector('canvas')){
        document.getElementById('emojiContainer').appendChild( renderer.domElement );
      }

      camera = new THREE.PerspectiveCamera( 50, W/H, 1, 10000 );
      camera.position.z = 500;

      scene = new THREE.Scene();

      // paste your code from the geometryGUI here
      map = THREE.ImageUtils.loadTexture('images/heart-5.jpg');
      geometry = new THREE.SphereGeometry(150, 100, 100);

      material = new THREE.MeshLambertMaterial({shading: THREE.SmoothShading, color: 0xdcdcdc, map: map});
      mesh = new THREE.Mesh(geometry, material);
      map.wrapS = map.wrapT = THREE.RepeatWrapping;
      map.repeat.set( 1, 1 );
      mesh.rotation.y = 11;
      mesh.rotation.z = 6.5;
      scene.add(mesh);

      hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x666666, 1.76);
      scene.add( hemisphereLight );

    }

    function draw() {

      requestAnimationFrame( draw );

      // experiment with code from the snippets menu here
      //formula = ((total distance/2) - pos)/(total distance/2)
      if(!mobile){
        mesh.rotation.x = 6.5 - ((window.innerHeight/2) - mouseY)/(window.innerHeight/2);
        mesh.rotation.y = 11 - ((window.innerWidth/2) - mouseX)/(window.innerWidth/2);
      }
      else{
          mesh.rotation.x = 6.5;
          mesh.rotation.y = 11 - (Date.now() * 0.002);
      }

      renderer.render( scene, camera );

    }

    setup();
    draw();

    //alert(window.innerWidth/2);
    var mouseX = window.innerWidth/2, mouseY = window.innerHeight/2;
    function checkMobile() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      console.log(check);

      return check;
    };

    var mobile = checkMobile();

    document.body.addEventListener('mousemove', function(){
      mouseX = event.clientX;
      mouseY = event.clientY;
    });
  }

  if(document.querySelector('.you__hero-wrapper')){
    youInit();
  }
});
