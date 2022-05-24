import * as THREE from 'https:/unpkg.com/three@0.126.1/build/three.module.js'
import { gsap } from 'https://unpkg.com/gsap@3.9.1/gsap-core.js'
import * as threeengine from '../../3dengine.js'
import * as Loadingmanager from '../../loadingmanager.js'

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
    const shopcolortexture = textureloader.load("./textures/texture/brick.jpg");

    const shopmaterial = new THREE.MeshStandardMaterial({
        color: 'white',
        map: shopcolortexture,
        metalness: 0.2,
        roughness: 0.8,
        //normalMap: testtankalphatexture
    })


    const shop = await Loadingmanager.loadgltf("./models/shop.glb")
    shop.name = "shop";
    shop.traverse ( ( o ) => { if ( o.isMesh ) {
        o.material = shopmaterial;
        o.receiveShadow = true;
      }
    });
    shop.position.set(0,-2,-8);
    shop.scale.set(0.4,0.4,0.4);
    //-------------------------------------
    if(hideit) hide();
    objsexists = true;
}export { build};


const workobjs = ["shop"]; 
function clear()
{
    const scene = threeengine.getscene();
    for (let i = 0; i < workobjs.length; i++) { 
        var obj = scene.getObjectByName(workobjs[i]);
        if(typeof obj!=='undefined')scene.remove(obj);
    }
    objsexisists = false;
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
        if(typeof obj!=='undefined')obj.visible = true;
    }
}export { show};

function playanimation(animationname,setdelay){
    const scene = threeengine.getscene(); 
    if(animationname =="open")
    {
       
    }
    if(animationname =="close")
    {
       
    }
}export { playanimation};


