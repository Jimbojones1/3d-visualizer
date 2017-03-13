var app = app || {};
app.init = init;
app.animate = animate;
var container, points = [];
var camera, scene, renderer;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var start = Date.now();
var cone;
container = document.createElement('div');
container.setAttribute('id', 'container');
document.body.appendChild(container);
camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.set( 0, 0, 50 );
scene = new THREE.Scene();
renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.autoClearColor = true;
container.appendChild(renderer.domElement);
controls = new THREE.OrbitControls( camera, renderer.domElement );

function calcColor(rgbValue, matrix){
      for (var i = 0; i < matrix.length; i++){
        if (i === 0){
          matrix[i] = 1
        }

        // console.log(matrix)
      }
      return ((matrix[rgbValue] * 100)/ 256)/100
    }





var GuiControls = function(){
    this.spacing = 35;
    this.angle = 0.975000;
    this.animationSpeed = 0.00001;
    this.intensity = 1;
    this.zoomSpeed = 0.01;
    this.R = 0;
    this.G = 0;
    this.B = 0;
    this.colorIntensity = 0.5;
    this.rotationSpeed = 0.0001;
    this.sphere = true;
    this.donut = false;
    this.longDonut = false;
    this.perogi = false;
    this.square = false;
    this.infinity = false;
    this.longDonut2 = false;
    this.dotOne = [255, 128, 255];
    this.dotTwo = [0, 128, 255];
    this.dotThree = [0, 230, 255];
    this.color = "#ffae23";
    this.fog = false;
    this.fogColor = [0, 230, 255];
};



var matrix = new GuiControls();

var gui = new dat.GUI();
gui.closed = true;
// gui.add(matrix, 'spacing', 0, 50).step(0.1).name('Particle Spacing');
gui.add(matrix, 'spacing',0, 100).step(1).name('spacing')
gui.add(matrix, 'angle', 0, 25).step(0.1).name('Particle Angle');
gui.add(matrix, 'animationSpeed', 0.0000001, 0.01).step(0.00001).name('Animation Speed');
gui.add(matrix, 'intensity', 0.5, 5).step(0.1).name('Reaction Intensity');
gui.add(matrix, 'colorIntensity', 0.5, 5).step(1).name('Color Intensity');
gui.add(matrix, 'zoomSpeed', 0.001, 0.1).step(0.001).name('Zoom Speed');
gui.add(matrix, 'rotationSpeed', 0, 0.1).step(0.000005).name('Z-index Rotation Speed');
gui.add(matrix, 'fog').name('fog')
gui.addColor(matrix, 'dotOne')
gui.addColor(matrix, 'dotTwo')
gui.addColor(matrix, 'fogColor')
gui.addColor(matrix, 'dotThree')
var stats = new Stats();
stats.showPanel( 0 );
document.body.appendChild( stats.dom );
init();
var geometry;

var worker = new Worker('/scripts/worker.js')

worker.postMessage({
  some_data: 'foo',
  some_more_data: 'bar'
})

worker.onmessage = function(e){
  var data = e.data;
  console.log(data)
}


function init() {

     geometry = new THREE.Geometry();

    for (var i = 0; i < 1024; i++) {

        var vertex = new THREE.Vector3(20 * Math.sin(i/10) * Math.cos(i), 20 * Math.cos(i/10), 20 * Math.sin(i) * Math.sin(i/10));
        // vertex.x = 20 * Math.sin(i/10) * Math.cos(i);
        // vertex.y = 20 * Math.cos(i/10);
        // vertex.z = 20 * Math.sin(i) * Math.sin(i/10);
        // // // vertex.y = i/100 * Math.cos(i/10) - i/100 * Math.sin(i/10);
        geometry.vertices.push(vertex);
        // geometry.colors.push(new THREE.Color(purpleColors[ Math.floor(Math.random() * purpleColors.length) ]));
        geometry.colors.push(new THREE.Color(0xffffff));


        // mesh.position.x = 20 * Math.sin(i/10) * Math.cos(i);
        // mesh.position.y = 20 * Math.cos(i/10);
        // mesh.position.z = 20 * Math.sin(i) * Math.sin(i/10);

        // points.push( mesh );

    }


    var material = new THREE.PointsMaterial( {
            size: 1,
            vertexColors: THREE.VertexColors,
            depthTest: true,
            opacity: 1,
            sizeAttenuation: true
        } );


    var particleSystem = new THREE.Points( geometry, material );

    scene.add( particleSystem );

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
    stats.begin();
    render();
    stats.end();
}

function render() {
    var timeFrequencyData = new Uint8Array(analyser.fftSize);
    var timeFloatData = new Float32Array(analyser.fftSize);
    analyser.getByteTimeDomainData(timeFrequencyData);
    analyser.getFloatTimeDomainData(timeFloatData);

    if(matrix.fog){
      scene.fog = new THREE.Fog(matrix.fogColor, 0.015, 100);
    }




    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}

function onKeyDown(e) {
    switch (e.which) {
        case 32:
            if (app.play) {
                app.audio.pause();
                app.play = false;
            } else {
                app.audio.play();
                app.play = true;
            }
            break;
        case 49:
            //1
            matrix.sphere = true;
            matrix.donut = false;
            matrix.longDonut = false;
            matrix.perogi = false;
            matrix.square = false;
            matrix.infinity = false;
            matrix.longDonut2 = false;
            break;
        case 50:
            //2
            matrix.sphere = false;
            matrix.donut = true;
            matrix.longDonut = false;
            matrix.perogi = false;
            matrix.square = false;
            matrix.infinity = false;
            matrix.longDonut2 = false;
            break;
        case 51:
            //3
            matrix.sphere = false;
            matrix.donut = false;
            matrix.longDonut = true;
            matrix.perogi = false;
            matrix.square = false;
            matrix.infinity = false;
            matrix.longDonut2 = false;
            break;
        case 52:
            //4
            matrix.sphere = false;
            matrix.donut = false;
            matrix.longDonut = false;
            matrix.perogi = true;
            matrix.square = false;
            matrix.infinity = false;
            matrix.longDonut2 = false;
            break;
        case 53:
            //5
            matrix.sphere = false;
            matrix.donut = false;
            matrix.longDonut = false;
            matrix.perogi = false;
            matrix.square = true;
            matrix.infinity = false;
            matrix.longDonut2 = false;
            break;
        case 54:
            //6
            matrix.sphere = false;
            matrix.donut = false;
            matrix.longDonut = false;
            matrix.perogi = false;
            matrix.square = false;
            matrix.infinity = true;
            matrix.longDonut2 = false;
            break;
        case 55:
            //6
            matrix.sphere = false;
            matrix.donut = false;
            matrix.longDonut = false;
            matrix.perogi = false;
            matrix.square = false;
            matrix.infinity = false;
            matrix.longDonut2 = true;
            break;
    }
}


// var neither = [];
// var two = [];
// var three= [];
// for (var j = 0; j < 2048; j++){
//
//     if (j%3 !== 0 && j%2 !==0){
//         neither.push(j)
//     }
//     else if (j%3 === 0){
//         two.push(j);
//     }
//     else if(j%2 === 0){
//         three.push(j)
//     }
//     console.log(neither, 'neither');
//     console.log(two, 'two');
//     console.log(three, 'three');
// }
