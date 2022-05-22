console.log("3d engine started");
const canvasdiv = document.querySelector('#canvasdiv');
const canvaswidth = canvasdiv.clientWidth;
const canvasheight =canvasdiv.clientHeight;

let startcamerapos = new THREE.Vector3(0,0,2.2);
let startcameraangle =new THREE.Vector3(0,0,0);

//imports
import * as THREE from 'https:/unpkg.com/three@0.126.1/build/three.module.js'
import  Stats from  'https:/unpkg.com/three@0.126.1/examples/jsm/libs/stats.module.js'
import { EffectComposer } from 'https:/unpkg.com/three@0.126.1/examples/jsm/postprocessing/EffectComposer.js';
import  { OrbitControls } from 'https:/unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'
//import  { GLTFLoader } from 'https:/unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js' 
import { FlyControls } from 'https:/unpkg.com/three@0.126.1/examples/jsm/controls/FlyControls'


//init 3d engine
const manager = new THREE.LoadingManager();

const scene = new THREE.Scene();

/*
const frustumSize = 3;
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.OrthographicCamera( 
    frustumSize * aspect / - 2,
    frustumSize * aspect / 2, 
    frustumSize / 2, 
    frustumSize / - 2,
    0.1, 1000 );
    */
const camera = new THREE.PerspectiveCamera(75,canvaswidth/canvasheight,0.1,1000);
camera.name = "mastercamera";
const cameragroup = new THREE.Group();
cameragroup.name = "cameragroup";
cameragroup.add(camera);
//scene.add(camera);
scene.add(cameragroup);
const renderer = new THREE.WebGLRenderer({antialias: true});
scene.background = new THREE.Color(0x000000);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setSize(canvaswidth,canvasheight);
renderer.setPixelRatio(devicePixelRatio);

renderer.domElement.id = "threedcanvas";
renderer.domElement.style.width = '100%';
renderer.domElement.style.height = '100%';
canvasdiv.appendChild(renderer.domElement);


let composer = new EffectComposer( renderer );

//const result = await Functions.loadtextfile('../shaders/atmosvhader.glsl')
//console.log(result)

//functions
function init3dengine(needflymode,needstats) {  
    if(needflymode) buildflymode(); 
    if(needstats)  buildStats();
    //cameragroup.position.z = 2.2;
    cameragroup.position.set(startcamerapos.x,startcamerapos.y,startcamerapos.z);
    //cameragroup.rotation.set(startcameraangle);



}export { init3dengine };

const mouse = new THREE.Vector2();
  window.addEventListener('mousemove',(event)=>{
    mouse.x = (event.clientX/innerWidth)*2-1;
    mouse.y = -(event.clientY/innerHeight)*2+1;
  })




const basematerial = new THREE.MeshStandardMaterial({
    color: 'red',
    transparent: true,
    opacity:0.01
})

//relativeposition
const relativeposplanegeom = new THREE.PlaneBufferGeometry(2000,2000)
const relativeposplane  = new THREE.Mesh(relativeposplanegeom,basematerial)
relativeposplane.name = "relativeposplane";
relativeposplane.position.set(0,0,0);
relativeposplane.visible = true;
cameragroup.add(relativeposplane);

/*
const hitpositionsphere = new THREE.SphereGeometry(0.01,10,10);
const hitpositionmaterial = new THREE.MeshStandardMaterial({
    color: 'red',
    transparent: true,
    opacity:0.6
})
const hitpositionmesh = new THREE.Mesh(hitpositionsphere,hitpositionmaterial);
hitpositionmesh.name = "hitpositionmesh";
scene.add(hitpositionmesh);
*/
async function getrelativeposition(distance,screenx,screeny){
    const pointer = new THREE.Vector2(screenx,screeny);
    //console.table(pointer);
   
    const obj = cameragroup.getObjectByName("relativeposplane");
    if(typeof obj!=='undefined')
    {
        obj.position.z = distance;
        obj.matrix.setPosition( 0,0,distance );
        obj.updateMatrix();
        await renderer.render(scene,camera);
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(pointer,camera);
        const positionhit = await raycaster.intersectObjects(cameragroup.children);
        if(positionhit.length>0)
        {
            //hitpositionmesh.position.set(positionhit[0].point.x,positionhit[0].point.y,positionhit[0].point.z);
            const hp = positionhit[0].point; 
            //let relpos = new THREE.Vector3(hp.x-rp.x,hp.y-rp.y,hp.z-rp.z);
            camera.worldToLocal(hp);
            return hp;
    
        }
    }
    console.log("relativeplane is undefined");
    return [100,100,100];

}export { getrelativeposition };




var iscameralocked = false;
let cameralocktarget;
//external functions

function cleantewholescene() {
    while(scene.children.length > 0){ scene.remove(scene.children[0]); }
}export { cleantewholescene };


function getcamera()
{
    return camera;
}export { getcamera };
function unlockcameralook(){
    iscameralocked = false;
}export { unlockcameralook };
function lockcameraonobject(objname){
    var obj = scene.getObjectByName(objname);
    if(typeof obj!=='undefined'){
        
        iscameralocked = true;
        cameralocktarget =obj;
    }
}export { lockcameraonobject };
function getscene()
{
    return scene;
}export { getscene };
function getrenderer()
{
    return renderer;
}export { getrenderer };

function getcomposer(){
    return composer;
}export { getcomposer };



function getcameragroup()
{
    return cameragroup;
}export { getcameragroup };
function addtocameragroup(object)
{
    if(typeof object=='string') {
        const obj = scene.getObjectByName(object);
        if(typeof obj!=='undefined') cameragroup.add(obj);
    }
    else if(typeof object=='object') cameragroup.add(object);
}export { addtocameragroup };

function removefromcameragroup(name)
{
    const obj = cameragroup.getObjectByName(name);
    if(typeof obj!=='undefined') cameragroup.remove(obj);
}export { removefromcameragroup };

function setbackgroungcolor(backgroundcolor){
    scene.background = new THREE.Color(backgroundcolor);
}export { setbackgroungcolor };

function getrenderareasize(){
    return THREE.Vector2(canvaswidth,canvasheight);
}export { getrenderareasize };
function getcameraposition(x,y,z){
    return cameragroup.position;
    //camera.position.set(x,y,z);
}export { getcameraposition };
function setcameraposition(x,y,z){
    cameragroup.position.set(x,y,z);
    //camera.position.set(x,y,z);
}export { setcameraposition };
function setcamerarotation(x,y,z){
    camera.rotation.set(x,y,z);
}export { setcamerarotation };
function setcamerafov(val){
    camera.fov = val;
    camera.updateProjectionMatrix();
}export { setcamerafov };
//internaplfunctions



//testfunctions,ddebugfunctions,vars and calls
var flymode = false;
var showstats = false;
var controls;

function buildflymode(){
    //cameragroup.isPerspectiveCamera = true;
    //controls = new OrbitControls(cameragroup,renderer.domElement);
    
    //controls.addEventListener( 'change', renderer );
    //controls.enableDamping = true;
    
    controls = new FlyControls( cameragroup, renderer.domElement );
    controls.movementSpeed = 30;
    controls.rollSpeed = Math.PI / 6;
    controls.autoForward = false;
    controls.dragToLook = true;
    
    flymode = true;
}
var stats;
function buildStats() {
    stats = new Stats();
    stats.setMode(0);

 

    document.body.appendChild( stats.domElement );
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '50%';
    stats.domElement.style.top = '1%';
    showstats = true;
}


manager.onProgress = function (item, loaded, total) {
    console.log(item, loaded, total);
};
manager.onLoad = function () {
    console.log('all items loaded');
};
//---------------------------

let callfunctionlist = {};
var now,delta,then = Date.now();
var interval = 1000/30;


var dt=1000/60;
var timeTarget=0;

function loop(){
    
    if(Date.now()>=timeTarget){

        if (flymode) controls.update(0.01);
        if(showstats) stats.update();
        for (const [key, calledfunction] of Object.entries(callfunctionlist)) {
            calledfunction();
        }
        renderer.render(scene,camera);
    
        timeTarget+=dt;
        if(Date.now()>=timeTarget){
          timeTarget=Date.now();
        }
      }
    
    
    requestAnimationFrame(loop);



    
    /*
    if(iscameralocked){
        camera.lookAt(cameralocktarget.position);
    }
    */
    //debugcalls
    /*
    
    now = Date.now();
    delta = now - then;
    let nowreset = false;
    for (const [key, calledfunction] of Object.entries(callfunctionlist)) {
        if(calledfunction.isanimloop){
           
            //update time dependent animations here at 30 fps
            if (delta > interval) {
                calledfunction();
                
            }
        }
        else calledfunction();

    }
    if(nowreset) then = now - (delta % interval);
    */


    //console.log(cameragroup.rotation);
}
loop();
console.log("3dengine built");

function addloopfunction(name,loopfunction,animloop){
    //loopfunction.isanimloop = animloop;
    callfunctionlist[name] = loopfunction;
    //console.log(loopfunction.isanimloop);

}export { addloopfunction };
function removeloopfunction(name){
    delete callfunctionlist[name];
}export { removeloopfunction };

function performancetweaker(){



}


