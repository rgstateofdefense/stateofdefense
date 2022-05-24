import * as THREE from 'https:/unpkg.com/three@0.126.1/build/three.module.js'
import { gsap } from 'https://unpkg.com/gsap@3.9.1/gsap-core.js'
import * as animationManager from '../../animationmanager.js'
import * as threeengine from '../../3dengine.js'
import {enablecontrol, disablecontrol} from  '../../controlhandler.js'
import {addeventlisteners} from  '../../whitepaperjs/whitepaper.js'
//import * as whitepaperjs from '../../whitepaper.js'

let objsexists = false;
function sceneexist(){
    return objsexists;
}export { sceneexist};

async function build(hideit)
{
 
    const scene = threeengine.getscene();
    if(objsexists) return;
    
    //code goes here-----------------------
    const whitepaperLayer = document.querySelector('#whitepaperLayer');
    fetch("wpp/whitepaper.html")
    .then((response) => response.text())
    .then((html) => {
        whitepaperLayer.innerHTML = html;
        addeventlisteners();
    })
    .catch((error) => {
        console.warn(error);
    });
    whitepaperLayer.style.opacity = 0;
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
    const timeline = animationManager.gettimeline("layoutscreentimeline");
    timeline.addcommandtoanimation("hidewhitepaperlayer",false,hidewhitepaperlayer,[]);
    timeline.addanimation("hidewhitepaperlayer",fadeoutlayer);
    timeline.startanimationchain();
    enablecontrol();
    document.getElementById("nftbutton").style.color = "#ffffff"; 
    //document.getElementById("marketbutton").style.color = "#ffffff"; 
    //document.getElementById("duelbutton").style.color = "#ffffff"; 
    document.getElementById("warbutton").style.color = "#ffffff";
    document.getElementById("nftbutton").style.pointerEvents = 'auto'; 
    //document.getElementById("marketbutton").style.pointerEvents = 'auto'; 
    //document.getElementById("duelbutton").style.pointerEvents = 'auto'; 
    document.getElementById("warbutton").style.pointerEvents = 'auto';

}export { hide};
function show()
{   
    const timeline = animationManager.gettimeline("layoutscreentimeline");
    timeline.addanimation("fadeinlayer",fadeinlayer);
    timeline.startanimationchain();
    disablecontrol();
    document.getElementById("nftbutton").style.color = "#666666"; 
    document.getElementById("marketbutton").style.color = "#666666"; 
    document.getElementById("duelbutton").style.color = "#666666"; 
    document.getElementById("warbutton").style.color = "#666666"; 
    document.getElementById("nftbutton").style.pointerEvents = 'none'; 
    document.getElementById("marketbutton").style.pointerEvents = 'none'; 
    document.getElementById("duelbutton").style.pointerEvents = 'none'; 
    document.getElementById("warbutton").style.pointerEvents = 'none'; 


    const whitepaperLayer = document.querySelector('#whitepaperLayer');
    whitepaperLayer.style.width = '100%';
    whitepaperLayer.style.height = '99.5%';
}export { show};

function playanimation(timelinename,animationname,setdelay){

    if(animationname =="a")
    {
       
    }
    if(animationname =="b")
    {
       
    }
}export { playanimation};

function fadeoutlayer(timeline){
    const whitepaperLayer = document.querySelector('#whitepaperLayer');
    timeline.to(whitepaperLayer.style,{duration:0.5,opacity: 0.0});
    //layoutLayer.style.opacity = 0.5;

}
function fadeinlayer(timeline){
    const whitepaperLayer = document.querySelector('#whitepaperLayer');
    timeline.to(whitepaperLayer.style,{duration:0.5,opacity: 0.93});
    //layoutLayer.style.opacity = 0.5;

}


function hidewhitepaperlayer(){
    const whitepaperLayer = document.querySelector('#whitepaperLayer');
    whitepaperLayer.style.width = '0%';
    whitepaperLayer.style.height = '0%';

}


