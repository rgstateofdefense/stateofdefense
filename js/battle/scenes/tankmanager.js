import * as THREE from 'https:/unpkg.com/three@0.126.1/build/three.module.js'
import * as threeengine from '/js/3dengine.js'
import * as Loadingmanager from '/js/loadingmanager.js'
import {addonclickrotateobject} from  '/js/controlhandler.js'
//import {setcameratoobject, movecameratoobject} from  '/js/battle/scenes/controlscene.js'
let mytankidcounter = 0;
const textureloader = new THREE.TextureLoader();

let enemyfactories = {};
let enemytanks = {};

let allyfactories = {};
let pallytanks = {};

let playerfactories = {};
let playertanks = {};
let selectedtanklist = {};



let objsexists = false;
function sceneexist(){
    return objsexists;
}export { sceneexist};

async function build(hideit)
{
    const scene = threeengine.getscene();
    if(objsexists) return;

    const hitpositionsphere = new THREE.SphereGeometry(0.1,10,10);
    const hitpositionmaterial = new THREE.MeshStandardMaterial({
        color: 'red',
        transparent: true,
        opacity:0.6
    })
    const hitpositionmesh = new THREE.Mesh(hitpositionsphere,hitpositionmaterial);
    hitpositionmesh.name = "hitpositionmesh";
    scene.add(hitpositionmesh);



    //code goes here-----------------------
   
    /*
    
    //const testtankcolortexture = textureloader.load("./textures/texture/Metal_Trimsheet_002_basecolor.jpg");
    const testtankcolortexture = textureloader.load("./testdata/nftcards/card1texture.jpg");
    const hbartest = textureloader.load("./testdata/hbar.png");
    const testtankalphatexture = textureloader.load("./textures/normalmap/Metal_Trimsheet_002_normal.jpg");
    const testtankmaterial = new THREE.MeshStandardMaterial({
        color: 'white',
        map: testtankcolortexture,
        metalness: 0.1,
        roughness: 0.4,
        normalMap: testtankalphatexture
    })

   
    const testtank = await Loadingmanager.loadgltf("./models/basetank.glb")
    testtank.name = "sizetesttank";
    testtank.traverse ( ( o ) => { if ( o.isMesh ) {
        o.material = testtankmaterial;
        o.castShadow = true;
        o.receiveshadow = true;
      }
    });
    //setcameratoobject("sizetesttank");
    testtank.position.set(0,0,0);
    testtank.scale.set(0.25,0.25,0.25);
    testtank.rotation.y =0.6;
    //addonclickrotateobject("sizetesttank",0.3,0);

    

    const hbarmat = new THREE.SpriteMaterial( { map: hbartest, color: 0xffffff, fog: true } );
    const sprite = new THREE.Sprite( hbarmat );

	sprite.position.set( 0,1, 0);
	sprite.position.normalize();
	sprite.position.multiplyScalar( 1.5 );
    sprite.scale.set( 0.06, 0.010, 1 );
    scene.add( sprite );
    hbarmat.sizeAttenuation = false;
    //hbarmat.emissive.set( 0xffffff );
    */
   

    /*
   //onegroup.position.set(1,0,0);
    mytankidcounter++;
    createnewtank("my_"+mytankidcounter).then( result => {
        result.position.x = -3;

    });
    //onegroup.position.x = -1;
    mytankidcounter++;
    createnewtank("my_"+mytankidcounter).then( result => {
        result.position.z = 3;

    });
    //onegroup.position.z = 1;
    mytankidcounter++;
    createnewtank("my_"+mytankidcounter);
    */
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


async function createnewtank(suffix){
    const scene = threeengine.getscene();
    let newtank = [];
    const tankgroup = new THREE.Group();
    tankgroup.name = "tank_g_"+suffix;
    //tankbody
    const tanktexture = textureloader.load("./testdata/nftcards/card1texture.jpg");
    const tankalphatexture = textureloader.load("./textures/normalmap/Metal_Trimsheet_002_normal.jpg");
    
    const tankmaterial = new THREE.MeshStandardMaterial({
        color: 'white',
        map: tanktexture,
        metalness: 0.1,
        roughness: 0.4,
        normalMap: tankalphatexture
    })
    const tank = await Loadingmanager.loadgltf("./models/basetank.glb")
    tank.name = "tank_"+suffix;
    tank.traverse ( ( o ) => { if ( o.isMesh ) {
        o.material = tankmaterial;
        o.castShadow = true;
        o.receiveshadow = true;
      }
    });
    //setcameratoobject("sizetesttank");
    tank.position.set(0,0,0);
    tank.scale.set(0.25,0.25,0.25);
    tankgroup.add(tank);
    //healthbar
    const hbartexture = textureloader.load("./testdata/hbar.png");
    const hbarmaterial = new THREE.SpriteMaterial( { 
        map: hbartexture, 
        color: 0xffffff,
        transparent: true,
        opacity:0.0, 
        fog: true 
    });
    const hbarsprite = new THREE.Sprite( hbarmaterial );
    hbarsprite.name = "tank_hbar_"+suffix;
	hbarsprite.position.set( 0,1, 0);
	hbarsprite.position.normalize();
	hbarsprite.position.multiplyScalar( 1.5 );
    hbarsprite.scale.set( 0.06, 0.010, 1 );
    hbarmaterial.sizeAttenuation = false;
    tankgroup.add(hbarsprite);
    playertanks[tank.name] = tankgroup;
    console.log("tank "+tank.name+" added");
    scene.add(tankgroup);
    return tankgroup;
    //tankgroup.position.set(0,0,-10);

}

function destroytank(){


}




function updatetanknbuildlist(objdatalist){
    
    
}export { updatetanknbuildlist};



function updatepositions(objposlist){


}export { updatepositions};

function setselectedtanks(objlist){
    
    if(typeof objlist.length == 'undefined'){
        if(objlist.name =='SF_Tank'){
            const target = objlist.parent.name;
            if(target in playertanks) selectedtanklist[target] = playertanks[target];
            //if(objlist.parent.name in playertanks) selectedtanklist[objlist.parent.name] = objlist.parent;
        }
    }
    else{
        for (const item of objlist) {
            if(item.name =='SF_Tank'){
                const target = item.parent.name;
                if(target in playertanks) selectedtanklist[target] = playertanks[target];
            }
        }
    }
    showhealthbars();
}export { setselectedtanks};
function clearselectedtanks(){


    selectedtanklist = {};
}export { clearselectedtanks};

function showhealthbars(){
    for (const [key, value] of Object.entries(playertanks)) {
        value.children[1].material.opacity = 0.0;
        //console.log(value.children[1]);

    }
    for (const [key, value] of Object.entries(selectedtanklist)) {
        value.children[1].material.opacity = 0.9;
    }
}
function updatehealthbar(){

    for (const [key, value] of Object.entries(selectedtanklist)) {


    }
}






function setnewmovepoint(clickplane){
    const scene = threeengine.getscene();
    const target = clickplane.point;
    
    const obj = scene.getObjectByName("hitpositionmesh");
    obj.position.set( target.x,target.y,target.z);
    //console.log(target);
    
}export { setnewmovepoint};
function setnewtargetpoint(clicktarget){

}export { setnewtargetpoint};

//mapeditor function
function createmapeditortank(){
    createnewtank("mapeditortank");

}export { createmapeditortank};

function settankposition(x,y,z){
    let lp = playertanks["tank_mapeditortank"].position;
    let returnpos = new THREE.Vector3(lp.x,lp.y,lp.z);
    playertanks["tank_mapeditortank"].position.set( x,y, z);
    return returnpos;
}export { settankposition};