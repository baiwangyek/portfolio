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


  if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

  var camera, scene, renderer;
  var geometry, material, mesh;

  function setup() {
    console.log('in');

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

    // if(window.innerWidth <= 650){
    //   geometry = new THREE.SphereGeometry(150, 100, 100);
    // }
    // else{
    //   geometry = new THREE.SphereGeometry(150, 100, 100);
    // }


    material = new THREE.MeshLambertMaterial({shading: THREE.SmoothShading, color: 0xdcdcdc, map: map});
    mesh = new THREE.Mesh(geometry, material);
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set( 1, 1 );
    //11 is the center
    //10 is facing left
    //12 is facing right
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
      //window.setTimeout(function(){
        mesh.rotation.x = 6.5;
        mesh.rotation.y = 11 - (Date.now() * 0.002);
      //}, 1000);

			//mesh.rotation.z = Date.now() * 0.001;
    }

    // if(touchMove === true){
    //
    //   //mesh.rotation.x = mesh.rotation.x - (diffY * 0.002);
    //   //mesh.rotation.y = mesh.rotation.y - (diffX * 0.002);
    //
    //   mesh.rotation.x = finalMeshX - ((window.innerHeight/2) - (diffY))/(window.innerHeight/2);
    //   mesh.rotation.y = finalMeshY - ((window.innerWidth/2) - diffX)/(window.innerWidth/2);
    //   //touchDown = false;
    //   //alert('in');
    // }

    renderer.render( scene, camera );

  }

  setup();
  draw();

  //alert(window.innerWidth/2);
  var mouseX = window.innerWidth/2, mouseY = window.innerHeight/2;
  var mobile = true;
  document.body.addEventListener('mousemove', function(){
    mouseX = event.clientX;
    mouseY = event.clientY;
  });


  // var touchDown = false;
  // var touchMove = false;
  // var position = 0;
  // var initPos = 0;
  // var touchMovePos = 0;
  // var finalMeshY = 11;
  // var diffX = 0, diffY = 0;
  //
  // document.querySelector('canvas').addEventListener('touchstart', function(){
  //   document.body.classList.add('lock-screen');
  //   //event.preventDefaut();
  //   touchDown = true;
  //   //initPos = event.touches[0].clientX;
  //   //diffX = event.touches[0].clientX;
  //
  //   //alert(initPos);
  // });
  //
  // document.querySelector('canvas').addEventListener('touchend', function(){
  //   document.body.classList.remove('lock-screen');
  //   //event.preventDefaut();
  //   //finalPos = event.touches[0].clientX;
  //   //alert('in');
  //   if(touchMove){
  //     touchDown = false;
  //     touchMove = false;
  //     finalMeshY = mesh.rotation.y;
  //     finalMeshX = mesh.rotation.x;
  //     diffX = 0;
  //   }
  //   //alert(touchDown);
  // });
  //
  // document.querySelector('canvas').addEventListener('touchmove', function(){
  //   //event.preventDefaut();
  //   //touchDown = true;
  //   // touchMovePos = event.touches[0].clientX;
  //   diffX = event.touches[0].clientX;
  //   diffY = event.touches[0].clientY;
  //   touchMove = true;
  //   // diffY = event.touches[0].clientY;
  //
  //   //alert('in');
  //   //alert(touchMovePos);
  // });



});
