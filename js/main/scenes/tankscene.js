import * as THREE from 'https:/unpkg.com/three@0.126.1/build/three.module.js'
import { gsap } from 'https://unpkg.com/gsap@3.9.1/gsap-core.js'
import * as threeengine from '../../3dengine.js'
import * as Loadingmanager from '../../loadingmanager.js'
import * as gamefunctions from '../../gamefunctions.js'
import {addonclickrotateobject} from  '../../controlhandler.js'

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
    //const testtankcolortexture = textureloader.load("./textures/texture/Metal_Trimsheet_002_basecolor.jpg");
    const testtankcolortexture = textureloader.load("./testdata/nftcards/card0texture.jpg");
    const testtankalphatexture = textureloader.load("./textures/normalmap/Metal_Trimsheet_002_normal.jpg");

    const testtankmaterial = new THREE.MeshStandardMaterial({
        color: 'white',
        map: testtankcolortexture,
        metalness: 0.5,
        roughness: 0.4,
        normalMap: testtankalphatexture
    })


    const testtank = await Loadingmanager.loadgltf("./models/basetank.glb")
    testtank.name = "visualtank";
    testtank.traverse ( ( o ) => { if ( o.isMesh ) {
        o.material = testtankmaterial;
      }
    });
    testtank.position.set(0,-1.5,-9.7);
    testtank.scale.set(0.5,0.5,0.5);
    testtank.rotation.y =0.6;

    addonclickrotateobject("visualtank",0.3,0);


//tank name plane
    const tanknametext = gamefunctions.createtexttexture("Tankname","Bombardment",240,"#0000ff");
    const tanknametexture = tanknametext.gettexture();
    tanknametext.settextcolor("#089afc");
    tanknametext.setfillcolor("#000000");
    tanknametext.settext("Rusty");
    tanknametext.setbordersize(20,10);


const tanknamematerial = new THREE.MeshStandardMaterial({
    color: 'white',
    map: tanknametexture,
    metalness: 0.1,
    roughness: 0.4,
    alphaTest: 0.6,
    transparent: true,
    opacity:1,
    side: THREE.DoubleSide,
})
tanknamematerial.name = "tanknamematerial";
const tanknameplanegeometry = new THREE.PlaneGeometry( 2.7, 1 );

const tanknamemesh = new THREE.Mesh(tanknameplanegeometry,tanknamematerial)
tanknamemesh.position.set(0,-1.5,-4.9);
tanknamemesh.rotation.set(-1.3,0,0);
tanknamemesh.name = "tanknamemesh";
scene.add( tanknamemesh );
    //-------------------------------------
    if(hideit) hide();
    objsexists = true;
}export { build};


const workobjs = ["visualtank","tanknamemesh"]; 
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
    if(animationname =="open")
    {
       
    }
    if(animationname =="close")
    {
       
    }
}export { playanimation};

function selecttank(texture){
    const scene = threeengine.getscene();
    var obj = scene.getObjectByName("visualtank");
    obj.traverse ( ( o ) => { if ( o.isMesh ) {
        o.material.map = texture;

    }});

}export { selecttank};

const common = "#bbbbbb";
const uncommon = "#089afc";
const rare = "#fc671c";
const epic = "#32fa1b";
const legendary = "#eb0909";
const mythic = "#c909eb";


function settankname(tankname,rarity){
    const tanknametext = gamefunctions.gettexttexture("Tankname");  
    switch(rarity) {
        case "common":
            tanknametext.settextcolor(common);
          break;
        case "uncommon":
            tanknametext.settextcolor(uncommon);
          break;
        case "rare":
            tanknametext.settextcolor(rare);
          break;
          case "epic":
            tanknametext.settextcolor(epic);
          break;
          case "legendary":
            tanknametext.settextcolor(legendary);
          break;
          case "mythic":
            tanknametext.settextcolor(mythic);
          break;
        default:
            tanknametext.settextcolor("#000000");
      } 
    tanknametext.settext(tankname);
    const scene = threeengine.getscene();
    const texture = tanknametext.gettexture()
    var obj = scene.getObjectByName("tanknamemesh");
    obj.traverse ( ( o ) => { if ( o.isMesh ) {
        o.material.map = texture;

    }});

}export { settankname};



