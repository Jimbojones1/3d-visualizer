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
    this.spacing = 52;
    this.angle = 0.975000;
    this.animationSpeed = 0.00001;
    this.intensity = 1;
    this.twinkle = 120;
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
    this.particleTwo = 0xc33287;
    this.particleThree = 0x19afcf;
    this.color = "#ffae23";
    this.fog = false;
    this.fogColor = 0x19afcf;
    this.radius = 5;
    this.size = 35;
    this.hippie = false;
};




var matrix = new GuiControls();

var gui = new dat.GUI();
gui.closed = true;
// gui.add(matrix, 'spacing', 0, 50).step(0.1).name('Particle Spacing');
gui.add(matrix, 'spacing',0, 500).step(1).name('spacing')
gui.add(matrix, 'angle', 0, 25).step(0.1).name('Particle Angle');
gui.add(matrix, 'animationSpeed', 0.0000001, 0.01).step(0.00001).name('Animation Speed');
gui.add(matrix, 'intensity', 0.5, 5).step(0.1).name('Reaction Intensity');
gui.add(matrix, 'twinkle', 1, 1000).step(10).name('Twinkle');
gui.add(matrix, 'colorIntensity', 0.5, 5).step(1).name('Color Intensity');
gui.add(matrix, 'zoomSpeed', 0.001, 0.1).step(0.001).name('Zoom Speed');
gui.add(matrix, 'rotationSpeed', 0, 0.1).step(0.000005).name('Z-index Rotation Speed');
gui.add(matrix, 'fog').name('fog')
gui.add(matrix, 'hippie').name('hippie')
gui.addColor(matrix, 'particleOne').name('Color 1');
gui.addColor(matrix, 'particleTwo').name('Color 2');
gui.addColor(matrix, 'particleThree').name('Color 3');
gui.addColor(matrix, 'fogColor')
gui.add(matrix, 'radius',0, 100).step(1).name('radius')
gui.add(matrix, 'size',0, 100).step(0.1).name('size')

var stats = new Stats();
stats.showPanel( 0 );
document.body.appendChild( stats.dom );
init();
var geometry;


// adding workers for optimization
// var worker = new Worker('/scripts/worker.js')

// worker.postMessage({
//   some_data: 'foo',
//   some_more_data: 'bar'
// })

// worker.onmessage = function(e){
//   var data = e.data;
//   console.log(data)
// }


var color;
var numOfParticles;

function init() {
  // making these globals iust for debugging purposes
      numOfParticles = 2024;
     // geometry = new THREE.Geometry();
      geometry = new THREE.BufferGeometry();
      geometry.dynamic = true;
      var positions = new Float32Array( numOfParticles * 3 );
      var colors = new Float32Array( numOfParticles * 3 );
      var sizes = new Float32Array( numOfParticles );
      color = new THREE.Color();

      var texture = new THREE.TextureLoader().load( "./images/spark1.png" );


      uniforms = {
        "amplitude": { value: 1 },
          "color": { value: new THREE.Color( 0xff2200 ) },
          "texture": { value: texture },
          "hippie": { value: false}
      }

      var shaderMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader:   document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent,
        depthTest: false,
        // blending: THREE.AdditiveBlending,
        transparent: true
      })

        var material = new THREE.PointsMaterial( {
          vertexColors: THREE.VertexColors,
          depthTest: false,
          opacity: 1,
          sizeAttenuation: true
      } );

        // var dirLight = new THREE.DirectionalLight(0xffffff, 1);
        // dirLight.position.set(100, 100, 50);
        // scene.add(dirLight);

      var radius = 200;

      var ratio = numOfParticles/(Math.PI*2)

      for ( var i = 0, vert = 0; i < numOfParticles; i ++, vert += 3 ) {
        positions[ vert + 0 ] = 20 * Math.sin(i/10) * Math.cos(i);
        positions[ vert + 1 ] = 20 * Math.cos(i/10);
        positions[ vert + 2 ] = 20 * Math.sin(i) * Math.sin(i/10);
        color.setRGB(Math.random(), Math.random(), Math.random());
        colors[ vert + 0 ] = color.r;
        colors[ vert + 1 ] = color.g;
        colors[ vert + 2 ] = color.b;
        sizes[ i ] = 1;
      }


      geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
      geometry.addAttribute( 'userColor', new THREE.BufferAttribute( colors, 3 ) );
      geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );

      geometry.attributes.size.dynamic = true
      // geometry.addAttribute()
      // geometry.attributes.customColor.needsUpdate = true;
      particleSystem = new THREE.Points( geometry, shaderMaterial );
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


function setPosition(vert, i){
    geometry.attributes.position.array[ vert + 0 ] = matrix.spacing * (Math.sin(i/matrix.angle) * Math.cos(i) + Math.cos(i));
    geometry.attributes.position.array[ vert + 1 ] = matrix.spacing * (Math.cos(i/matrix.angle));
    geometry.attributes.position.array[ vert + 2 ] = matrix.spacing * (Math.sin(i/matrix.angle) * Math.sin(i) + Math.sin(i));
}

function setColor(vert, i, musicData){
    geometry.attributes.userColor.array[ vert + 0 ] = color.r + (musicData[i] * matrix.colorIntensity);
    geometry.attributes.userColor.array[ vert + 1 ] = color.g + (musicData[i] * matrix.colorIntensity);
    geometry.attributes.userColor.array[ vert + 2 ] = color.b + (musicData[i] * matrix.colorIntensity);
}

function rColor(vert, i, timeFloatData){
  var c = new THREE.Color();
  c.setRGB(1, 0.2, 1);
  geometry.attributes.userColor.array[ vert + 0 ] = c.r + timeFloatData[i];
  geometry.attributes.userColor.array[ vert + 1 ] = c.g + timeFloatData[i];
  geometry.attributes.userColor.array[ vert + 2 ] = c.b + timeFloatData[i];
}

function randomColor(vert, i, timeFloatData){
  var c = new THREE.Color();
  c.setRGB(0.2, 0.2, 1);
  geometry.attributes.userColor.array[ vert + 0 ] = c.r + timeFloatData[i];
  geometry.attributes.userColor.array[ vert + 1 ] = c.g + timeFloatData[i];
  geometry.attributes.userColor.array[ vert + 2 ] = c.b + timeFloatData[i];
}
function createSphere(vert, i){

     geometry.attributes.position.array[ vert + 0 ] = matrix.spacing * (Math.sin(i/matrix.angle)) * Math.cos(i);
     geometry.attributes.position.array[ vert + 1 ] = matrix.spacing * (Math.cos(i/matrix.angle));
     geometry.attributes.position.array[ vert + 2 ] = matrix.spacing * (Math.sin(i/matrix.angle)) * Math.sin(i);
}

function createDonut(vert, i){

    geometry.attributes.position.array[ vert + 0 ] = matrix.spacing * (Math.sin(i/matrix.angle) * Math.cos(i) + Math.cos(i));
    geometry.attributes.position.array[ vert + 1 ] = matrix.spacing * (Math.cos(i/matrix.angle));
    geometry.attributes.position.array[ vert + 2 ] = matrix.spacing * (Math.sin(i/matrix.angle) * Math.sin(i) + Math.sin(i));
}

function createLongDonut(vert, i, timeFloatData){
    geometry.attributes.position.array[ vert + 0 ] = matrix.spacing * (Math.sin(i/matrix.angle) + Math.cos(i));
    geometry.attributes.position.array[ vert + 1 ] = matrix.spacing * (Math.cos(i/matrix.angle)) + (timeFloatData[i] * matrix.intensity);
    geometry.attributes.position.array[ vert + 2 ] = matrix.spacing * (Math.sin(i/matrix.angle) + Math.sin(i));
}


function createPerogi(vert, i, timeFloatData){
    geometry.attributes.position.array[ vert + 0 ] = matrix.spacing * (Math.cos(i/matrix.angle) * Math.cos(i));
    geometry.attributes.position.array[ vert + 1 ] = matrix.spacing * (Math.cos(i/matrix.angle)) + (timeFloatData[i] * matrix.intensity);
    geometry.attributes.position.array[ vert + 2 ] = matrix.spacing * (Math.sin(i/matrix.angle) * Math.sin(i));
}

function createSquare(vert, i, timeFloatData, callback){
    geometry.attributes.position.array[ vert + 0 ] = matrix.spacing * (Math.sin(i/matrix.angle) * Math.cos(i) + Math.sin(i));
    geometry.attributes.position.array[ vert + 1 ] = matrix.spacing * (Math.cos(i/matrix.angle)) + (timeFloatData[i] * matrix.intensity);
    geometry.attributes.position.array[ vert + 2 ] = matrix.spacing * (Math.sin(i/matrix.angle) * Math.sin(i) + Math.cos(i));

    callback
}

function createQuadangle(vert, i, timeFloatData){
    geometry.attributes.position.array[ vert + 0 ] = matrix.spacing * (Math.sin(i/matrix.angle) * Math.cos(i) + Math.sin(i));
    geometry.attributes.position.array[ vert + 1 ] = matrix.spacing * (Math.sin(i/matrix.angle)) + (timeFloatData[i] * matrix.intensity);
    geometry.attributes.position.array[ vert + 2 ] = matrix.spacing * (Math.sin(i/matrix.angle) * Math.sin(i) + Math.cos(i));
}

function createInfinity(vert, i, timeFloatData){
    geometry.attributes.position.array[ vert + 0 ] = matrix.spacing * (Math.sin(i/matrix.angle) * Math.cos(i) + Math.cos(2*i/matrix.angle));
    geometry.attributes.position.array[ vert + 1 ] = matrix.spacing * (Math.cos(i/matrix.angle)) + (timeFloatData[i] * matrix.intensity);
    geometry.attributes.position.array[ vert + 2 ] = matrix.spacing * (Math.sin(i/matrix.angle) * Math.sin(i) + Math.sin(2*i/matrix.angle));
}

function createHourglass(vert, i, timeFloatData){
    geometry.attributes.position.array[ vert + 0 ] = matrix.spacing * (Math.sin(i/matrix.angle) * Math.cos(i));
    geometry.attributes.position.array[ vert + 1 ] = matrix.spacing * (Math.sin(i/matrix.angle)) + (timeFloatData[i] * matrix.intensity);
    geometry.attributes.position.array[ vert + 2 ] * (Math.sin(i/matrix.angle) * Math.sin(i));
}

function createSpade(vert, i, timeFloatData){
    geometry.attributes.position.array[ vert + 0 ] = matrix.spacing * (Math.sin(i/matrix.angle) * (2 * Math.cos(i))) * Math.sin(i);
    geometry.attributes.position.array[ vert + 1 ] = matrix.spacing * (Math.cos(i/matrix.angle)) + (timeFloatData[i] * matrix.intensity) + (10 * Math.cos(i));
    geometry.attributes.position.array[ vert + 2 ] = matrix.spacing * (Math.sin(i/matrix.angle)) * (2 * Math.sin(i)) * Math.sin(i);
}

function render() {
    // var timeFrequencyData = new Uint8Array(analyser.fftSize);
    var timeFloatData = new Float32Array(analyser.fftSize);
    // analyser.getByteTimeDomainData(timeFrequencyData);
    analyser.getFloatTimeDomainData(timeFloatData);

    // if(matrix.fog){
    //   fog = new THREE.Fog(matrix.fogColor, 0.015, 200);
    //   scene.add(fog)
    // }

    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.userColor.needsUpdate = true;
    geometry.attributes.size.needsUpdate = true;
    geometry.attributes.size.dynamic = true
    particleSystem.material.blendSrc.needsUpdate = true;


    var count = 2;
    var radius = 5
      for ( var i = 0, vert = 0; i < numOfParticles; i ++, vert += 3 ) {

        geometry.attributes.size.array[i] = matrix.size + (timeFloatData[i] * matrix.twinkle);







        if(i%3 !== 0 && i%2 !==0){
            // color.setHex(matrix.particleOne)
            // setColor(vert, i, timeFloatData)

            // twinkle me timbers
            geometry.attributes.size.array[i] = matrix.size * (timeFloatData[i] * 10);
         }
        else if (i%2 === 0){
            // color.setHex(matrix.particleTwo)
            // // setPosition(vert, i)
            // setColor(vert, i, timeFloatData)
        }
        else if(i%3 === 0){
            // color.setHex(matrix.particleThree)
            // setColor(vert, i, timeFloatData)
            // var num = i + 100
            // setPosition(vert, num)
        }
        else{

        }

        matrix.spacing =  matrix.spacing;

        if(matrix.sphere){
          createSphere(vert, i)

        }
        //donut
        else if(matrix.donut){
          createDonut(vert, i)

        }
        // long donut -- 14.3
        else if(matrix.longDonut){
          createLongDonut(vert, i, timeFloatData)
        }
        // perogi
        else if(matrix.perogi){
          createPerogi(vert, i, timeFloatData)
        }
        // square thing
        else if(matrix.square){
          createSquare(vert, i, timeFloatData)
        }
        //quadangle!
        else if(matrix.quadangle){
          createQuadangle(vert, i, timeFloatData)
        }
        // tighter infinity -- remove z matrix rotaiton for this
        else if(matrix.infinity){
          createInfinity(vert, i, timeFloatData)
        }
        // hourglass
        else if(matrix.hourglass){
          createHourglass(vert, i, timeFloatData)
        }
        // spade
        else if(matrix.spade){
          createSpade(vert, i, timeFloatData)
        }
        else if(matrix.hippie){
          geometry.attributes.position.array[ vert + 0 ] = matrix.spacing * (Math.cos(i/matrix.angle)) + Math.cos(i) + (Math.cos(timeFloatData[i]))
          geometry.attributes.position.array[ vert + 1 ] = matrix.spacing * (Math.sin(i/ 1 - matrix.angle)) + Math.sin(i)
          geometry.attributes.position.array[ vert + 2 ] = matrix.spacing * (Math.cos(i/matrix.angle)) * Math.cos(i) * Math.sin(i/matrix.angle) + Math.sin(timeFloatData[i]) + (Math.cos(timeFloatData[i]))

        }
        else {

        }
    }// end of loop


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
            matrix.hippie = false;
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
            matrix.hippie = false;
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
            matrix.hippie = false;
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
            matrix.hippie = false;
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
            matrix.hippie = false;
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
            matrix.hippie = false;
            break;
        case 55:
            //77
            matrix.sphere = false;
            matrix.donut = false;
            matrix.longDonut = false;
            matrix.perogi = false;
            matrix.square = false;
            matrix.infinity = false;
            matrix.longDonut2 = true;
            matrix.hippie = false;
            break;

        case 56:
            //9
            console.log('hpaen')
            matrix.sphere = false;
            matrix.donut = false;
            matrix.longDonut = false;
            matrix.perogi = false;
            matrix.square = false;
            matrix.infinity = false;
            matrix.longDonut2 = false;
            matrix.hippie      = true;
            break;
  }

}
// var neither = [];
// var two = [];
// var three= [];
// for (var i = 0; i < 2048; i++){
//
//     if (i%3 !== 0 && i%2 !==0){
//         neither.push(i)
//     }
//     else if (i%3 === 0){
//         two.push(i);
//     }
//     else if(i%2 === 0){
//         three.push(i)
//     }
//     console.log(neither, 'neither');
//     console.log(two, 'two');
//     console.log(three, 'three');
//







    // for (var i = 0; i < 10000; i++){

    //    // particleSystem.material.size = 0.4 + (timeFloatData[i]/2.5);
    //   var intensity = timeFloatData[i] * matrix.colorIntensity;
        // if (i%3 !== 0 && i%2 !==0){
        //     // point.material.color.set(matrix.particleOne);
        //     // this stream mixes with the next stream
        //     // geometry.colors[i].r = calcColor(0, matrix.dotOne) + (timeFloatData[i] * matrix.colorIntensity);
        //     // geometry.colors[i].g = calcColor(1, matrix.dotOne) + (timeFloatData[i] * matrix.colorIntensity);
        //     // geometry.colors[i].b = calcColor(2, matrix.dotOne) + (timeFloatData[i] * matrix.colorIntensity);
        //      particleSystem.geometry.colors[i].set(matrix.particleOne);
        //     r = geometry.colors[i].r;
        //     g = geometry.colors[i].g;
        //     b = geometry.colors[i].b;
        //     geometry.colors[i].setRGB((r + intensity), (g + intensity), (b + intensity));

        // }



    //     // for brownian motion

    //       dX = Math.random() * .1 - .05;
    //       dY = Math.random() * .1 - .05;
    //       dZ = Math.random() * .1 - .05;

    // OG




    // } // end of loop maybee
