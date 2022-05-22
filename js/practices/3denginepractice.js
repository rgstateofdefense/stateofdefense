//import gsap from 'gsap'
import * as THREE from 'https:/unpkg.com/three@0.126.1/build/three.module.js'
import  { OrbitControls } from 'https:/unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'
import { gsap } from '../node_modules/gsap/gsap-core.js'

//console.log(gsap)

const raycaster = new THREE.Raycaster()
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000)
const renderer = new THREE.WebGLRenderer()

//simple box
/*
const boxGeometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color: 0x00ff00})
const mesh = new THREE.Mesh(boxGeometry,material)
scene.add(mesh)
*/

//plane
const planegeometry = new THREE.PlaneGeometry( 19, 19,70,70 );
//const planematerial = new THREE.MeshBasicMaterial( {color: 0xff0000, side: THREE.DoubleSide} );
const planematerial = new THREE.MeshPhongMaterial({//color: 0xff0000,
  side: THREE.DoubleSide,flatShading: THREE.FlatShading,vertexColors: true} );

    const planemesh = new THREE.Mesh(planegeometry,planematerial)
scene.add(planemesh)
//planemesh.geometry.dispose()
//console.log(planemesh.geometry.attributes.position.array)

//vertice position randomization

const { array } = planemesh.geometry.attributes.position

for(let i=0;i<array.length;i+=3){
  const x = array[i]
  const y = array[i+1]
  const z = array[i+2]
  array[i] =x+Math.random()*0.2
  array[i+2] =z+Math.random()*0.6
}

//planemesh.geometry.attributes.position

const colors = []
for(let i=0;i<planemesh.geometry.attributes.position.count;i++){

  colors.push(0,.19,0)


}


planemesh.geometry.setAttribute('color',new THREE.BufferAttribute(new Float32Array(colors),3))


//directional light
const light = new THREE.DirectionalLight(0xffffff,1)
light.position.set(0,0,1)
scene.add(light)

function init3dengine() {   
  renderer.setSize(innerWidth,innerHeight)
  renderer.setPixelRatio(devicePixelRatio)
  const canvasdiv = document.querySelector('#canvascell');
  canvasdiv.appendChild(renderer.domElement);
  //document.body.appendChild(renderer.domElement)
  
  camera.position.z = 5

//moving the camera
new OrbitControls(camera,renderer.domElement)

}

  export { init3dengine };


//control

const mouse ={

  x: undefined,
  y: undefined
}



  function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
  
    raycaster.setFromCamera(mouse,camera)
    const intersects = raycaster.intersectObject(planemesh)
    if(intersects.length>0){
const { color } = intersects[0].object.geometry.attributes

      color.setX(intersects[0].face.a,0)
      color.setY(intersects[0].face.a,0.49)
      color.setZ(intersects[0].face.a,0.10)

      color.setX(intersects[0].face.b,0)
      color.setY(intersects[0].face.b,0.49)
      color.setZ(intersects[0].face.b,0.10)

      color.setX(intersects[0].face.c,0)
      color.setY(intersects[0].face.c,0.49)
      color.setZ(intersects[0].face.c,0.10)
      color.needsUpdate = true

      const initialColor = {
          r: 0,
          g: 0.19,
          b: 0
      }

      const hoverColor = {
        r: 0,
        g: 0.89,
        b: 0.10
      }

      gsap.to(hoverColor, {
        r: initialColor.r,
        g: initialColor.g,
        b: initialColor.b,
        duration:3,
        onUpdate: () => {
          color.setX(intersects[0].face.a,hoverColor.r)
          color.setY(intersects[0].face.a,hoverColor.g)
          color.setZ(intersects[0].face.a,hoverColor.b)

          color.setX(intersects[0].face.b,hoverColor.r)
          color.setY(intersects[0].face.b,hoverColor.g)
          color.setZ(intersects[0].face.b,hoverColor.b)

          color.setX(intersects[0].face.c,hoverColor.r)
          color.setY(intersects[0].face.c,hoverColor.g)
          color.setZ(intersects[0].face.c,hoverColor.b)
        }

      })

    }
  //mesh.rotation.x +=0.01
  //mesh.rotation.y +=0.01
  //planemesh.rotation.x +=0.01
  //planemesh.rotation.y +=0.01
}

animate()




addEventListener('mousemove',(event)=>{
  mouse.x = (event.clientX/innerWidth)*2-1
  mouse.y = -(event.clientY/innerHeight)*2+1

})