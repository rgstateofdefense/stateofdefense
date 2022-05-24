import * as THREE from 'https:/unpkg.com/three@0.126.1/build/three.module.js'
import { gsap } from 'https://unpkg.com/gsap@3.9.1/gsap-core.js'
import * as animationManager from '../../animationmanager.js'
import * as threeengine from '../../3dengine.js'

let objsexists = false;
function sceneexist(){
    return objsexists;
}export { sceneexist};

async function build(hideit)
{
    const scene = threeengine.getscene();
    if(objsexists) return;

    //code goes here-----------------------
    const textureloader = new THREE.TextureLoader();
    const uctexttexture = textureloader.load("./textures/texture/uc.png");
    const constructiontablematerial = new THREE.MeshStandardMaterial({
        color: 0xffff00,
        map: uctexttexture,
        metalness: 0.6,
        roughness: 0.4
    })
    

    const constructionlable = new THREE.BoxGeometry(3,0.6,0.01);
    //const  constructiontablematerial = new THREE.MeshPhongMaterial({color: flatShading: THREE.FlatShading} );
    const  constructiontablemesh = new THREE.Mesh(constructionlable,constructiontablematerial)
    constructiontablemesh.name ="constructiontable";
    scene.add( constructiontablemesh);
    constructiontablemesh.position.set(0,2,0.5);

    const constructionlight = new THREE.AmbientLight( 0xff0000 ,1); // white light
    constructionlight.name ="constructionlight";
    //scene.add( constructionlight );
    //-------------------------------------
    //timelinedebg-------------------------
    //animationManager.createtimeline("underconstruction");
    //const customtimeline = animationManager.gettimeline("underconstruction");
    //const name = customtimeline.getname();
    //console.log(name);

    
    
    //playanimation("underconstruction","showlabel",0);
    
    //customtimeline.clear();
    //-------------------------------------
    if(hideit) objsexists = true;
}export { build};


const workobjs = ["constructiontable","constructionlight"]; 
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
        if(typeof obj!=='undefined') obj.visible = true;
    }
}export { show};

function playanimation(timelinename,animationname,setdelay){
    const scene = threeengine.getscene();
    if(animationname =="showlabel")
    {
        const timeline = animationManager.gettimeline(timelinename);
        timeline.addanimation("showlabel",showlabel);
        timeline.startanimationchain();
    }
    if(animationname =="hidelabel")
    {
        const timeline = animationManager.gettimeline(timelinename);
        timeline.addanimation("hidelabel",hidelabel);
        timeline.startanimationchain();
        //customtimeline.addanimationtopool("hidelabel",hidelabel);
    }
}export { playanimation};

function showlabel(timeline){
    const scene = threeengine.getscene();
    var constructionlable = scene.getObjectByName("constructiontable");
    timeline.to(constructionlable.position,{duration:1.5,y:0,ease:"back"});
    timeline.to(constructionlable.rotation,{duration:1.5,z:0.1},"<");
}

function hidelabel(timeline){
    const scene = threeengine.getscene();
    var constructionlable = scene.getObjectByName("constructiontable");
    timeline.to(constructionlable.position,{duration:0.7,y:2});
    timeline.to(constructionlable.rotation,{duration:0.3,z:0.1},"<");
}

let controctionactive = false;
const unfinishedrooms =["duelroom","marketroom"];
function underconstructioncheck(roomname){
   
    const ucroom = unfinishedrooms.includes(roomname);
    if(!ucroom && controctionactive){
        playanimation("maintimeline","hidelabel",0);
        controctionactive = false;
    }
    if(ucroom && !controctionactive){
        playanimation("maintimeline","showlabel",0);
        controctionactive = true;
    }
}export { underconstructioncheck};
