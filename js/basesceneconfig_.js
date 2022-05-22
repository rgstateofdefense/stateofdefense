import * as THREE from 'https:/unpkg.com/three@0.126.1/build/three.module.js'
import * as threeengine from '../3dengine.js'


let objsexists = false;
function sceneexist(){
    return objsexists;
}export { sceneexist};

async function build(hideit)
{
    const scene = threeengine.getscene();
    if(objsexists) return;

    //code goes here-----------------------

    
    //-------------------------------------
    if(hideit) hide();
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

function playanimation(timelinename,animationname,setdelay){

    if(animationname =="a")
    {
       
    }
    if(animationname =="b")
    {
       
    }
}export { playanimation};

function sampleanimfunc(timeline){
    
}


