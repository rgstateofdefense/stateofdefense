const menuobj = document.querySelector('#menu');
const rect = menuobj.getBoundingClientRect()
const canvaswidth = rect.width
const canvasheight =innerHeight-rect.bottom//-(menuobj.offsetTop*3)

const canvasdiv = document.querySelector('#canvascell');

//import * as THREE from 'https:/unpkg.com/three@v0.137.5/build/three.module.js'
import * as THREE from 'https:/unpkg.com/three@0.126.1/build/three.module.js'
import  { OrbitControls } from 'https:/unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'
import  { GLTFLoader } from 'https:/unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js' 
import { gsap } from 'https://unpkg.com/gsap@3.9.1/gsap-core.js'
import { FlyControls } from 'https:/unpkg.com/three@0.126.1/examples/jsm/controls/FlyControls'



const raycaster = new THREE.Raycaster()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75,canvaswidth/canvasheight,0.1,1000)
const renderer = new THREE.WebGLRenderer()
scene.background = new THREE.Color(0x000000);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap

renderer.setSize(canvaswidth,canvasheight)
renderer.setPixelRatio(devicePixelRatio)

canvasdiv.appendChild(renderer.domElement);

//simple box
/*
const boxGeometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshPhongMaterial({color: 0x00ff00,flatShading: THREE.FlatShading} );
//const material = new THREE.MeshBasicMaterial({color: 0x00ff00})
const mesh = new THREE.Mesh(boxGeometry,material)
scene.add(mesh)
*/


const textureloader = new THREE.TextureLoader()
const basetexture = textureloader.load("../screendoor/Sci-fi_Door_001_basecolorIIp.png");
const alphatexture = textureloader.load("../screendoor/Sci-fi_Door_001_basecolorIIalphap.png");
const tank00 = textureloader.load("../screendoor/testtank.png");

const screendoormaterial = new THREE.MeshStandardMaterial({
  
  color: 'white',
  map: basetexture,
  metalness: 0.6,
  roughness: 0.4,
  normalMap: alphatexture
  //depthTest: false
})





const tankmaterial = new THREE.MeshStandardMaterial({
  
  color: 'white',
  map: tank00
  //depthTest: false
})


const gltfloader = new GLTFLoader()

var downdoor;
var updoor;
var lighttargetpos

gltfloader.load('../screendoor/screendoordown.glb',(gltf) =>{
  downdoor = gltf.scene;
  downdoor.traverse ( ( o ) => {
    if ( o.isMesh ) {
      // note: for a multi-material mesh, `o.material` may be an array,
      // in which case you'd need to set `.map` on each value.
      o.material = screendoormaterial;
      o.receiveShadow = true
    }
  } );

scene.add(gltf.scene)
gltf.scene.position.y =-1.8
gltf.scene.scale.x =1.3
lighttargetpos = gltf.scene.position
})

gltfloader.load('../screendoor/screendoorup.glb',(gltf) =>{
  updoor = gltf.scene;
  updoor.traverse ( ( o ) => {
    if ( o.isMesh ) {
      // note: for a multi-material mesh, `o.material` may be an array,
      // in which case you'd need to set `.map` on each value.
      o.material = screendoormaterial;
      o.receiveShadow = true
    }
  } );
  scene.add(gltf.scene)

  gltf.scene.position.y =-1.8
  gltf.scene.scale.x =1.3 
})


//const planegeometry = new THREE.PlaneBufferGeometry(0.3,0.4)
const planegeometry = new THREE.BoxGeometry(0.6,0.8,0.001)
const shadowplane  = new THREE.Mesh(planegeometry,tankmaterial)
shadowplane.castShadow = true
scene.add(shadowplane)
shadowplane.position.set(-1.8,0.75,0.2)


const dlightl = new THREE.DirectionalLight(0xffffff,0.2)
dlightl.position.set(-1.2,0,3)
dlightl.castShadow = true; // default false

dlightl.shadow.mapSize.width = 512; // default
dlightl.shadow.mapSize.height = 512; // default
dlightl.shadow.camera.near = 0.5; // default
dlightl.shadow.camera.far = 500; // default

scene.add(dlightl)
dlightl.target.position.set( -2, 0, 0 )


const metalsparklelight = new THREE.DirectionalLight(0x111111,1)
metalsparklelight.position.set(0,0,3)
//metalsparklelight.target.position.set(0,0,0)
scene.add(metalsparklelight)

//const helper = new THREE.DirectionalLightHelper( metalsparklelight, 1 );
//scene.add( helper );


const dlightr = new THREE.DirectionalLight(0xffffff,0.6)
dlightr.position.set(0.5,0,1)
dlightr.castShadow = true; // default false
scene.add(dlightr)

const amblight = new THREE.AmbientLight( 0xffffff ,1); // soft white light
scene.add( amblight );

  
// loop
var lt = new Date();





function init3dengine(needflymode) {  
    if(needflymode) buildflymode()
    
    camera.position.z = 1.7
  }
  export { init3dengine };

var flymode = false;
var controls
function buildflymode(){
  controls = new FlyControls( camera, renderer.domElement );
  controls.movementSpeed = 10;
  controls.rollSpeed = Math.PI / 6;
  controls.autoForward = false;
  controls.dragToLook = true;
  flymode = true;
}










function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
    if (flymode) controls.update(0.01)
    //mesh.rotation.x +=0.01
    //updoor.rotation.y +=0.01
}
animate()