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

};

var matrix = new GuiControls();

var gui = new dat.GUI();
gui.closed = true;
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

function calcFieldOFView(){
  var vFOV = camera.fov * Math.PI / 180;        // convert vertical fov to radians
  var height = 2 * Math.tan( vFOV / 2 ) * 40; // visible height

  var aspect = window.innerWidth / window.innerHeight;
  var width = height * aspect;
  return width / 2
}



init();
var circle;
function init() {

       var circles = [],
            min    =  5,
           max     = 70;



      var geometry = new THREE.CircleGeometry( 2, 32 );
      var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
      var circle   = new THREE.Mesh( geometry, material );

      var inc = 0
      for (var i = 0; i < 2000; i++){

        var radius = Math.floor(Math.random() * 4)

        if(radius === 0){
          radius = 2
        }
        var geometry = new THREE.CircleGeometry( radius, 32 );

        var shaderMaterial = new THREE.ShaderMaterial({
          vertexShader:   document.getElementById('vertexShader').textContent,
          fragmentShader: document.getElementById('fragmentShader').textContent,
        })

        var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
        var ci   = new THREE.Mesh( geometry, shaderMaterial );
        var position = ci.position.x
        if(inc === 0){
          inc = 4
        }

        var whichAxis;

        if(Math.random() > 0.5 ){
          whichAxis = true;
        }
        else {
          whichAxis = false
        }
        var x, y;
        if(whichAxis){
          x = Math.random() * calcFieldOFView();



                  if(Math.random() > .5){
                     y = (Math.random() * calcFieldOFView());
                  }
                  else{
                     y = -(Math.random() * calcFieldOFView());
                  }



        }
        else {
          x = -(Math.random() * calcFieldOFView());



                  if(Math.random() > .5){
                     y = (Math.random() * calcFieldOFView());
                  }
                  else{
                     y = -(Math.random() * calcFieldOFView());
                  }



        }

        ci.position.set(x, y, 0 );
        scene.add( ci );

      }

      // console.log(circle.position.x)
      var axes = new THREE.AxisHelper(200);
      scene.add(axes);


      color = new THREE.Color();


    // draw()
    var counter = 0
    function draw(){
      var c = createCircle();


      counter++
     if(counter > 40){
          return;
      }
      circles.push(c)
      drawCircle(c)
      requestAnimationFrame(draw)
    }


    function createCircle(){
          return [new THREE.CircleBufferGeometry( 5, 32 ),
                  new THREE.MeshBasicMaterial( { color: 0xffff00 }) ]
      }

    function drawCircle(c){
      console.log('drw')
      console.log(c[0])
      var positions = new Float32Array( 102);

      var circ = new THREE.Mesh( c[0], c[1]);

      for ( var i = 0, vert = 0; i < 102; i ++, vert += 3 ) {
       c[0].attributes.position.array[ vert + 0 ] = geometry.attributes.position.array[ vert + 0 ] * Math.random() * window.innerHeight/2
       c[0].attributes.position.array[ vert + 1 ] = geometry.attributes.position.array[ vert + 2 ] * Math.random() * window.innerWidth/2
       c[0].attributes.position.array[ vert + 2 ] = geometry.attributes.position.array[ vert + 3 ] * 0
      }
      c[0].attributes.position.dynamic = true
      c[0].attributes.position.needUpdate = true;
       scene.add(circ)
    }















     //      numOfParticles = 20024;
     // // geometry = new THREE.Geometry();
     //  geometry = new THREE.BufferGeometry();
     //  geometry.dynamic = true;


     //  var texture = new THREE.TextureLoader().load( "./images/spark1.png" );


     //  uniforms = {
     //    "amplitude": { value: 1 },
     //      "color": { value: new THREE.Color( 0xff2200 ) },
     //      "texture": { value: texture },
     //      "hippie": { value: false}
     //  }

     //  var shaderMaterial = new THREE.ShaderMaterial({
     //    uniforms: uniforms,
     //    vertexShader:   document.getElementById('vertexShader').textContent,
     //    fragmentShader: document.getElementById('fragmentShader').textContent,
     //    depthTest: false,
     //    blending: THREE.AdditiveBlending,
     //    transparent: true
     //  })

     //    var material = new THREE.PointsMaterial( {
     //      vertexColors: THREE.VertexColors,
     //      depthTest: false,
     //      opacity: 1,
     //      sizeAttenuation: true
     //  } );

     //    // var dirLight = new THREE.DirectionalLight(0xffffff, 1);
     //    // dirLight.position.set(100, 100, 50);
     //    // scene.add(dirLight);

     //  var radius = 200;

     //  var ratio = numOfParticles/(Math.PI*2)

     //  for ( var i = 0, vert = 0; i < numOfParticles; i ++, vert += 3 ) {
     //    positions[ vert + 0 ] = 20 * Math.sin(i/10) * Math.cos(i);
     //    positions[ vert + 1 ] = 20 * Math.cos(i/10);
     //    positions[ vert + 2 ] = 20 * Math.sin(i) * Math.sin(i/10);
     //    color.setRGB(1, 0.5, 1);
     //    colors[ vert + 0 ] = color.r;
     //    colors[ vert + 1 ] = color.g;
     //    colors[ vert + 2 ] = color.b;
     //    sizes[ i ] = 1;
     //  }


     //  geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
     //  geometry.addAttribute( 'userColor', new THREE.BufferAttribute( colors, 3 ) );
     //  geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );

     //  geometry.attributes.size.dynamic = true
     //  // geometry.addAttribute()
     //  // geometry.attributes.customColor.needsUpdate = true;
     //  particleSystem = new THREE.Points( geometry, shaderMaterial );
     //  scene.add( particleSystem );











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


    // for (var j = 0; j < geometry.colors.length; j++){
    //     if(!app.audio && !app.microphone){
    //         timeFloatData[j] = 0;
    //     }
    //     var r, g, b;
    //     var intensity = timeFloatData[j] * matrix.colorIntensity;
    //     // var timer = Date.now() - start;
    //     points.material.size = 0.4 + (timeFloatData[j] * (matrix.sizeIntensity/10));
    //     if (j%3 !== 0 && j%2 !==0){
    //         points.geometry.colors[j].set(matrix.particleOne);
    //         r = geometry.colors[j].r;
    //         g = geometry.colors[j].g;
    //         b = geometry.colors[j].b;
    //         geometry.colors[j].setRGB((r + intensity), (g + intensity), (b + intensity));
    //     }
    //     else if (j%2 === 0){

    //         points.geometry.colors[j].set(matrix.particleTwo);
    //         r = geometry.colors[j].r;
    //         g = geometry.colors[j].g;
    //         b = geometry.colors[j].b;
    //         geometry.colors[j].setRGB((r + intensity), (g + intensity), (b + intensity));
    //     }
    //     else if(j%3 === 0){
    //         points.geometry.colors[j].set(matrix.particleThree);
    //         r = geometry.colors[j].r;
    //         g = geometry.colors[j].g;
    //         b = geometry.colors[j].b;
    //         geometry.colors[j].setRGB((r + intensity), (g + intensity), (b + intensity));
    //     }


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

   camera.position.set(0, 0, 40)

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


