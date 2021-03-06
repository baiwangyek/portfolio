window.addEventListener('load', function(){

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


  //console.log(document.querySelector('.body-max-width').children[1].children);

  var bodySectionChildenNum, bodySectionChilden, bodySectionChildenArr = [];

  function updateBodySectionChildren() {
    bodySectionChildenNum = document.querySelector('.body-max-width').children[1].children.length;
    bodySectionChilden = document.querySelector('.body-max-width').children[1].children;
    bodySectionChildenArr = [];


    var bodySectionChildrenTranslate, offsetTopHeadStart;
    if(window.innerWidth <=500){bodySectionChildrenTranslate = 20;}
    else{bodySectionChildrenTranslate = 50;}

    if(window.innerHeight > 900 ){offsetTopHeadStart = window.innerHeight;}
    else{offsetTopHeadStart = window.innerHeight/1.5;}

    //hide all children
    for(var i=0; i<bodySectionChildenNum; i++){
      bodySectionChilden[i].style.opacity = '0';
      bodySectionChilden[i].style.transition = '0.8s';
      bodySectionChilden[i].style.transform = 'translate3d(0, '+bodySectionChildrenTranslate+'px, 0)';
      var offsetTop = bodySectionChilden[i].offsetTop + bodySectionChilden[i].parentNode.offsetTop - offsetTopHeadStart;
      bodySectionChildenArr.push(offsetTop);
    }

    //show
    for(var j=0; j<bodySectionChildenNum; j++){
      if(window.scrollY >= bodySectionChildenArr[j] + offsetTopHeadStart - window.innerHeight){
        bodySectionChilden[j].style.opacity = '1';
        bodySectionChilden[j].style.transform = 'translate3d(0, 0, 0)';
      }
    }
  }

  updateBodySectionChildren();
  /**************************
  HISTORY API FUNCTIONS
  **************************/
  function loadContent(href){
    var http = new XMLHttpRequest();
    var delay = 400;

    //start timer
    var timeStart = Date.now(), timeEnd = 0;

    http.onreadystatechange = function(){
      if(http.readyState === XMLHttpRequest.DONE){
        if(http.status === 200){

          //end timer
          timeEnd = Date.now();

          //calculation of delay
          var timer = timeEnd - timeStart;
          if(timer >= 400){delay = 0;}
          else {delay = 400 - timer;}

          //set timeout to allow 400ms delay for next page animation to run, if page takes more than 400ms to load, skip the 400ms delay
          window.setTimeout(function(){
            //shrink page animation, if you.html, skip this block
            if(!href.match('you.html')){
              if(document.querySelector('.you__body-container')){
                document.querySelector('.you__body-container').style.background = '#fff';
              }
              iamNav.classList.add('iam-nav-top-reset');
              window.setTimeout(function(){
                if(window.innerWidth <= 500){
                  iamNav.classList.add('iam-nav--shrink-mobile');
                }
                else{
                  iamNav.classList.add('iam-nav--shrink');
                }
              }, 100);
            }

            //allow delay for shrink animation
            window.setTimeout(function(){
              //getting the str version of the html page and converting it into a dom node
              var dom = http.responseText;
              var tempDom = document.createElement('div');
              tempDom.innerHTML = dom;

              //once it's a dom node, I can use .querySelector to get the content of the main tag
              var main = tempDom.querySelector('#main').children[0];

              //converting the dom node of the content into str version
              var tempMain = document.createElement('div');
              tempMain.appendChild(main);

              //inserting the str version of the main element
              document.querySelector('#main').innerHTML = tempMain.innerHTML;

              //to activate webGL emoji
              if(document.querySelector('.you__hero-wrapper')){
                youInit();
              }

              //recalculate scroll to reveal points
              updateBodySectionChildren();

            }, 400);
          }, delay);

        }
      }
    }

    http.open('GET', href);
    http.send();
  }

  //addEventListener popstate - for back and forwards
  window.addEventListener('popstate', function(){
     loadContent(location.pathname);
  });


  /************************
  SCROLL FUNCIONS
  ***********************/
  var lengthOfPage = document.body.clientHeight;
  var heightOfBrowser = window.innerHeight;

  window.addEventListener('scroll', function(){
    lengthOfPage = document.body.clientHeight;

    //if end of page, activate the page
    if(window.scrollY >= lengthOfPage - heightOfBrowser - 50){

      if(window.innerWidth <=750 && document.querySelector('.you__hero')){
        document.body.classList.add('end-of-page-left');
      }
      else if(window.innerWidth <=750){
        document.body.classList.add('end-of-page-right');
      }
      else {
        document.body.classList.add('end-of-page');
      }

    }
    else {
      document.body.classList.remove('end-of-page');
      document.body.classList.remove('end-of-page-right');
      document.body.classList.remove('end-of-page-left');
    }

    for(var j=0; j<bodySectionChildenNum; j++){
      if(window.scrollY >= bodySectionChildenArr[j]){
        bodySectionChilden[j].style.opacity = '1';
        bodySectionChilden[j].style.transform = 'translate3d(0, 0, 0)';
      }
    }
  });


  /*************************
  CLICK FUNCTIONS
  **************************/
  var iamNav; //for nav animation and next page animation

  document.body.addEventListener('click', function(){

    if(event.target.className.match('right') || event.target.parentNode.className.match('right') || event.target.parentNode.parentNode.className.match('right')){

      var href;

      //prevent link
      event.preventDefault();

      //start transition
      if(event.target.parentNode.parentNode.className.match('right')){iamNav = event.target.parentNode.parentNode;}
      else if(event.target.parentNode.className.match('right')){iamNav = event.target.parentNode;}
      else{iamNav  = event.target;}

      iamNav.classList.add('iam-nav--active-right');
      iamNav.children[0].style.display = 'none';
      iamNav.children[1].style.display = 'none';

      //window.scrollTo(0,0);

      href = iamNav.href;

      //change url
      history.pushState(null, null, href);

      window.setTimeout(function(){
        window.scrollTo(0,0);
      }, 400);

      //ajax-replace
      loadContent(href);
    }

    else if(event.target.className.match('left') || event.target.parentNode.className.match('left') || event.target.parentNode.parentNode.className.match('left')){

      var href;

      //prevent link
      event.preventDefault();

      //start transition
      //var iamNav;
      if(event.target.parentNode.parentNode.className.match('left')){iamNav = event.target.parentNode.parentNode;}
      else if(event.target.parentNode.className.match('left')){iamNav = event.target.parentNode;}
      else{iamNav  = event.target;}

      iamNav.classList.add('iam-nav--active-left');
      iamNav.children[0].style.display = 'none';
      iamNav.children[1].style.display = 'none';


      href = iamNav.href;

      //change url
      history.pushState(null, null, href);

      window.setTimeout(function(){
        window.scrollTo(0,0);
      }, 400);

      //ajax-replace
      loadContent(href);

    }
  });
});
