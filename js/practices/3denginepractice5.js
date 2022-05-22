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

const torusgeometry = new THREE.TorusGeometry(.7,.2,32,100)
//const material = new THREE.MeshPhongMaterial({color: 0xffffff,flatShading: THREE.FlatShading} );
const particlematerial = new THREE.PointsMaterial({
  color: 0xffffff, 
  transparent: true,
  size: 0.005

});


const textureloader = new THREE.TextureLoader()
const starimage = textureloader.load("../textures/texture/star.png");
const particlematerial2 = new THREE.PointsMaterial({
  map: starimage, 
  transparent: true,
  size: 0.2,
  depthWrite: false
  //color: 'blue',
  //blending: THREE.AdditiveBlending

});

const mesh = new THREE.Points(torusgeometry,particlematerial)
scene.add(mesh)


const particlesgeometry = new THREE.BufferGeometry;
const particlescnt = 500;

const posarray = new Float32Array(particlescnt*3);
for(let i=0;i<particlescnt*3;i++){
  posarray[i] = (Math.random()-0.5)* (Math.random()*6);
}

particlesgeometry.setAttribute('position',new THREE.BufferAttribute(posarray,3))

const patricle = new THREE.Points(particlesgeometry,particlematerial2)
scene.add(patricle)

//simple box
/*
const boxGeometry = new THREE.BoxGeometry(1,1,2)
const material = new THREE.MeshPhongMaterial({color: 0x00ff00,flatShading: THREE.FlatShading} );
//const material = new THREE.MeshBasicMaterial({color: 0x00ff00})
const mesh = new THREE.Mesh(boxGeometry,material)
scene.add(mesh)
*/

const light = new THREE.DirectionalLight(0xffffff,1)
light.position.set(0,0,1)
scene.add(light)


function init3dengine() {  
    
    
    
    //const canvasdivwidth = canvasdiv.offsetWidth;
    //const canvasdivy = canvasdiv.offsetWidth;
    
    renderer.setSize(canvaswidth,canvasheight)
    renderer.setPixelRatio(devicePixelRatio)
    //renderer.setClearColor(new THREE.Color('#ff0000'),1)
    renderer.setClearColor(new THREE.Color('#ff0000'),1)

    canvasdiv.appendChild(renderer.domElement);
    //document.body.appendChild(renderer.domElement)
    
    camera.position.z = 1.5
  }
  export { init3dengine };


document.addEventListener('mousemove',animateparticles)
let mousex=0
let mousey=0

function animateparticles(event){
mousex = event.clientX
mousey = event.clientY
}


const clock = new THREE.Clock()
function animate(){
    const elapsedtime = clock.getElapsedTime()
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
    //mesh.rotation.x +=0.01
    mesh.rotation.y +=0.01

    if(mousex>0){
    patricle.rotation.x = mousey*(elapsedtime*0.0008)
    patricle.rotation.y = mousex*(elapsedtime*0.0008)
    }
}

animate()