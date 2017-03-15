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
var taco = [];
var uniforms;
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
    this.particleOne = 0x00ff00;
    this.particleTwo = 0x0000ff;
    this.particleThree = 0xff0000;
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
gui.addColor(matrix, 'fogColor')
gui.addColor(matrix, 'particleOne').name('Color 1');
gui.addColor(matrix, 'particleTwo').name('Color 2');
gui.addColor(matrix, 'particleThree').name('Color 3');
var stats = new Stats();
stats.showPanel( 0 );
document.body.appendChild( stats.dom );
init();
var geometry;
var sphere;
var displacement;
var worker = new Worker('/scripts/worker.js')
var geo;
var multiplied;
worker.postMessage({
  some_data: 'foo',
  some_more_data: 'bar'
})

worker.onmessage = function(e){
  var data = e.data;
  console.log(data)
}

function returnArrayVal(anArray){
      return Float32Array.from(anArray)
    }
function init() {

     geometry = new THREE.Geometry();

    for (var i = 0; i < 2048; i++) {

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






    var radius = 50, segments = 128, rings = 64;
    geo = new THREE.SphereBufferGeometry( radius, segments, rings );
    // var geo = new THREE.SphereGeometry( 5, 32, 32 );

    uniforms = {
      "amplitude": { value: 1 },
        "color": { value: new THREE.Color( 0xff2200 ) }
    }

    var shaderMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader:   document.getElementById('vertexShader').textContent,
      fragmentShader: document.getElementById('fragmentShader').textContent
    })


  function returnProperArrayType(anArray){
      return Float32Array.from(anArray)
    }
    vectorPosDisplacementArrayVal = []

    for(var j = 0; j < geo.attributes.position.count; j++) {
        vectorPosDisplacementArrayVal.push(Math.random() * 30)
    }


    // now populate the array of attributes
    geo.addAttribute( 'displacement', new THREE.BufferAttribute( returnProperArrayType(vectorPosDisplacementArrayVal), 1 ) );



    sphere = new THREE.Mesh( geo, shaderMaterial );


    var verts = sphere.geometry.attributes.position.count;
    console.log(verts, ' this is verts')
    scene.add( sphere );
    // var radius = 50, segments = 16, rings = 16;


    //   // create a new mesh with sphere geometry -
    //   // we will cover the sphereMaterial next!
    //   var sphere = new THREE.Mesh(
    //      new THREE.Sphere(radius, segments, rings),
    //      shaderMaterial);

    //   // add the sphere to the scene
    //   scene.add(sphere);
    // scene.add(cube)

    var material = new THREE.PointsMaterial( {
            vertexColors: THREE.VertexColors,
            depthTest: true,
            opacity: 1,
            needsUpdate: true,
            sizeAttenuation: true
        } );


    particleSystem = new THREE.Points( geometry, material );

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
var frame = 0;
function render() {
    // var timeFrequencyData = new Uint8Array(analyser.fftSize);
    var timeFloatData = new Float32Array(analyser.fftSize);
    // analyser.getByteTimeDomainData(timeFrequencyData);
    analyser.getFloatTimeDomainData(timeFloatData);

    if(matrix.fog){
      scene.fog = new THREE.Fog(matrix.fogColor, 0.015, 100);
    }


    frame += 0.1
     // point.material.size = 0.4 + (timeFloatData[j]/2.5);
    // sphere.geometry.attributes.color.needsUpdate = true;
    particleSystem.geometry.colorsNeedUpdate =true
    geometry.verticesNeedUpdate = true;

    for (var j = 0; j < geometry.colors.length; j++){
      var r, g, b;
      var intensity = timeFloatData[j] * matrix.colorIntensity;
      // this is awesome looking zoom back the camera
      // Math.sin(frame)/Math.sin(Math.abs(timeFloatData[j]))
      uniforms.amplitude.value = Math.sin(frame)/Math.sin(Math.abs(timeFloatData[j])) || 1
      // uniforms.amplitude.value = matrix.particleOne;
      // console.log(timeFloatData[j], typeof timeFloatData[j])
      // sphere.material.uniforms.amplitude.value =  timeFloatData[j] * 2 || 1

        if (j%3 !== 0 && j%2 !==0){
            particleSystem.geometry.colors[j].set(matrix.particleOne);
            // this stream mixes with the next stream
            r = geometry.colors[j].r;
            g = geometry.colors[j].g;
            b = geometry.colors[j].b;
            geometry.colors[j].setRGB((r + intensity), (g + intensity), (b + intensity));
        }
        else if (j%2 === 0){
            particleSystem.geometry.colors[j].set(matrix.particleTwo);
            // point.geometry.setColor(matrix.particleTwo);
            r = geometry.colors[j].r;
            g = geometry.colors[j].g;
            b = geometry.colors[j].b;
            geometry.colors[j].setRGB((r + intensity), (g + intensity), (b + intensity));
        }
        else if(j%3 === 0){
            particleSystem.geometry.colors[j].set(matrix.particleThree);
            // this is a dominant color
            r = geometry.colors[j].r;
            g = geometry.colors[j].g;
            b = geometry.colors[j].b;
            geometry.colors[j].setRGB((r + intensity), (g + intensity), (b + intensity));
        }


        // for brownian motion

          dX = Math.random() * .1 - .05;
          dY = Math.random() * .1 - .05;
          dZ = Math.random() * .1 - .05;

        // OG
        if(matrix.sphere){
            matrix.spacing =  matrix.spacing;
            geometry.vertices[j].x = matrix.spacing * (Math.sin(j/matrix.angle) * Math.cos(j));

            geometry.vertices[j].y = matrix.spacing * (Math.cos(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity);
            geometry.vertices[j].z = matrix.spacing * (Math.sin(j/matrix.angle) * Math.sin(j));
        }
        //donut
        else if(matrix.donut){
            matrix.spacing = 10 || matrix.spacing;
            geometry.vertices[j].x = matrix.spacing * (Math.sin(j/matrix.angle) * Math.cos(j) + Math.cos(j));
            geometry.vertices[j].y = matrix.spacing * (Math.cos(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity);
            geometry.vertices[j].z = matrix.spacing * (Math.sin(j/matrix.angle) * Math.sin(j) + Math.sin(j));

            // point.position.y = matrix.spacing * (Math.cos(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity) * dY;
            // point.position.z = matrix.spacing * (Math.sin(j) * Math.sin(j/matrix.angle)) * dZ;
        }
        //donut
        else if(matrix.donut){
            matrix.spacing =  matrix.spacing;
            geometry.vertices[j].x = matrix.spacing * (Math.sin(j/matrix.angle) * Math.cos(j) + Math.cos(j));
            geometry.vertices[j].y = matrix.spacing * (Math.cos(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity);
            geometry.vertices[j].z = matrix.spacing * (Math.sin(j) * Math.sin(j/matrix.angle) + Math.sin(j));

        }

        // long donut -- 14.3
        else if(matrix.longDonut){

            matrix.spacing = 9 || matrix.spacing;
            geometry.vertices[j].x = matrix.spacing * (Math.sin(j/matrix.angle) + Math.cos(j));
            geometry.vertices[j].y = matrix.spacing * (Math.cos(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity);
            geometry.vertices[j].z = matrix.spacing * (Math.sin(j/matrix.angle) + Math.sin(j));
        }
        // perogi
        else if(matrix.perogi){
            matrix.spacing = 15 || matrix.spacing;
            geometry.vertices[j].x = matrix.spacing * (Math.cos(j/matrix.angle) * Math.cos(j));
            geometry.vertices[j].y = matrix.spacing * (Math.cos(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity);
            geometry.vertices[j].z = matrix.spacing * (Math.sin(j/matrix.angle) * Math.sin(j));
        }
        // square thing
        else if(matrix.square){
            matrix.spacing = 10 || matrix.spacing;
            geometry.vertices[j].x = matrix.spacing * (Math.sin(j/matrix.angle) * Math.cos(j) + Math.sin(j));
            geometry.vertices[j].y = matrix.spacing * (Math.cos(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity);
            geometry.vertices[j].z = matrix.spacing * (Math.sin(j/matrix.angle) * Math.sin(j) + Math.cos(j));
        }
        //quadangle!
        else if(matrix.quadangle){
            matrix.spacing = 10 || matrix.spacing;
            geometry.vertices[j].x = matrix.spacing * (Math.sin(j/matrix.angle) * Math.cos(j) + Math.sin(j));
            geometry.vertices[j].y = matrix.spacing * (Math.sin(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity);
            geometry.vertices[j].z = matrix.spacing * (Math.sin(j/matrix.angle) * Math.sin(j) + Math.cos(j));

            matrix.spacing =  matrix.spacing;
            geometry.vertices[j].x = matrix.spacing * (Math.sin(j/matrix.angle) + Math.cos(j)) * dX;
            geometry.vertices[j].y = matrix.spacing * (Math.cos(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity) * dY;
            geometry.vertices[j].z = matrix.spacing * (Math.sin(j) + Math.sin(j/matrix.angle)) * dZ;
        }
        // perogi
        else if(matrix.perogi){
            matrix.spacing =  matrix.spacing;
            geometry.vertices[j].x = matrix.spacing * (Math.cos(j/matrix.angle) * Math.cos(j)) * dX;
            geometry.vertices[j].y = matrix.spacing * (Math.cos(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity) * dY;
            geometry.vertices[j].z = matrix.spacing * (Math.sin(j) * Math.sin(j/matrix.angle)) * dZ;
        }
        // square thing
        else if(matrix.square){
            matrix.spacing =  matrix.spacing;
            geometry.vertices[j].x = matrix.spacing * (Math.sin(j/matrix.angle) * Math.cos(j) + Math.sin(j)) * dX;
            geometry.vertices[j].y = matrix.spacing * (Math.cos(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity) * dY;
            geometry.vertices[j].z = matrix.spacing * (Math.sin(j) * Math.sin(j/matrix.angle) + Math.cos(j)) * dZ;

        }
        // tighter infinity -- remove z matrix rotaiton for this
        else if(matrix.infinity){
            matrix.spacing = matrix.spacing;
            geometry.vertices[j].x = matrix.spacing * (Math.sin(j/matrix.angle) * Math.cos(j) + Math.cos(2*j/matrix.angle));
            geometry.vertices[j].y = matrix.spacing * (Math.cos(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity);
            geometry.vertices[j].z = matrix.spacing * (Math.sin(j/matrix.angle) * Math.sin(j) + Math.sin(2*j/matrix.angle));
        }
        // also a long donut
        else if(matrix.longDonut2){
            matrix.spacing =  matrix.spacing;
            geometry.vertices[j].x = matrix.spacing * (Math.cos(j/matrix.angle) + Math.cos(j));
            geometry.vertices[j].y = matrix.spacing * (Math.cos(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity);
            geometry.vertices[j].z = matrix.spacing * (Math.sin(j/matrix.angle) + Math.sin(j));
        }






















        // console.log(timeFloatData)



            // console.log(geometry.verticesNeedUpdate)



        //   if(matrix.sphere){
        //      matrix.spacing =  matrix.spacing;
        //     geometry.vertices[j].x = matrix.spacing * (Math.sin(j/matrix.angle) * Math.cos(j));
        //     geometry.vertices[j].y = matrix.spacing * (Math.cos(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity);
        //     geometry.vertices[j].z = matrix.spacing * (Math.sin(j/matrix.angle) * Math.sin(j));
        // }
        // else {
        //     matrix.spacing = 10 || matrix.spacing;
        //     geometry.vertices[j].x = matrix.spacing * (Math.sin(j/matrix.angle) * Math.cos(j) + Math.cos(j));
        //     geometry.vertices[j].y = matrix.spacing * (Math.cos(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity);
        //     geometry.vertices[j].z = matrix.spacing * (Math.sin(j) * Math.sin(j/matrix.angle) + Math.sin(j));
        // }


    } // end of loop maybee

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

    // run animation for uniforms;


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
