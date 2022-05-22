import * as THREE from 'https:/unpkg.com/three@0.126.1/build/three.module.js'
import { gsap } from 'https://unpkg.com/gsap@3.9.1/gsap-core.js'
import * as animationManager from '../animationmanager.js'
import * as threeengine from '/js/3dengine.js'
import * as Functions from '/js/functions.js'

let objsexists = false;
function sceneexist(){
    return objsexists;
}export { sceneexist};

async function build()
{
    const scene = threeengine.getscene();
    if(objsexists) return;

    //code goes here-----------------------
    
    //-------------------------------------
    objsexists = true;
}export { build};


const workobjs = []; 
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

function playanimation(animationname,setdelay){
    const scene = threeengine.getscene();
    if(animationname =="downlabel")
    {
       
    }
    if(animationname =="uplabel")
    {
       
    }
}export { playanimation};


