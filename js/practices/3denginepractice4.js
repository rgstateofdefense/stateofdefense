const menuobj = document.querySelector('#menu');
const rect = menuobj.getBoundingClientRect()
const canvaswidth = rect.width
const canvasheight =innerHeight-rect.bottom//-(menuobj.offsetTop*3)

const canvasdiv = document.querySelector('#canvascell');

import * as THREE from 'https:/unpkg.com/three@0.126.1/build/three.module.js'
//import  { OrbitControls } from 'https:/unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'
import { gsap } from 'https://unpkg.com/gsap@3.9.1/gsap-core.js'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75,canvaswidth/canvasheight,0.1,1000)
const renderer = new THREE.WebGLRenderer()
scene.background = new THREE.Color(0x000000);

const textureloader = new THREE.TextureLoader()
const planegeometry = new THREE.PlaneBufferGeometry(1,1.3)

for(let i=0;i<4;i++){
  const material = new THREE.MeshBasicMaterial({
    map: textureloader.load('../images/'+i+'.jpg')
  })
  const img  = new THREE.Mesh(planegeometry,material)
  img.position.set(1,i*1.8)
  scene.add(img)
}

let objs = []

scene.traverse((object) =>{

  if(object.isMesh) objs.push(object) 

})

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
    
    canvasdiv.appendChild(renderer.domElement);
    //document.body.appendChild(renderer.domElement)
    
    camera.position.z = 1.5

    
  }
  export { init3dengine };

  window.addEventListener('wheel',onMouseWheel)
  let wheelY = 0
  let position = 0
  function onMouseWheel(event){
    wheelY = event.deltaY*0.001
  }

  const mouse = new THREE.Vector2()
  window.addEventListener('mousemove',(event)=>{
    mouse.x = (event.clientX/innerWidth)*2-1
    mouse.y = -(event.clientY/innerHeight)*2+1
  })


  const raycaster = new THREE.Raycaster()



function animate(){
    
    renderer.render(scene,camera)
    position+= wheelY
    camera.position.y = position
    wheelY*=0.9

    //raycaster
    raycaster.setFromCamera(mouse,camera)
    const intersects = raycaster.intersectObjects(objs)
    for(const intersect of intersects){
      //intersect.object.scale.set(1.2,1.2)
      gsap.to(intersect.object.scale,{x:1.7,y: 1.7})
      gsap.to(intersect.object.rotation,{y:-0.1})
      gsap.to(intersect.object.position,{z:-2})
    }
    for(const object of objs){
      if(!intersects.find(intersect => intersect.object === object)){
        gsap.to(object.scale,{x:1,y: 1})
        gsap.to(object.rotation,{y:0})
        gsap.to(object.position,{z:0})

      }

    }
    requestAnimationFrame(animate)
}

animate()