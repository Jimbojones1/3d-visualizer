var app = app || {};
app.init = init;
app.animate = animate;
var container;
var camera, scene, renderer;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var start = Date.now();
var geometry, points, material;

container = document.createElement('div');
container.setAttribute('id', 'container');
document.body.appendChild(container);
camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
// camera.up.set( 0, 0, 1 );
camera.position.set( 0, 0, 50 );
scene = new THREE.Scene();
renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.autoClearColor = true;
container.appendChild(renderer.domElement);
controls = new THREE.OrbitControls( camera, renderer.domElement );
container.addEventListener('click', rendererClick, false);

var GuiControls = function(){
    this.spacing = 15;
    this.angle = 0.975000;
    this.animationSpeed = 0.06;
    this.intensity = 0.8;
    this.zoomSpeed = 8;
    this.colorIntensity = 0.25;
    this.rotationSpeed = 1;
    this.sphere = false;
    this.donut = true;
    this.longDonut = false;
    this.perogi = false;
    this.square = false;
    this.quadangle = false;
    this.infinity = false;
    this.hourglass = false;
    this.spade = false;
    this.particleOne = 0x00ff00;
    this.particleTwo = 0x0000ff;
    this.particleThree = 0xff0000;
    this.sizeIntensity = 2.5;
    this.animate = true;
    this.camera = true;
    this.z = 30;

};

var matrix = new GuiControls();

var gui = new dat.GUI();
gui.closed = true;
gui.add(matrix, 'z', 0, 200).step(1).name('z');
gui.add(matrix, 'angle', 0, 25).step(0.1).name('Particle Angle');
gui.add(matrix, 'animationSpeed', 0.01, 10).step(0.01).name('Animation Speed');
gui.add(matrix, 'intensity', 0.5, 5).step(0.1).name('Vibration Intensity');
gui.add(matrix, 'colorIntensity', 0, 5).step(0.01).name('Flash Intensity');
gui.add(matrix, 'sizeIntensity', 0, 15).step(0.5).name('Size Intensity');
gui.add(matrix, 'zoomSpeed', 0, 25).step(0.1).name('Zoom Speed');
gui.add(matrix, 'rotationSpeed', 0, 25).step(0.1).name('Z-index Rotation Speed');
gui.addColor(matrix, 'particleOne').name('Color 1');
gui.addColor(matrix, 'particleTwo').name('Color 2');
gui.addColor(matrix, 'particleThree').name('Color 3');

// var stats = new Stats();
// stats.showPanel( 0 );
// document.body.appendChild( stats.dom );

var uniforms;
function calcFieldOFView(){
  var vFOV = camera.fov * Math.PI / 180;        // convert vertical fov to radians
  var height = 2 * Math.tan( vFOV / 2 ) * 40; // visible height

  var aspect = window.innerWidth / window.innerHeight;
  var width = height * aspect;
  return width / 2
}
var circles = [],
            min    =  0.5,
           max     = 15;



init();
animate()
var circle;
var mesh;
var counter;
function init() {


      //   // if(radius === 0){
      //   //   radius = 2
      //   // }

      // console.log(circle.position.x)
      var axes = new THREE.AxisHelper(200);
      scene.add(axes);





    //   color = new THREE.Color();


    draw()
    counter = 0
    function draw(){
      var c = createCircle();


        while(!isValid(c)){



           var whichAxis;

          if(Math.random() > 0.5 ){
            whichAxis = true;
          }
          else {
            whichAxis = false
          }
          var x, y;
          if(whichAxis){
            x = Math.random() * 26;



                    if(Math.random() > .5){
                       y = (Math.random() * 15);
                    }
                    else{
                       y = -(Math.random() * 15);
                    }



          }
          else {
            x = -(Math.random() * 26);



                    if(Math.random() > .5){
                       y = (Math.random() * 15);
                    }
                    else{
                       y = -(Math.random() * 15);
                    }



          }

              c.position.set(x,y, 0)

             counter++
             if(counter > 200000){
                  return;
              }
        }



       while(isValid(c)){
    // increase it up intil the point it hits another circle
          // c.geometry.verticesNeedUpdate = true
          c.geometry.radius = c.geometry.radius + 0.5
          // c.scale.x++
          // c.scale.y++


        }



        c.geometry.radius -= 0.4
          // scene.add( ci );
          // c.x =  2  * Math.random() * width;
          // c.y = Math.random() * height
          // counter++;
          // if(counter > 50000){
          //   return;
          // }



      circles.push(c)
      drawCircle(c)
      requestAnimationFrame(draw)
    }


    function createCircle(){
      var radius = 1;


      // var circleShape = new THREE.Shape();
      // circleShape.moveTo(0, radius);
      // circleShape.quadraticCurveTo( radius, radius, radius, 0 );
      // circleShape.quadraticCurveTo( radius, -radius, 0, -radius );
      // circleShape.quadraticCurveTo( -radius, -radius, -radius, 0 );
      // circleShape.quadraticCurveTo( -radius, radius, 0, radius );


         var whichAxis;

          if(Math.random() > 0.5 ){
            whichAxis = true;
          }
          else {
            whichAxis = false
          }
          var x, y;
          if(whichAxis){
            x = Math.random() * 26;



                    if(Math.random() > .5){
                       y = (Math.random() * 15);
                    }
                    else{
                       y = -(Math.random() * 15);
                    }



          }
          else {
            x = -(Math.random() * 26);



                    if(Math.random() > .5){
                       y = (Math.random() * 15);
                    }
                    else{
                       y = -(Math.random() * 15);
                    }



          }


      // var texture = new THREE.TextureLoader().load( "./styles/particle.png" );

      var color = new THREE.Color(Math.random(), Math.random(), Math.random())

      uniforms = {
          "amplitude": { value: 1 },
            "color": { value:  color}
            // "texture": { value: texture }

        }

      var sphere = new THREE.SphereGeometry(min, 32)
        // geometry.radius = radius;

      var shaderMaterial = new THREE.ShaderMaterial({
                            uniforms:       uniforms,
                            vertexShader:   document.getElementById('vertexShader').textContent,
                            fragmentShader: document.getElementById('fragmentShader').textContent,
                            transparent: true
                          })



      console.log(sphere,  'this is sphere')

      // sphere.addAttribute( 'userColor', new THREE.BufferAttribute( color, 3 ) );

      var mesh = new THREE.Mesh( sphere, shaderMaterial );
      mesh.geometry.radius = min
      mesh.position.set(x, y, 0)

     return mesh


    }



    function isValid(c){
      if(c.geometry.radius > max){
        return false
      }

      var count = 0


      for(var i = 0; i < circles.length; i++){
        var c2 = circles[i];

        // find the distance of the circle passed in to each circle;
        dx = c2.position.x - c.position.x;
        dy = c2.position.y - c.position.y;

        // var k = Math.sqrt(dx + dy)
        // var dist = k - c.geometry.radius + c2.geometry.radius
        var dista = Math.sqrt(dx * dx + dy * dy)
        // console.log(dista, ' in flase', c.geometry.radius, c2.geometry.radius)
        // if the distance of the radi is less then the sum of the radius
        // then they are touching
        if(dista < c.geometry.radius/3.8+ c2.geometry.radius/3.8 ){
          // console.log(dist, dy, dx )

          return false;
        }
      }

      return true;
    }


    function drawCircle(ci,x,y){
      // console.log(ci.geometry.radius)
      // console.log(ci)
      ci.scale.set(ci.geometry.radius, ci.geometry.radius, ci.geometry.radius)
      scene.add( ci );


    }



      // for ( var i = 0, vert = 0; i < 102; i ++, vert += 3 ) {
      //  c[0].attributes.position.array[ vert + 0 ] = geometry.attributes.position.array[ vert + 0 ] * Math.random() * window.innerHeight/2
      //  c[0].attributes.position.array[ vert + 1 ] = geometry.attributes.position.array[ vert + 2 ] * Math.random() * window.innerWidth/2
      //  c[0].attributes.position.array[ vert + 2 ] = geometry.attributes.position.array[ vert + 3 ] * 0
      // }
      // c[0].attributes.position.dynamic = true
      // c[0].attributes.position.needUpdate = true;




   camera.position.set(0, 0, matrix.z)

    camera.lookAt(scene.position);
    renderer.render(scene, camera);












    document.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('keydown', onKeyDown, false);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onMouseMove(event) {
    mouseX = (event.clientX - windowHalfX ) * 7;
    mouseY = (event.clientY - windowHalfY ) * 7;
}

function animate() {
    app.animationFrame = (window.requestAnimationFrame || window.webkitRequestAnimationFrame)(animate);
    // stats.begin();
    render();
    // stats.end();
}

function render() {
    var timeFloatData = [];
    if(app.audio || app.microphone){
        timeFloatData = new Float32Array(analyser.fftSize);
        analyser.getFloatTimeDomainData(timeFloatData);
    }


      for (var j = 1; j < scene.children.length; j++){
          if(!app.audio && !app.microphone){
              timeFloatData[j] = 0;
          }
          var r, g, b;
          var amplitude = timeFloatData[j] * matrix.colorIntensity;
          scene.children[j].colorsNeedUpdate = true;
          scene.children[j].material.uniforms.amplitude.value = amplitude;
          scene.children[j].material.uniforms.color.value.r = Math.random()
          scene.children[j].material.uniforms.color.value.g = Math.random()
          scene.children[j].material.uniforms.color.value.b = Math.random()
          // var timer = Date.now() - start;
          // points.material.size = 0.4 + (timeFloatData[j] * (matrix.sizeIntensity/10));
          // if (j%3 !== 0 && j%2 !==0){
          //     // circles[j].geometry.set(matrix.particleOne);
          //     r = .3;
          //     g = 0.4;
          //     b = 0.6;
          //     circles[j].geometry.colors.setRGB((r + intensity), (g + intensity), (b + intensity));
          // }
          // // else if (j%2 === 0){

          //     points.geometry.colors[j].set(matrix.particleTwo);
          //     r = geometry.colors[j].r;
          //     g = geometry.colors[j].g;
          //     b = geometry.colors[j].b;
          //     geometry.colors[j].setRGB((r + intensity), (g + intensity), (b + intensity));
          // }
          // else if(j%3 === 0){
          //     points.geometry.colors[j].set(matrix.particleThree);
          //     r = geometry.colors[j].r;
          //     g = geometry.colors[j].g;
          //     b = geometry.colors[j].b;
          //     geometry.colors[j].setRGB((r + intensity), (g + intensity), (b + intensity));
          // }

        }
    //     // donut
    //     if (matrix.donut) {
    //         matrix.spacing = 10 || matrix.spacing;
    //         geometry.vertices[j].x = matrix.spacing * (Math.sin(j / matrix.angle) * Math.cos(j) + Math.cos(j));
    //         geometry.vertices[j].y = matrix.spacing * (Math.cos(j / matrix.angle)) + (timeFloatData[j] * matrix.intensity);
    //         geometry.vertices[j].z = matrix.spacing * (Math.sin(j / matrix.angle) * Math.sin(j) + Math.sin(j));
    //     }
    //     // sphere
    //     else if (matrix.sphere) {
    //         matrix.spacing = 15 || matrix.spacing;
    //         geometry.vertices[j].x = matrix.spacing * (Math.sin(j / matrix.angle) * Math.cos(j));
    //         geometry.vertices[j].y = matrix.spacing * (Math.cos(j / matrix.angle)) + (timeFloatData[j] * matrix.intensity);
    //         geometry.vertices[j].z = matrix.spacing * (Math.sin(j / matrix.angle) * Math.sin(j));

    //     }
    //     // long donut
    //     else if (matrix.longDonut) {
    //         matrix.spacing = 9 || matrix.spacing;
    //         geometry.vertices[j].x = matrix.spacing * (Math.sin(j / matrix.angle) + Math.cos(j));
    //         geometry.vertices[j].y = matrix.spacing * (Math.cos(j / matrix.angle)) + (timeFloatData[j] * matrix.intensity);
    //         geometry.vertices[j].z = matrix.spacing * (Math.sin(j / matrix.angle) + Math.sin(j));
    //     }
    //     // perogi
    //     else if (matrix.perogi) {
    //         matrix.spacing = 15 || matrix.spacing;
    //         geometry.vertices[j].x = matrix.spacing * (Math.cos(j / matrix.angle) * Math.cos(j));
    //         geometry.vertices[j].y = matrix.spacing * (Math.cos(j / matrix.angle)) + (timeFloatData[j] * matrix.intensity);
    //         geometry.vertices[j].z = matrix.spacing * (Math.sin(j / matrix.angle) * Math.sin(j));
    //     }
    //     // square thing
    //     else if (matrix.square) {
    //         matrix.spacing = 10 || matrix.spacing;
    //         geometry.vertices[j].x = matrix.spacing * (Math.sin(j / matrix.angle) * Math.cos(j) + Math.sin(j));
    //         geometry.vertices[j].y = matrix.spacing * (Math.cos(j / matrix.angle)) + (timeFloatData[j] * matrix.intensity);
    //         geometry.vertices[j].z = matrix.spacing * (Math.sin(j / matrix.angle) * Math.sin(j) + Math.cos(j));
    //     }
    //     // quadangle
    //     else if (matrix.quadangle) {
    //         matrix.spacing = 10 || matrix.spacing;
    //         geometry.vertices[j].x = matrix.spacing * (Math.sin(j / matrix.angle) * Math.cos(j) + Math.sin(j));
    //         geometry.vertices[j].y = matrix.spacing * (Math.sin(j / matrix.angle)) + (timeFloatData[j] * matrix.intensity);
    //         geometry.vertices[j].z = matrix.spacing * (Math.sin(j / matrix.angle) * Math.sin(j) + Math.cos(j));
    //     }
    //     // tighter infinity
    //     else if (matrix.infinity) {
    //         matrix.spacing = 10 || matrix.spacing;
    //         geometry.vertices[j].x = matrix.spacing * (Math.sin(j / matrix.angle) * Math.cos(j) + Math.cos(2 * j / matrix.angle));
    //         geometry.vertices[j].y = matrix.spacing * (Math.cos(j / matrix.angle)) + (timeFloatData[j] * matrix.intensity);
    //         geometry.vertices[j].z = matrix.spacing * (Math.sin(j / matrix.angle) * Math.sin(j) + Math.sin(2 * j / matrix.angle));
    //     }
    //     // hourglass
    //     else if (matrix.hourglass) {
    //         matrix.spacing = 15 || matrix.spacing;
    //         geometry.vertices[j].x = matrix.spacing * (Math.sin(j / matrix.angle) * Math.cos(j));
    //         geometry.vertices[j].y = matrix.spacing * (Math.sin(j / matrix.angle)) + (timeFloatData[j] * matrix.intensity);
    //         geometry.vertices[j].z = matrix.spacing * (Math.sin(j / matrix.angle) * Math.sin(j));
    //     }
    //     // spade
    //     else if (matrix.spade) {
    //         matrix.spacing = 10 || matrix.spacing;
    //         geometry.vertices[j].x = matrix.spacing * (Math.sin(j / matrix.angle) * (2 * Math.cos(j))) * Math.sin(j);
    //         geometry.vertices[j].y = matrix.spacing * (Math.cos(j / matrix.angle)) + (timeFloatData[j] * matrix.intensity) + (10 * Math.cos(j));
    //         geometry.vertices[j].z = matrix.spacing * (Math.sin(j / matrix.angle)) * (2 * Math.sin(j)) * Math.sin(j);
    //     }

    //     // heart
    //     // geometry.vertices[j].x = matrix.spacing * Math.pow(Math.sin(j), 3);
    //     // geometry.vertices[j].y = matrix.spacing/5 * Math.sin(j/matrix.angle * 10) * Math.cos(j/matrix.angle * 10) + (timeFloatData[j] * matrix.intensity);
    //     // geometry.vertices[j].z = matrix.spacing * Math.cos(j) - (5 * Math.cos(2*j)) - (2 * Math.cos(3*j)) - (Math.cos(4*j))

    //     // star thang
    //     // geometry.vertices[j].y = matrix.spacing * (Math.cos(j/matrix.angle) * Math.cos(j) / Math.sin(j));
    //     // geometry.vertices[j].z = matrix.spacing * (Math.cos(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity);
    //     // geometry.vertices[j].x = matrix.spacing * (Math.sin(j) * Math.sin(j/matrix.angle) / Math.cos(j));

    // }

    matrix.angle += matrix.animationSpeed;

    // var x = camera.position.x;
    // var z = camera.position.z;
    // camera.position.x = x * Math.cos(matrix.zoomSpeed) - z * Math.sin(matrix.zoomSpeed);
    // camera.position.z = z * Math.cos(matrix.zoomSpeed) + x * Math.sin(matrix.zoomSpeed);

    // // var z = camera.position.z;
    // var y = camera.position.y;
    // camera.position.y = y * Math.cos(matrix.zoomSpeed) + z * Math.sin(matrix.zoomSpeed);
    // camera.position.z = z
    // var rotationMatrix = new THREE.Matrix4().m

   camera.position.set(0, 0, matrix.z)

    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}

function rendererClick(){
    var inputs = ($('input'));
    for (var f = 0; f < inputs.length; f++){
        inputs[f].blur();
    }
}

function onKeyDown(e) {
    if ( $('input:focus').length === 0 ) {
        switch (e.which) {
            case 32:
                // audio play
                if (app.play && app.audio) {
                    app.audio.pause();
                    app.play = false;
                }
                else {
                    app.audio.play();
                    app.play = true;
                }
                break;
            case 65:
                // particle animation
                matrix.animate = !matrix.animate;
                break;
            case 67:
                // camera movement
                matrix.camera = !matrix.camera;
                break;
            case 49:
                //1
                matrix.donut = true;
                matrix.sphere = false;
                matrix.longDonut = false;
                matrix.perogi = false;
                matrix.square = false;
                matrix.quadangle = false;
                matrix.infinity = false;
                matrix.hourglass = false;
                matrix.spade = false;
                break;
            case 50:
                //2
                matrix.donut = false;
                matrix.sphere = true;
                matrix.longDonut = false;
                matrix.perogi = false;
                matrix.square = false;
                matrix.quadangle = false;
                matrix.infinity = false;
                matrix.hourglass = false;
                matrix.spade = false;
                break;
            case 51:
                //3
                matrix.donut = false;
                matrix.sphere = false;
                matrix.longDonut = true;
                matrix.perogi = false;
                matrix.square = false;
                matrix.quadangle = false;
                matrix.infinity = false;
                matrix.hourglass = false;
                matrix.spade = false;
                break;
            case 52:
                //4
                matrix.donut = false;
                matrix.sphere = false;
                matrix.longDonut = false;
                matrix.perogi = true;
                matrix.square = false;
                matrix.quadangle = false;
                matrix.infinity = false;
                matrix.hourglass = false;
                matrix.spade = false;
                break;
            case 53:
                //5
                matrix.donut = false;
                matrix.sphere = false;
                matrix.longDonut = false;
                matrix.perogi = false;
                matrix.square = true;
                matrix.quadangle = false;
                matrix.infinity = false;
                matrix.hourglass = false;
                matrix.spade = false;
                break;
            case 54:
                //6
                matrix.donut = false;
                matrix.sphere = false;
                matrix.longDonut = false;
                matrix.perogi = false;
                matrix.square = false;
                matrix.quadangle = true;
                matrix.infinity = false;
                matrix.hourglass = false;
                matrix.spade = false;
                break;
            case 55:
                //7
                matrix.donut = false;
                matrix.sphere = false;
                matrix.longDonut = false;
                matrix.perogi = false;
                matrix.square = false;
                matrix.quadangle = false;
                matrix.infinity = true;
                matrix.hourglass = false;
                matrix.spade = false;
                break;
            case 56:
                //8
                matrix.donut = false;
                matrix.sphere = false;
                matrix.longDonut = false;
                matrix.perogi = false;
                matrix.square = false;
                matrix.quadangle = false;
                matrix.infinity = false;
                matrix.hourglass = true;
                matrix.spade = false;
                break;
            case 57:
                //9
                matrix.donut = false;
                matrix.sphere = false;
                matrix.longDonut = false;
                matrix.perogi = false;
                matrix.square = false;
                matrix.quadangle = false;
                matrix.infinity = false;
                matrix.hourglass = false;
                matrix.spade = true;
                break;
        }
    }
}


