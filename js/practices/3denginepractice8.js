const menuobj = document.querySelector('#menu');
const rect = menuobj.getBoundingClientRect()
const canvaswidth = rect.width
const canvasheight =innerHeight-rect.bottom//-(menuobj.offsetTop*3)

const canvasdiv = document.querySelector('#canvascell');

//import * as THREE from 'https:/unpkg.com/three@v0.137.5/build/three.module.js'
import * as THREE from 'https:/unpkg.com/three@0.126.1/build/three.module.js'
import  { OrbitControls } from 'https:/unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'
import { gsap } from '../node_modules/gsap/gsap-core.js'

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

const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
  "../textures/skybox/lnhnight_bk.jpg",
  "../textures/skybox/lnhnight_dn.jpg",
  "../textures/skybox/lnhnight_fr.jpg",
  "../textures/skybox/lnhnight_lt.jpg",
  "../textures/skybox/lnhnight_rt.jpg",
  "../textures/skybox/lnhnight_fr.jpg"
]);

scene.background = texture;

const light = new THREE.DirectionalLight(0xffffff,1)
light.position.set(0,0,1)
scene.add(light)


function init3dengine() {  
    
    
    
    //const canvasdivwidth = canvasdiv.offsetWidth;
    //const canvasdivy = canvasdiv.offsetWidth;
    
    renderer.setSize(canvaswidth,canvasheight)
    renderer.setPixelRatio(devicePixelRatio)
    
    canvasdiv.appendChild(renderer.domElement);
    //document.body.appendChild(renderer.domElement)
    
    camera.position.z = 5
  }
  export { init3dengine };

function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
    //mesh.rotation.x +=0.01
    //mesh.rotation.y +=0.01
}

animate()