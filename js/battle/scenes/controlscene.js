import * as THREE from 'https:/unpkg.com/three@0.126.1/build/three.module.js'
import  { SceneUtils } from 'https:/unpkg.com/three@0.126.1/examples/jsm/utils/SceneUtils.js'
import { SelectionBox } from 'https:/unpkg.com/three@0.126.1/examples/jsm/interactive/SelectionBox.js';
//import { SelectionHelper } from 'https:/unpkg.com/three@0.126.1/examples/jsm/interactive/SelectionHelper.js'


import { SelectionHelper } from '/js/modules/lmselectionhelper.js';
import  { OrbitControls } from '/js/modules/threeobjorbitcontrol.js'
import { perlinnoise } from '/js/modules/perl.js'
import * as threeengine from '/js/3dengine.js'
import * as Gameunctions from '/js/gamefunctions.js'
import {addclickfunction,iskeypressed} from  '/js/controlhandler.js'

import * as tankmanager from  '/js/battle/scenes/tankmanager.js'

const scene = threeengine.getscene();
const camera = threeengine.getcamera();
const renderer = threeengine.getrenderer();

let boundraycastplanes;
var pancontrol;

let basemovespeed = 0.3;

let objsexists = false;
function sceneexist(){
    return objsexists;
}export { sceneexist};

async function build(hideit)
{
  if(objsexists) return;
  const cameragroup = threeengine.getcameragroup();


  pancontrol= new OrbitControls(cameragroup, renderer.domElement) 
  pancontrol.screenSpacePanning = false;
  
  pancontrol.enableDamping = false;
  //pancontrol.dampingFactor = 1;
  pancontrol.enableRotate = false;
  pancontrol.zoomSpeed = 2;

  

/*
  pancontrol.keys = {
    LEFT: 'a', //left arrow
    UP: 'w', // up arrow
    RIGHT: 'd', // right arrow
    BOTTOM: 's' // down arrow
  }
  */
  //pancontrol.listenToKeyEvents(document.body);
  //threeengine.addloopfunction("controlloop",controlloop,true);
  //start();

  //addkeyfunction("a",pankeyupdate,true);
  //addkeyfunction("d",pankeyupdate,true);
  //addkeyfunction("w",pankeyupdate,true);
  //addkeyfunction("s",pankeyupdate,true);
  /*
  addkeyfunction("r",zoomin,true);
  addkeyfunction("f",zoomput,true);
  */
  addclickfunction("ontankclick",clickedontarget);
  boundraycastplanes  = scene.getObjectByName("boundraycastplanes");

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


const camgroup = threeengine.getcameragroup();

function pankeyupdate(key){
  pancontrol.keyupdate(key);
  

}

function setcameratoobject(object){
  const obj = scene.getObjectByName(object);
  if(typeof obj!=='undefined'){
    const objpos = obj.position;
    console.log(objpos);
    const campos = threeengine.getcameraposition();
    threeengine.setcameraposition(campos.x,campos.y,objpos.z+20);
  }
  else console.log("not exist yet");

}export { setcameratoobject};


function movecameratoobject(object){
  const obj = scene.getObjectByName(object);
  if(typeof obj!=='undefined'){
    const objpos = obj.position;
    const campos = threeengine.getcameraposition();
    const newpos =  new THREE.Vector3(campos.x,campos.y,objpos.z+20);
    pancontrol.pantoposition(newpos);
  
  
  }
}export { movecameratoobject};

function setdollyclosestpoint(value){
    pancontrol.setdollyclosestpoint(value);
}export { setdollyclosestpoint};

function setdollyfurthestpoint(value){
  pancontrol.setdollyfurthestpoint(value);
}export { setdollyfurthestpoint};

const raycaster = new THREE.Raycaster();
function checkoutofbounds(pointlist){
  const camera = threeengine.getcamera();
  for (var i = 0; i < pointlist.length; i++) {
    raycaster.setFromCamera(pointlist[i],camera);
    const positionhit = raycaster.intersectObjects(boundraycastplanes.children);
    if(positionhit.length==0){
      return false;
    }
  }
  return true;
}

var mgrrequestid;
function controlloop(){
  mgrrequestid = undefined;
  //pancontrol.update();
  //console.log("got called");
  start();
}

function start() {
  if (!mgrrequestid) {
      mgrrequestid = window.requestAnimationFrame(controlloop);
  }
}
function stop() {
  if (mgrrequestid) {
     window.cancelAnimationFrame(mgrrequestid);
  }
}


function clickedontarget(underelements){
  if(iskeypressed('Alt')){
    if(underelements[1].object.name =="clickplane") tankmanager.setnewmovepoint(underelements[1]); 
    else  tankmanager.setnewtargetpoint(underelements[1]); 
    //console.log(underelements);
  }
  else if(underelements.length>1){
    tankmanager.setselectedtanks(underelements[1].object);
  }

}


//selectionbox
const selectionBox = new SelectionBox( camera, scene );
const helper = new SelectionHelper( selectionBox, renderer, 'selectBox' );

document.addEventListener( 'pointerdown', function ( event ) {
  if(!iskeypressed('Alt')){
    if(event.button == 0){
      tankmanager.clearselectedtanks();
    
    
    
      selectionBox.startPoint.set(( event.clientX / window.innerWidth ) * 2 - 1,
      - ( event.clientY / window.innerHeight ) * 2 + 1,
       0.5 );
    }
  }
});

document.addEventListener( 'pointermove', function ( event ) {
  if ( helper.isDown && !iskeypressed('Alt')) {
    for ( let i = 0; i < selectionBox.collection.length; i ++ ) {
      selectionBox.collection[ i ].material.emissive.set( 0x000000 );
    }
    selectionBox.endPoint.set(
      ( event.clientX / window.innerWidth ) * 2 - 1,
      - ( event.clientY / window.innerHeight ) * 2 + 1,
      0.5 );
    /*
      const allSelected = selectionBox.select();

    for ( let i = 0; i < allSelected.length; i ++ ) {
      allSelected[ i ].material.emissive.set( 0xffffff );
    }
    */
  }
});

document.addEventListener( 'pointerup', function ( event ) {
  if(event.button == 0 && !iskeypressed('Alt')){
    selectionBox.endPoint.set(
      ( event.clientX / window.innerWidth ) * 2 - 1,
      - ( event.clientY / window.innerHeight ) * 2 + 1,
      0.5 );

    const allSelected = selectionBox.select();
    tankmanager.setselectedtanks(allSelected);
    /*
    for ( let i = 0; i < allSelected.length; i ++ ) {
      allSelected[ i ].material.emissive.set( 0xffffff );
    }
    */
  }
});




