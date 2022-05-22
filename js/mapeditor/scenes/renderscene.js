import * as THREE from 'https:/unpkg.com/three@0.126.1/build/three.module.js'


console.log("3d engine started");
const canvasdiv = document.querySelector('#imagepreview');
const canvaswidth = canvasdiv.clientWidth;
const canvasheight =canvasdiv.clientHeight;

const manager = new THREE.LoadingManager();
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({antialias: true});
scene.background = new THREE.Color(0x000000);
renderer.shadowMap.enabled = false;

const frustumSize = 1;
const aspect = 1;
const camera = new THREE.OrthographicCamera( 
    frustumSize * aspect / - 2,
    frustumSize * aspect / 2, 
    frustumSize / 2, 
    frustumSize / - 2,
    0.1, 1000 );
    
//const camera = new THREE.PerspectiveCamera(75,1,0.1,1000);
camera.name = "mastercamera";
//scene.add(camera);
scene.add(camera);
camera.position.set(0,0,0.6);



renderer.setSize(1024,1024);
//renderer.setPixelRatio(devicePixelRatio);

renderer.domElement.id = "threedcanvas";
renderer.domElement.style.width = '100%';
renderer.domElement.style.height = '100%';

const textureloader = new THREE.TextureLoader();

//textures and normalmaps
var standby = textureloader.load( './js/mapeditor/standbyr.png' );


var geometry = new THREE.PlaneGeometry( 1, 1 ,16,16);
const material = new THREE.MeshBasicMaterial( {map: standby,color: 0xffffff, side: THREE.DoubleSide} );
var renderplane = new THREE.Mesh( geometry, material );
renderplane.name = "renderplane";
scene.add( renderplane );


/*
const boxGeometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshPhongMaterial({color: 0x00ff00,flatShading: THREE.FlatShading} );
const mesh = new THREE.Mesh(boxGeometry,material)
scene.add(mesh);
*/

const cubeamblight = new THREE.AmbientLight( 0xffffff ,1); // white light
scene.add( cubeamblight );


function loop(){
    renderer.render(scene,camera);  
    requestAnimationFrame(loop);
}
loop();


function showrender(){
    canvasdiv.appendChild(renderer.domElement);

}export { showrender};


function setresolution(resval){
    renderer.setSize(resval,resval);
    renderer.domElement.id = "threedcanvas";
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
}export { setresolution};

function setmaterial(tmaterial){
    if(typeof tmaterial == "string") renderplane.material = material;
    else renderplane.material = tmaterial;
}export { setmaterial};


function resizeplane(xsize,ysize){
    //geometry
    buildrenderplane(xsize,ysize);

}export { resizeplane};


function buildrenderplane(xsize,ysize){
    scene.remove(geometry);
    scene.remove(renderplane);
    geometry = new THREE.PlaneGeometry( 1, 1 ,xsize,ysize);
    renderplane = new THREE.Mesh( geometry, material );
    renderplane.name = "renderplane";
    scene.add( renderplane );

}
