import * as THREE from 'https:/unpkg.com/three@0.126.1/build/three.module.js'
import { gsap } from 'https://unpkg.com/gsap@3.9.1/gsap-core.js'
import * as Loadingmanager from '/js/loadingmanager.js'
import * as animationManager from '/js/animationmanager.js'
import * as threeengine from '/js/3dengine.js'

let objsexists = false;
function sceneexist(){
    return objsexists;
}export { sceneexist};

async function build(hideit)
{
    const scene = threeengine.getscene();
    if(objsexists) return;

    const textureloader = new THREE.TextureLoader();
    const doorbasetexture = textureloader.load("./textures/texture/Sci-fi_Door_001_basecolorIIp.png");
    const dooralphatexture = textureloader.load("./textures/normalmap/Sci-fi_Door_001_basecolorIIalphap.png");
    
    const wallpanelbasetexture = textureloader.load("./textures/texture/Metal_Plate_018_basecolor.jpg");
    const wallpanelalphatexture = textureloader.load("./textures/normalmap/Metal_Plate_018_normal.jpg");

    const screendoormaterial = new THREE.MeshStandardMaterial({
        color: 'white',
        map: doorbasetexture,
        metalness: 0.6,
        roughness: 0.4,
        normalMap: dooralphatexture
    })


    const wallpanelmaterial = new THREE.MeshStandardMaterial({
        color: 'white',
        map: wallpanelbasetexture,
        metalness: 0.7,
        roughness: 0.4,
        normalMap: wallpanelalphatexture
    })


    const downdoor = await Loadingmanager.loadgltf("./models/screendoordown.glb")
    downdoor.name = "downdoor";
    downdoor.traverse ( ( o ) => { if ( o.isMesh ) {
          o.material = screendoormaterial;
        }
    });
    const updoor = await Loadingmanager.loadgltf("./models/screendoorup.glb")
    updoor.name = "updoor";
    updoor.traverse ( ( o ) => { if ( o.isMesh ) {
        o.material = screendoormaterial;
      }
    });

    const wallpanelleft1 = await Loadingmanager.loadgltf("./models/wallpanel.glb")
    wallpanelleft1.name = "wallpanelleft1";
    wallpanelleft1.traverse ( ( o ) => { if ( o.isMesh ) {
        o.material = wallpanelmaterial;
      }
    });
    wallpanelleft1.position.set(-4.16,0,0.01);

    const wallpanelright1 = await Loadingmanager.loadgltf("./models/wallpanel.glb");
    wallpanelright1.name = "wallpanelright1";
    wallpanelright1.traverse ( ( o ) => { if ( o.isMesh ) {
        o.material = wallpanelmaterial;
      }
    });
    wallpanelright1.position.set(4.16,0,0.01);
   

    const baseamblight = new THREE.AmbientLight( 0xffffff ,1); // white light
    baseamblight.name = "baseamblight";
    scene.add( baseamblight );

    const metalsparklelight = new THREE.DirectionalLight(0x555555,0.8)
    metalsparklelight.name = "metalsparklelight";
    metalsparklelight.position.set(-0.5,0,1)
    //metalsparklelight.castShadow = true; // default false
    scene.add(metalsparklelight)
    
    if(hideit) hide();
    objsexists = true;
}export { build};


const workobjs = ["downdoor", "updoor","wallpanelleft1","wallpanelright1"]; 
//const workobjs = ["downdoor", "updoor", "baseamblight","metalsparklelight","wallpanelleft1","wallpanelright1"]; 

function clear()
{
    const scene = threeengine.getscene();
    for (let i = 0; i < workobjs.length; i++) { 
        var obj = scene.getObjectByName(workobjs[i]);
        if(typeof obj!=='undefined') scene.remove(obj);
    }
    objsexists = false;
}export { clear};
function hide()
{
    const scene = threeengine.getscene();
    for (let i = 0; i < workobjs.length; i++) {
        const obj = scene.getObjectByName(workobjs[i]);
        if(typeof obj!=='undefined') obj.visible = false;
    }
}export { hide};
function show()
{
    const scene = threeengine.getscene();
    for (let i = 0; i < workobjs.length; i++) {
        const obj = scene.getObjectByName(workobjs[i]);
        if(typeof obj!=='undefined')  obj.visible = true;
    }
}export { show};

function playanimation(timelinename,animationname,setdelay){
    if(animationname =="open") {
        const timeline = animationManager.gettimeline(timelinename);
        timeline.addanimation("open",open);
        timeline.addcommandtoanimation("open",false,hide,[]);
        timeline.startanimationchain();
        //animationManager.commandtoanimpoolelement(timelinename,"open",false,hide,[]);
        //animationManager.addanimationtopool(timelinename,"open",open);

    }
    if(animationname =="close"){
        const timeline = animationManager.gettimeline(timelinename);
        timeline.addanimation("close",close);
        timeline.addcommandtoanimation("close",true,show,[]);
        timeline.startanimationchain();
        //animationManager.commandtoanimpoolelement(timelinename,"close",true,show,[]);
        //animationManager.addanimationtopool(timelinename,"close",close);

    }
    //animationManager.startanimationchain("maintimeline");
}export { playanimation};


function updoor(timeline){
    const scene = threeengine.getscene();
    const theupdoor = scene.getObjectByName("updoor");
    timeline.to(theupdoor.position,{duration:1.5,y:2.1});

}

function downdoor(timeline){
    const scene = threeengine.getscene();
    const thedowndoor = scene.getObjectByName("downdoor");
    timeline.to(thedowndoor.position,{duration:1.5,y:-2.1},"<");
}


function open(timeline){
    
    const scene = threeengine.getscene();
    var updoor = scene.getObjectByName("updoor");
    var downdoor = scene.getObjectByName("downdoor");

    timeline.to(updoor.position,{duration:1.5,y:2.1});
    timeline.to(downdoor.position,{duration:1.5,y:-2.1},"<");
    const camera = threeengine.getcameragroup();
    timeline.to(camera.position,{x:0,y:0,z:-2,duration:2,delay:0.2},"<+0.2");
} 

function close(timeline){
    const scene = threeengine.getscene();
    var updoor = scene.getObjectByName("updoor");
    var downdoor = scene.getObjectByName("downdoor");

    timeline.to(updoor.position,{duration:1.5,y:0});
    timeline.to(downdoor.position,{duration:1.5,y:0},"<");
    const camera = threeengine.getcameragroup();
    timeline.to(camera.position,{x:0,y:0,z:2.2,duration:2},"<");
    timeline.to(camera.rotation,{x:0,y:0,z:0,duration:2},"<");
}


function call1(){
    console.log("call1 called");
}

function call2(){
    console.log("call2 called");
}