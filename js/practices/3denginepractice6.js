const menuobj = document.querySelector('#menu');
const rect = menuobj.getBoundingClientRect()
const canvaswidth = rect.width
const canvasheight =innerHeight-rect.bottom//-(menuobj.offsetTop*3)

const canvasdiv = document.querySelector('#canvascell');

//import * as THREE from 'https:/unpkg.com/three@v0.137.5/build/three.module.js'
import * as THREE from 'https:/unpkg.com/three@0.126.1/build/three.module.js'
import  { OrbitControls } from 'https:/unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'
import { gsap } from 'https://unpkg.com/gsap@3.9.1/gsap-core.js'
import  { GLTFLoader } from 'https:/unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js' 

const raycaster = new THREE.Raycaster()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75,canvaswidth/canvasheight,0.1,1000)
const renderer = new THREE.WebGLRenderer()
scene.background = new THREE.Color(0x000000);



const gltfloader = new GLTFLoader()

var model;

gltfloader.load('../models/onetank.glb',(gltf) =>{
scene.add(gltf.scene)
model = gltf.scene;

//gltf.scene.scale.set(5,5,5)
console.log("tank added")
})

//simple box
/*
const boxGeometry = new THREE.BoxGeometry(1,1,1)
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
    
    canvasdiv.appendChild(renderer.domElement);
    //document.body.appendChild(renderer.domElement)
    
    camera.position.z = 500
  }
  export { init3dengine };

function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
    //mesh.rotation.x +=0.01
    //mesh.rotation.y +=0.01
    if (model) 
    {
      model.rotation.y += 0.01;
      //var selectedObject = scene.getObjectByName(object.name);
      //scene.remove( model );
    }
}

animate()