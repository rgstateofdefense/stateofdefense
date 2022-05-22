const menuobj = document.querySelector('#menu');
const rect = menuobj.getBoundingClientRect()
const canvaswidth = rect.width
const canvasheight =innerHeight-rect.bottom//-(menuobj.offsetTop*3)
//console.log(rect)

const canvasdiv = document.querySelector('#canvascell');

import * as THREE from 'https:/unpkg.com/three@0.126.1/build/three.module.js'
import  { OrbitControls } from 'https:/unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'
import { gsap } from 'https://unpkg.com/gsap@3.9.1/gsap-core.js'

const raycaster = new THREE.Raycaster()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75,canvaswidth/canvasheight,0.1,1000)
const renderer = new THREE.WebGLRenderer({
  alpha: true//with canvas probably works
})
scene.background = new THREE.Color(0x000000);

//textureloader

const textureloader = new THREE.TextureLoader()
const normaltexture = textureloader.load("../textures/normalmap/nmap4.jpeg");



//sphere

const sphereGeometry = new THREE.SphereBufferGeometry(2,64,64)
const material = new THREE.MeshStandardMaterial({color: 0x00ffff})
material.metalness =0.7
material.roughness =0.2
material.normalMap = normaltexture



const mesh = new THREE.Mesh(sphereGeometry,material)
scene.add(mesh)

//simple box
//const boxGeometry = new THREE.BoxGeometry(2,1,1)
//const material = new THREE.MeshPhongMaterial({color: 0x00ff00,flatShading: THREE.FlatShading} );
//const material = new THREE.MeshBasicMaterial({color: 0x00ff00})
//const mesh = new THREE.Mesh(boxGeometry,material)
//scene.add(mesh)

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


  document.addEventListener('mousemove',onDocumentMouseMove)
let mousex =0;
let mousey=0;
let targetx =0;
let targety = 0;

const windowx = window.innerWidth/2;
const windowy = window.innerHeight/2;

function onDocumentMouseMove(event){
mousex = (event.clientX-windowx)
mousey = (event.clientY-windowy)

}

function animate(){

    targetx =mousey*.005
    targety =mousex*.005

    requestAnimationFrame(animate)
    renderer.render(scene,camera)
   

    mesh.rotation.x +=1*(targetx-mesh.rotation.x)
    mesh.rotation.y +=1*(targety-mesh.rotation.y)

    //mesh.rotation.x +=0.01
    //mesh.rotation.y +=0.01
}

animate()



