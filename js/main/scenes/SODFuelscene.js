import * as THREE from 'https:/unpkg.com/three@0.126.1/build/three.module.js'
import { gsap } from 'https://unpkg.com/gsap@3.9.1/gsap-core.js'
import * as threeengine from '/js/3dengine.js'
import * as gamefunctions from '/js/gamefunctions.js'
import * as Loadingmanager from '/js/loadingmanager.js'
import {addmovefunction} from  '/js/controlhandler.js'

let objsexists = false;

function sceneexist(){
    return objsexists;
}export { sceneexist};

let clightx;
async function build(hideit)
{
    const scene = threeengine.getscene();
    const camera = threeengine.getcamera();
    //const renderer = threeengine.getrenderer();
    if(objsexists) return;

    //code goes here-----------------------
    const textureloader = new THREE.TextureLoader();
    const SODFtexture = textureloader.load("./textures/texture/Crystal_004_basecolor.jpg");
    const backgroundtexture = textureloader.load("./textures/images/metalPanel.png");
    
    const data = await fetch('./shaders/basevertex.glsl');
    const glowvertex = await data.text();

    const data2 = await fetch('./shaders/basefragment.glsl');
    const glowfragment = await data2.text();


    const SODFmaterial = new THREE.MeshStandardMaterial({
        color: 'white',
        map: SODFtexture,
        metalness: 0.8,
        roughness: 0.5,
        transparent: true,
        opacity:0.8,
        depthTest: false
    })

     

    const sodfcrystal = await Loadingmanager.loadgltf("./models/crystal.glb")
    sodfcrystal.name = "sodfcrystal";
    sodfcrystal.traverse ( ( o ) => { if ( o.isMesh ) {
          o.material = SODFmaterial;
        }
    });

    const boundingBox = new THREE.Box3().setFromObject(sodfcrystal);
    const size = boundingBox.getSize();
    let pos = await threeengine.getrelativeposition(-0.2,1,0);
    
    const xpos = pos.x-((size.x*0.04/2));
    //console.log( pos.x+" "+size.x);
    sodfcrystal.position.set(xpos,-0.125,-0.20);
    sodfcrystal.scale.set(0.010,0.018,0.014);
    sodfcrystal.rotation.x =-0.2
    sodfcrystal.layers.enable(2);
    threeengine.addtocameragroup(sodfcrystal);

    const crystalsparleklight = new THREE.PointLight( 0xffffff, 1, 0.1 );
    crystalsparleklight.name = "crystalsparleklight";
    crystalsparleklight.position.set(xpos,-0.12,-0.195 );
    scene.add( crystalsparleklight );
    clightx = xpos;
    
    const crystalglow = new THREE.PointLight( 0x00ff00, 1, 0.1 );
    crystalglow.name = "crystalglowlight";
    crystalglow.position.set(xpos-0.04,-0.11,-0.17 );
    //console.log("xpos: "+xpos);
    scene.add( crystalglow );
    /*
    const crystalglow2 = new THREE.PointLight( 0x00ff00, 1, 0.1 );
    crystalglow2.name = "crystalglowlight";
    crystalglow2.position.set(xpos,-0.06,-0.22 );
    scene.add( crystalglow2 );
    */
    threeengine.addtocameragroup(crystalsparleklight);
    threeengine.addtocameragroup(crystalglow);
    //threeengine.addtocameragroup(crystalglow2);
    addmovefunction(crystaleffect);
    
    const texttexture = gamefunctions.createtexttexture("prototext","Bombardment",240,"#0000ff");
    //const texture = gamefunctions.gettexture();
    const texture = texttexture.gettexture();
    //texttexture.settextcolor("#00900f");
    texttexture.settextcolor("#449944");
    texttexture.setfillcolor("#00ffff01");

    const planematerial = new THREE.MeshStandardMaterial({
        color: 'white',
        map: texture,
        metalness: 0.4,
        roughness: 0.5,
        alphaTest: 0.3,
        transparent: true,
        side: THREE.DoubleSide,
    })

    const planegeometry = new THREE.PlaneGeometry( 0.04, 0.015 );
    const planemesh = new THREE.Mesh(planegeometry,planematerial)
    planemesh.position.set(xpos+0.0015,-0.142,-0.20);
    scene.add(planemesh)
    texttexture.settext("SODF: 1000");
    texttexture.setbordersize(20,10);
    threeengine.addtocameragroup(planemesh);

    //background

    const backgroundmaterial = new THREE.MeshStandardMaterial({
        color: 'gray',
        map: backgroundtexture,
        metalness: 0.7,
        roughness: 1,
        transparent: true,
        opacity:1,
        depthTest: true
    })
    pos = await threeengine.getrelativeposition(-0.3,1,0);
    const backgroundgeometry = new THREE.PlaneGeometry( 0.08, 0.09 );
    const backgroundmesh = new THREE.Mesh(backgroundgeometry,backgroundmaterial)
    //backgroundmesh.position.set(xpos+0.017,-0.129,-0.21);
    const bboundingBox = new THREE.Box3().setFromObject(backgroundmesh);
    const bacgroundsize = bboundingBox.getSize();
    backgroundmesh.position.set(pos.x-(bacgroundsize.x/2)-0.0175,-0.179,-0.3);
    scene.add(backgroundmesh)
    threeengine.addtocameragroup(backgroundmesh);


    //-------------------------------------
    if(hideit) hide();
    objsexists = true;
}export { build};

function changepos(){



}

const workobjs = []; 
function clear()
{
    const scene = threeengine.getscene();
    for (let i = 0; i < workobjs.length; i++) { 
        var obj = scene.getObjectByName(workobjs[i]);
        if(typeof obj!='undefined') scene.remove(obj);
    }
    objsexists = false;
}export { clear};
function hide()
{
    const scene = threeengine.getscene();
    for (let i = 0; i < workobjs.length; i++) {
        const obj = scene.getObjectByName(workobjs[i]);
        if(typeof obj!='undefined') obj.visible = false;
    }
}export { hide};
function show()
{
    const scene = threeengine.getscene();
    for (let i = 0; i < workobjs.length; i++) {
        const obj = scene.getObjectByName(workobjs[i]);
        if(typeof obj!='undefined') obj.visible = true;
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

function crystaleffect(mousecord){
    const scene = threeengine.getscene();
    var sodfcrystal = scene.getObjectByName("sodfcrystal");
    var sodfcrystallight = scene.getObjectByName("crystalsparleklight");
    //sodfcrystallight.position.x=clightx+0.01+mousecord.x/18;
    sodfcrystallight.position.x=clightx+0.05+mousecord.x/25;
    sodfcrystallight.position.y=(-0.12)+mousecord.y/18;
    sodfcrystal.rotation.y=mousecord.x/30;
    //console.log(clightx+0.01+mousecord.x/18);
}


