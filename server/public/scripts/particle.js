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
var particleSystem;


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
    this.particleOne = 0x00ff00;
    this.particleTwo = 0x00ff00;
    this.particleThree = 0x00ff00;
    this.color = "#ffae23";
    this.fog = false;
    this.fogColor = [0, 230, 255];
    this.radius = 5
    this.size = 0.1
};




var matrix = new GuiControls();

var gui = new dat.GUI();
gui.closed = true;
// gui.add(matrix, 'spacing', 0, 50).step(0.1).name('Particle Spacing');
gui.add(matrix, 'spacing',0, 500).step(1).name('spacing')
gui.add(matrix, 'angle', 0, 25).step(0.1).name('Particle Angle');
gui.add(matrix, 'animationSpeed', 0.0000001, 0.01).step(0.00001).name('Animation Speed');
gui.add(matrix, 'intensity', 0.5, 5).step(0.1).name('Reaction Intensity');
gui.add(matrix, 'colorIntensity', 0.5, 5).step(1).name('Color Intensity');
gui.add(matrix, 'zoomSpeed', 0.001, 0.1).step(0.001).name('Zoom Speed');
gui.add(matrix, 'rotationSpeed', 0, 0.1).step(0.000005).name('Z-index Rotation Speed');
gui.add(matrix, 'fog').name('fog')
gui.addColor(matrix, 'particleOne').name('Color 1');
gui.addColor(matrix, 'particleTwo').name('Color 2');
gui.addColor(matrix, 'particleThree').name('Color 3');
gui.addColor(matrix, 'fogColor')
gui.add(matrix, 'radius',0, 100).step(1).name('radius')
gui.add(matrix, 'size',0, 2).step(0.1).name('size')

var stats = new Stats();
stats.showPanel( 0 );
document.body.appendChild( stats.dom );
init();
var geometry;


// adding workers for optimization
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
  // making these globals just for debugging purposes
    var numOfParticles = 200000;
     // geometry = new THREE.Geometry();
      geometry = new THREE.BufferGeometry();
      geometry.dynamic = true;
      var positions = new Float32Array( numOfParticles * 3 );
      var colors = new Float32Array( numOfParticles * 3 );
      var sizes = new Float32Array( numOfParticles );
      var color = new THREE.Color();

    // for (var i = 0; i < 100000; i++) {

    //     // var vertex = new THREE.Vector3(20 * Math.sin(i/10) * Math.cos(i), 20 * Math.cos(i/10), 20 * Math.sin(i) * Math.sin(i/10));
    //     // // vertex.x = 20 * Math.sin(i/10) * Math.cos(i);
    //     // // vertex.y = 20 * Math.cos(i/10);
    //     // // vertex.z = 20 * Math.sin(i) * Math.sin(i/10);
    //     // // // // vertex.y = i/100 * Math.cos(i/10) - i/100 * Math.sin(i/10);
    //     // geometry.vertices.push(vertex);
    //     // // geometry.colors.push(new THREE.Color(purpleColors[ Math.floor(Math.random() * purpleColors.length) ]));
    //     // geometry.colors.push(new THREE.Color(0xffffff));


    // }

        var material = new THREE.PointsMaterial( {
          size: matrix.size,
          vertexColors: THREE.VertexColors,
          depthTest: true,
          opacity: 1,
          sizeAttenuation: true,
          blending: THREE.AdditiveBlending
      } );


      var radius = 200;


      for ( var i = 0, vert = 0; i < numOfParticles; i ++, vert += 3 ) {
        positions[ vert + 0 ] = 20 * Math.sin(i/10) * Math.cos(i);
        positions[ vert + 1 ] = 20 * Math.cos(i/10);
        positions[ vert + 2 ] = 20 * Math.sin(i) * Math.sin(i/10);
        color.setRGB(1, 1, 0.5);
        colors[ vert + 0 ] = color.r;
        colors[ vert + 1 ] = color.g;
        colors[ vert + 2 ] = color.b;
        sizes[ i ] = .30;
      }


      geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
      geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
      geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );

      geometry.attributes.size.dynamic = true
      // geometry.addAttribute()
      // geometry.attributes.customColor.needsUpdate = true;
      particleSystem = new THREE.Points( geometry, material );
      scene.add( particleSystem );


















    // particleSystem = new THREE.Points( geometry, material );

    // scene.add( particleSystem );

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


    // calcColor function returns value 0 and 1
function calcColor(rgbValue, matrix){
      for (var i = 0; i < matrix.length; i++){
        if (i === 0){
          matrix[i] = 1
        }

        // console.log(matrix)
      }
      return ((matrix[rgbValue] * 100)/ 256)/100
    }



function render() {
    // var timeFrequencyData = new Uint8Array(analyser.fftSize);
    var timeFloatData = new Float32Array(analyser.fftSize);
    // analyser.getByteTimeDomainData(timeFrequencyData);
    analyser.getFloatTimeDomainData(timeFloatData);

    if(matrix.fog){
      scene.fog = new THREE.Fog(matrix.fogColor, 0.015, 100);
    }

    var r, g, b;
    // geometry.attributes.position.dynamic = true
    geometry.attributes.position.needsUpdate = true
    geometry.attributes.color.needsUpdate = true

    // geometry.colorsNeedUpdate = true;
    // geometry.verticesNeedUpdate = true;
    geometry.attributes.size.needsUpdate = true;
    geometry.attributes.size.dynamic = true
    particleSystem.material.size.needsUpdate = true;


    var radius = 5
      for ( var i = 0, vert = 0; i < geometry.attributes.position.array.length; i ++, vert += 3 ) {



         if(matrix.sphere){
         matrix.spacing = matrix.spacing;
         geometry.attributes.position.array[ vert + 0 ] = matrix.spacing * (Math.sin(i/matrix.angle)) * Math.cos(i);
         geometry.attributes.position.array[ vert + 1 ] = matrix.spacing * (Math.cos(i/matrix.angle));
         geometry.attributes.position.array[ vert + 2 ] = matrix.spacing * (Math.sin(i/matrix.angle)) * Math.sin(i);

        }
        //donut
        else if(matrix.donut){
            matrix.spacing = matrix.spacing;
            geometry.attributes.position.array[ vert + 0 ] = matrix.spacing * (Math.sin(i/matrix.angle) * Math.cos(i) + Math.cos(i));
            geometry.attributes.position.array[ vert + 1 ] = matrix.spacing * (Math.cos(i/matrix.angle));
            geometry.attributes.position.array[ vert + 2 ] = matrix.spacing * (Math.sin(i/matrix.angle) * Math.sin(i) + Math.sin(i));
        }

         geometry.attributes.size.array[i] = matrix.size;

         particleSystem.material.size = matrix.size


          // matrix.spacing =  matrix.spacing;



         if(i%3 !== 0 && i%2 !==0){
            particleSystem.material.color.set(matrix.particleOne);
            geometry.attributes.color.array[ vert + 0 ] = 0.2;
            geometry.attributes.color.array[ vert + 1 ] = 0.3;
            geometry.attributes.color.array[ vert + 2 ] = 0.9;

         }
          else if (i%2 === 0){
            particleSystem.material.color.set(matrix.particleTwo);
            geometry.attributes.color.array[ vert + 0 ] = 0.9;
            geometry.attributes.color.array[ vert + 1 ] = 0.8;
            geometry.attributes.color.array[ vert + 2 ] = 0.4;
            // particleSystem.geometry.colors[j].set(matrix.particleTwo);
            // r = geometry.colors[j].r;
            // g = geometry.colors[j].g;
            // b = geometry.colors[j].b;
            // geometry.colors[j].setRGB((r + intensity), (g + intensity), (b + intensity));
            // geometry.colors[j].b = 1;
        }
        else if(i%3 === 0){
            particleSystem.material.color.set(matrix.particleThree);
            geometry.attributes.color.array[ vert + 0 ] = 0.9;
            geometry.attributes.color.array[ vert + 1 ] = 0.8;
            geometry.attributes.color.array[ vert + 2 ] = 0.9;
            // particleSystem.geometry.colors[j].set(matrix.particleThree);
            // r = geometry.colors[j].r;
            // g = geometry.colors[j].g;
            // b = geometry.colors[j].b;
            // geometry.colors[j].setRGB((r + intensity), (g + intensity), (b + intensity));

        }
        else{

        }

    }


    matrix.angle += matrix.animationSpeed;

    var x = camera.position.x;
    var z = camera.position.z;
    camera.position.x = x * Math.cos(matrix.zoomSpeed) - z * Math.sin(matrix.zoomSpeed);
    camera.position.z = z * Math.cos(matrix.zoomSpeed) + x * Math.sin(matrix.zoomSpeed);

    // var z = camera.position.z;
    var y = camera.position.y;
    camera.position.y = y * Math.cos(matrix.zoomSpeed) + z * Math.sin(matrix.zoomSpeed);
    camera.position.z = z * Math.cos(matrix.zoomSpeed) - y * Math.sin(matrix.zoomSpeed);

    var rotationMatrix = new THREE.Matrix4().m



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
//







    // for (var j = 0; j < 10000; j++){

    //    // particleSystem.material.size = 0.4 + (timeFloatData[j]/2.5);
    //   var intensity = timeFloatData[j] * matrix.colorIntensity;
        // if (j%3 !== 0 && j%2 !==0){
        //     // point.material.color.set(matrix.particleOne);
        //     // this stream mixes with the next stream
        //     // geometry.colors[j].r = calcColor(0, matrix.dotOne) + (timeFloatData[j] * matrix.colorIntensity);
        //     // geometry.colors[j].g = calcColor(1, matrix.dotOne) + (timeFloatData[j] * matrix.colorIntensity);
        //     // geometry.colors[j].b = calcColor(2, matrix.dotOne) + (timeFloatData[j] * matrix.colorIntensity);
        //      particleSystem.geometry.colors[j].set(matrix.particleOne);
        //     r = geometry.colors[j].r;
        //     g = geometry.colors[j].g;
        //     b = geometry.colors[j].b;
        //     geometry.colors[j].setRGB((r + intensity), (g + intensity), (b + intensity));

        // }



    //     // for brownian motion

    //       dX = Math.random() * .1 - .05;
    //       dY = Math.random() * .1 - .05;
    //       dZ = Math.random() * .1 - .05;

    // OG


        // // long donut -- 14.3
        // else if(matrix.longDonut){
        //     matrix.spacing = 9 || matrix.spacing;
        //     geometry.attributes.position.array[ vert + 0 ] = matrix.spacing * (Math.sin(j/matrix.angle) + Math.cos(j));
        //     geometry.attributes.position.array[ vert + 1 ] = matrix.spacing * (Math.cos(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity);
        //     geometry.attributes.position.array[ vert + 2 ] = matrix.spacing * (Math.sin(j/matrix.angle) + Math.sin(j));
        // }
        // perogi
        // else if(matrix.perogi){
        //     matrix.spacing = 15 || matrix.spacing;
        //     geometry.attributes.position.array[ vert + 0 ] = matrix.spacing * (Math.cos(j/matrix.angle) * Math.cos(j));
        //     geometry.attributes.position.array[ vert + 0 ] = matrix.spacing * (Math.cos(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity);
        //     geometry.attributes.position.array[ vert + 0 ] = matrix.spacing * (Math.sin(j/matrix.angle) * Math.sin(j));
        // }
        // // square thing
        // else if(matrix.square){
        //     matrix.spacing = 10 || matrix.spacing;
        //     geometry.attributes.position.array[ vert + 0 ] = matrix.spacing * (Math.sin(j/matrix.angle) * Math.cos(j) + Math.sin(j));
        //     geometry.attributes.position.array[ vert + 0 ] = matrix.spacing * (Math.cos(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity);
        //     geometry.attributes.position.array[ vert + 0 ] = matrix.spacing * (Math.sin(j/matrix.angle) * Math.sin(j) + Math.cos(j));
        // }
        // //quadangle!
        // else if(matrix.quadangle){
        //     matrix.spacing = 10 || matrix.spacing;
        //     geometry.attributes.position.array[ vert + 0 ] = matrix.spacing * (Math.sin(j/matrix.angle) * Math.cos(j) + Math.sin(j));
        //     geometry.attributes.position.array[ vert + 0 ] = matrix.spacing * (Math.sin(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity);
        //     geometry.attributes.position.array[ vert + 0 ] = matrix.spacing * (Math.sin(j/matrix.angle) * Math.sin(j) + Math.cos(j));
        // }
        // // tighter infinity -- remove z matrix rotaiton for this
        // else if(matrix.infinity){
        //     matrix.spacing = 10 || matrix.spacing;
        //     geometry.attributes.position.array[ vert + 0 ] = matrix.spacing * (Math.sin(j/matrix.angle) * Math.cos(j) + Math.cos(2*j/matrix.angle));
        //     geometry.attributes.position.array[ vert + 0 ] = matrix.spacing * (Math.cos(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity);
        //     geometry.attributes.position.array[ vert + 0 ] = matrix.spacing * (Math.sin(j/matrix.angle) * Math.sin(j) + Math.sin(2*j/matrix.angle));
        // }
        // // hourglass
        // else if(matrix.hourglass){
        //     matrix.spacing = 15 || matrix.spacing;
        //     geometry.attributes.position.array[ vert + 0 ] = matrix.spacing * (Math.sin(j/matrix.angle) * Math.cos(j));
        //     geometry.attributes.position.array[ vert + 0 ] = matrix.spacing * (Math.sin(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity);
        //     geometry.attributes.position.array[ vert + 0 ] * (Math.sin(j/matrix.angle) * Math.sin(j));
        // }
        // // spade
        // else if(matrix.spade){
        //     matrix.spacing = 10 || matrix.spacing;
        //     geometry.attributes.position.array[ vert + 0 ] = matrix.spacing * (Math.sin(j/matrix.angle) * (2 * Math.cos(j))) * Math.sin(j);
        //     geometry.attributes.position.array[ vert + 0 ] = matrix.spacing * (Math.cos(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity) + (10 * Math.cos(j));
        //     geometry.attributes.position.array[ vert + 0 ] = matrix.spacing * (Math.sin(j/matrix.angle)) * (2 * Math.sin(j)) * Math.sin(j);
        // }


    // } // end of loop maybee
