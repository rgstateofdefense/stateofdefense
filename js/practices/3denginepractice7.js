const menuobj = document.querySelector('#menu');
const rect = menuobj.getBoundingClientRect()
const canvaswidth = rect.width
const canvasheight =innerHeight-rect.bottom//-(menuobj.offsetTop*3)

const canvasdiv = document.querySelector('#canvascell');

//import * as THREE from 'https:/unpkg.com/three@v0.137.5/build/three.module.js'
import * as THREE from 'https:/unpkg.com/three@0.126.1/build/three.module.js'
import  { OrbitControls } from 'https:/unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'
import { gsap } from 'https://unpkg.com/gsap@3.9.1/gsap-core.js'

//read text from file
const data = await fetch('../shaders/atmosvhader.glsl');
const vshader = await data.text();
console.log(vshader);

const data2 = await fetch('../shaders/atmosfhader.glsl');
const fshader = await data2.text();
console.log(fshader);


const data3 = await fetch('../shaders/outatmovertex.glsl');
const outatmovertex = await data3.text();
console.log(outatmovertex);

const data4 = await fetch('../shaders/outatmoshader.glsl');
const outatmoshader = await data4.text();
console.log(outatmoshader);



const raycaster = new THREE.Raycaster()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75,canvaswidth/canvasheight,0.1,1000)
const renderer = new THREE.WebGLRenderer({
  antialias: true

})
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
const earthtexture = textureloader.load("../textures/texture/earth.jpg");

const spheregeometry = new THREE.SphereGeometry(5,50,50)
const spherematerial = new THREE.ShaderMaterial({
  vertexShader: vshader,
  fragmentShader: fshader,
  uniforms: {
    globeTexture:{
      value: new THREE.TextureLoader().load('../textures/texture/earth.jpg')
    }
  }

});
const sheremesh = new THREE.Mesh(spheregeometry,spherematerial)
scene.add(sheremesh)



const atmogeometry = new THREE.SphereGeometry(5,50,50)
const atmomaterial = new THREE.ShaderMaterial({
  vertexShader: outatmovertex,
  fragmentShader: outatmoshader,
  blending: THREE.additiveBlending,
  side: THREE.BackSide
});
const atmomesh = new THREE.Mesh(atmogeometry,atmomaterial)
atmogeometry.scale(1.2,1.2,1.2)
scene.add(atmomesh)



const stargeometry = new THREE.BufferGeometry()
const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff
})


const starVertices = []
for(let i=0;i<1000;i++){
  const x = (Math.random()-0.5)*2000
  const y = (Math.random()-0.5)*2000
  const z = -Math.random()*2000
  starVertices.push(x,y,z)
}

stargeometry.setAttribute('position',new THREE.Float32BufferAttribute(starVertices,3))


const stars = new THREE.Points(stargeometry,starMaterial)
scene.add(stars)


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
    
    camera.position.z = 10
  }
  export { init3dengine };

function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
    sheremesh.rotation.y +=0.001
    //mesh.rotation.y +=0.01
}

animate()