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
    var H = 500;
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( W, H );
    //document.body.appendChild( renderer.domElement );
    document.getElementById('emojiContainer').appendChild( renderer.domElement );

    camera = new THREE.PerspectiveCamera( 50, W/H, 1, 10000 );
    camera.position.z = 500;

    scene = new THREE.Scene();


    // paste your code from the geometryGUI here
    map = THREE.ImageUtils.loadTexture('images/heart-5.jpg');
    geometry = new THREE.SphereGeometry(100, 100, 100);
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
    //mesh.rotation.x = Date.now() * 0.0005;
    mesh.rotation.x = mouseY * 0.002;
		mesh.rotation.y = mouseX * 0.002;
		//mesh.rotation.z = Date.now() * 0.001;

    renderer.render( scene, camera );

  }

  setup();
  draw();

  var mouseX = 0, mouseY = 0;

  document.body.addEventListener('mousemove', function(){
    //console.log(event.clientX-368);
    mouseX = event.clientX-window.innerWidth;
    mouseY = event.clientY-(window.innerHeight/2);
  });

});
