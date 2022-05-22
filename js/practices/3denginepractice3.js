const menuobj = document.querySelector('#menu');
const rect = menuobj.getBoundingClientRect()
const canvaswidth = rect.width
const canvasheight =innerHeight-rect.bottom//-(menuobj.offsetTop*3)

const canvasdiv = document.querySelector('#canvascell');

import * as THREE from 'https:/unpkg.com/three@0.126.1/build/three.module.js'
//import  { OrbitControls } from 'https:/unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'
import { gsap } from 'https://unpkg.com/gsap@3.9.1/gsap-core.js'

const raycaster = new THREE.Raycaster()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75,canvaswidth/canvasheight,0.1,1000)
const renderer = new THREE.WebGLRenderer()
scene.background = new THREE.Color(0x000000);

//simple box
/*
const boxGeometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshPhongMaterial({color: 0x00ff00,flatShading: THREE.FlatShading} );
//const material = new THREE.MeshBasicMaterial({color: 0x00ff00})
const mesh = new THREE.Mesh(boxGeometry,material)
scene.add(mesh)
*/


const textureloader = new THREE.TextureLoader()
const rocktexture = textureloader.load("../textures/texture/rock.jpg");
const heighttexture = textureloader.load("../textures/heightmap/heightmap.png");
const alphatexture = textureloader.load("../textures/alphamap/alphacircle3.jpg");
//const normaltexture = textureloader.load("../textures/normalmap/nmap1.jpg");

const planegeometry = new THREE.PlaneBufferGeometry(3,3,64,64)
const material = new THREE.MeshStandardMaterial({
  
  color: 'white',
  map: rocktexture,
  displacementMap: heighttexture,
  displacementScale: .4,
  alphaMap: alphatexture,
  transparent: true
  //depthTest: false
  
})

//material.normalMap = normaltexture

const plane = new THREE.Mesh(planegeometry,material)
plane.rotation.x =181
scene.add(plane)


const light = new THREE.DirectionalLight(0xffffff,1)
light.position.set(0,0,1)
scene.add(light)
light.color.set('white');

function init3dengine() {  
    
    
    
    //const canvasdivwidth = canvasdiv.offsetWidth;
    //const canvasdivy = canvasdiv.offsetWidth;
    
    renderer.setSize(canvaswidth,canvasheight)
    renderer.setPixelRatio(devicePixelRatio)
    
    canvasdiv.appendChild(renderer.domElement);
    //document.body.appendChild(renderer.domElement)
    
    camera.position.z = 3
  }
  export { init3dengine };

document.addEventListener('mousemove',animateTerrain)
let mouseY = 0
function animateTerrain(event){
  mouseY= event.clientY

}


function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
    //plane.rotation.x +=0.01
    plane.rotation.z +=0.01
    //plane.material.displacementScale = .3+mouseY*0.001


}

animate()