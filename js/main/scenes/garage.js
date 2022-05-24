import * as THREE from 'https:/unpkg.com/three@0.126.1/build/three.module.js'
import { gsap } from 'https://unpkg.com/gsap@3.9.1/gsap-core.js'
import * as Loadingmanager from '../../loadingmanager.js'
import * as threeengine from '../../3dengine.js'



let objsexists = false;
function sceneexist(){
    return objsexists;
}export { sceneexist};

async function build(hideit)
{
    const scene = threeengine.getscene();
    if(objsexists) {
        return;
    }
    const textureloader = new THREE.TextureLoader();
    const tankbasecolor = textureloader.load("./textures/texture/Stylized_Sci-fi_Wall_001_basecolor.jpg");
    const tankbasenormal = textureloader.load("./textures/normalmap/Metal_Tiles_003_normal.jpg");
    const floorcolortexture = textureloader.load("./textures/texture/Marble004_1K_Color.png");
    const flooralphatexture = textureloader.load("./textures/normalmap/Marble004_1K_NormalDX.png");
    const ceiligcolortexture = textureloader.load("./textures/texture/Sci_fi_Metal_Panel_004_basecolor.jpg");
    const ceilignormaltexture = textureloader.load("./textures/normalmap/Sci_fi_Metal_Panel_004_normal.jpg");
    const windowtexture = textureloader.load("./textures/images/windowbackground.png");
    const tanknamescreentexture = textureloader.load("./textures/images/bluescreen.png");
    //const flooralphatexture = textureloader.load("./textures/normalmap/Metal_Plate_Sci-Fi_002_normal.jpg");



    //shedcolortexture.center = new THREE.Vector2(0.5, 0.5);
    floorcolortexture.wrapS = THREE.RepeatWrapping;
    floorcolortexture.wrapT = THREE.RepeatWrapping;
    floorcolortexture.repeat.set( 4, 4 );

    flooralphatexture.wrapS = THREE.RepeatWrapping;
    flooralphatexture.wrapT = THREE.RepeatWrapping;
    flooralphatexture.repeat.set( 4, 4 );


    ceiligcolortexture.wrapS = THREE.RepeatWrapping;
    ceiligcolortexture.wrapT = THREE.RepeatWrapping;
    ceiligcolortexture.repeat.set( 3, 3 );

    ceilignormaltexture.wrapS = THREE.RepeatWrapping;
    ceilignormaltexture.wrapT = THREE.RepeatWrapping;
    ceilignormaltexture.repeat.set( 3, 3 );

    
    //shedcolortexture.repeat.set(3, 3);
    const floormaterial = new THREE.MeshStandardMaterial({
        color: 'white',
        map: floorcolortexture,
        metalness: 0.6,
        roughness: 0.6,
        normalMap: flooralphatexture
    })

    const basematerial = new THREE.MeshStandardMaterial({
        color: 'white',
        map: tankbasecolor,
        metalness: 0.6,
        roughness: 0.6,
        //normalMap: tankbasenormal
    })

    const planegeometry = new THREE.PlaneBufferGeometry(20,23)
    const floor  = new THREE.Mesh(planegeometry,floormaterial)
    floor.name = "garagefloor";
    floor.position.set(0,-2,-12)
    floor.rotation.x =-1.57079
    scene.add(floor)

//ceiling
    const ceilingmaterial = new THREE.MeshStandardMaterial({
        color: 'white',
        map: ceiligcolortexture,
        metalness: 0.6,
        roughness: 0.2,
        normalMap: ceilignormaltexture
    })


    const ceiling  = new THREE.Mesh(planegeometry,ceilingmaterial)
    ceiling.name = "garageceiling";
    ceiling.position.set(0,4.8,-12)
    ceiling.rotation.x =1.57079
    scene.add(ceiling)

//windowbackground
const windowmaterial = new THREE.MeshStandardMaterial({
    color: 'white',
    map: windowtexture,
    metalness: 0.0,
    roughness: 0.5,
})
const windowwgeometry = new THREE.PlaneBufferGeometry(36,36)
const windowview  = new THREE.Mesh(windowwgeometry,windowmaterial)
    windowview.name = "windowview";
    windowview.position.set(1,-4,-34)
    //windowview.rotation.x =1.57079
    scene.add(windowview)

    const centerlight = new THREE.PointLight( 0x000033, 1, 100 );
    
    centerlight.name = "centerlight";
    centerlight.position.set( 0, 3, -10 );
    //scene.add( centerlight );

    const sparklelight = new THREE.PointLight( 0x666666, 1, 20 );
    sparklelight.name = "sparklelight";
    sparklelight.position.set( 0, 3, -10 );
    scene.add( sparklelight );


    //base tank platform

    const tankplatform = await Loadingmanager.loadgltf("./models/tankbase.glb")
    tankplatform.name = "tankplatform";
    tankplatform.traverse ( ( o ) => { if ( o.isMesh ) {
        o.material = basematerial;
        o.castShadow = true;
      }
    });
    tankplatform.position.set(0,-2,-10);
    tankplatform.scale.set(5,2,5);
    

    const tanknamescreenmaterial = new THREE.MeshStandardMaterial({
        color: 'white',
        map: tanknamescreentexture,
        metalness: 0.1,
        roughness: 0.4,
        alphaTest: 0.6,
        transparent: true,
        opacity:0.7,
    })

    const tanknamescreenplanegeometry = new THREE.PlaneGeometry( 3.2, 1.3 );

    const tanknamescreenmesh = new THREE.Mesh(tanknamescreenplanegeometry,tanknamescreenmaterial)
    tanknamescreenmesh.position.set(-0.1,-1.55,-4.9);
    tanknamescreenmesh.rotation.set(-1.3,0,0);
    tanknamescreenmesh.name = "tanknamescreenmesh";
    scene.add( tanknamescreenmesh );
    
    
    
    await wallgenerator(scene);

    if(hideit) hide();
    objsexists = true;
}export { build};


async function wallgenerator(scene){
    const textureloader = new THREE.TextureLoader();
    const blankwalltexture = textureloader.load("./textures/texture/blankwall.png");
    const blankwallmaterial = new THREE.MeshStandardMaterial({
        color: 'white',
        map: blankwalltexture,
        metalness: 0.6,
        roughness: 0.6,
        //normalMap: tankbasenormal
    })    
    
    for(let i=0;i<5;i++){
        const blankwall = await Loadingmanager.loadgltf("./models/simplewall.glb")
        blankwall.name = "rsimplewall"+i;
        workobjs.push(blankwall.name);
        blankwall.traverse ( ( o ) => { if ( o.isMesh ) {
            o.material = blankwallmaterial;
        }});
        blankwall.position.set(10,-2,-4.5-(i*3.9));
        blankwall.scale.set(1,1.7,1);
        blankwall.rotation.set(0,-1.57079,0);
    }
    for(let i=0;i<5;i++){
        const blankwall = await Loadingmanager.loadgltf("./models/simplewall.glb")
        blankwall.name = "lsimplewall"+i;
        workobjs.push(blankwall.name);
        blankwall.traverse ( ( o ) => { if ( o.isMesh ) {
            o.material = blankwallmaterial;
        }});
        blankwall.position.set(-10,-2,-4.5-(i*3.9));
        blankwall.scale.set(1,1.7,1);
        blankwall.rotation.set(0,1.57079,0);
    }

    for(let i=0;i<3;i++){
        const blankwall = await Loadingmanager.loadgltf("./models/windowwall.glb")
        blankwall.name = "window"+i;
        workobjs.push(blankwall.name);
        blankwall.traverse ( ( o ) => { if ( o.isMesh ) {
            o.material = blankwallmaterial;
        }});
        blankwall.position.set(-7+(i*7),-2,-22);
        blankwall.scale.set(1.8,1.7,1);
        blankwall.rotation.set(0,0,0);
    }




}


const workobjs = ["garagefloor","centerlight","sparklelight","tankplatform","garageceiling","windowview","tanknamescreenmesh"]; 
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
        //console.log("hiding: "+workobjs[i]);
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

function playanimation(animationname,setdelay){
    const scene = threeengine.getscene();
    if(animationname =="open")
    {
       
    }
    if(animationname =="close")
    {
       
    }
}export { playanimation};

function showgarageroomcontrols(){
    


}


