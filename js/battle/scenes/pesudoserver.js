import * as THREE from 'https:/unpkg.com/three@0.126.1/build/three.module.js'
import * as threeengine from '../../3dengine.js'
import * as Path from 'https://unpkg.com/pathfinding@0.4.18/visual/lib/pathfinding-browser.min.js'
//this "speudoserver" is only for the tutorial level. 

let enemyfactories = [];
let enemytanks = [];

let playerfactories = [];
let playertanks = [];

let allyfactories = [];
let pallytanks = [];


let objsexists = false;
function sceneexist(){
    return objsexists;
}export { sceneexist};

async function build(hideit)
{
    const scene = threeengine.getscene();
    if(objsexists) return;

    //code goes here-----------------------
    var grid = new PF.Grid(5, 3); 
    var finder = new PF.AStarFinder();
    
    //var path = finder.findPath(1, 2, 4, 2, grid);
    
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

function addnewtank(sender,tank, tankdata){


}


function gettanks(){




}export { gettanks};

function gettankstatuses(){

}export { gettankstatuses};

function settanknewtarget(sender,tank,targetdata){


}export { settanknewtarget};




function startsimulation(){
    start();
    console.log("battlesimulation started");
}export { startsimulation};

function stopsimulation(){
    stop();
    console.log("battlesimulation stopped");
}export { stopsimulation};



var mgrrequestid;
let startTime = 0;

function start() {
    if (!mgrrequestid) {
        mgrrequestid = window.requestAnimationFrame(battleframe);
        startTime = performance.now();
    }
}
function stop() {
    if (mgrrequestid) {
       window.cancelAnimationFrame(mgrrequestid);
       mgrrequestid = undefined;
    }
}




function battleframe(){
    const deltatime = performance.now()- startTime;
    mgrrequestid = undefined;
    //simulationcode-----------


    //-------------------------
    start();
    startTime = performance.now();
}
