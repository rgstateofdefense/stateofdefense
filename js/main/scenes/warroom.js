import * as THREE from 'https:/unpkg.com/three@0.126.1/build/three.module.js'
import { gsap } from 'https://unpkg.com/gsap@3.9.1/gsap-core.js'
import * as animationManager from '../../animationmanager.js'
import * as threeengine from '../../3dengine.js'
import * as gamefunctions from '../../gamefunctions.js'
import * as Loadingmanager from '../../loadingmanager.js'
import {addonclickrotateobject} from  '../../controlhandler.js'

let objsexists = false;
function sceneexist(){
    return objsexists;
}export { sceneexist};

async function build(hideit)
{
    const scene = threeengine.getscene();
    if(objsexists) return;
    animationManager.createtimeline("cameralook");
    animationManager.createtimeline("hidecontrols");
    //code goes here-----------------------
    const textureloader = new THREE.TextureLoader();
    const floorcolortexture = textureloader.load("./textures/texture/warroomwallA.png");
    const flooralphatexture = textureloader.load("./textures/normalmap/Metal_Plate_012_normal.jpg");
    const globebasetexture = textureloader.load("./textures/texture/Metal_Plate_017_basecolor.jpg");
    const globebasenormal = textureloader.load("./textures/normalmap/Greeble_Techno_002_normal.jpg");
    const windowceilingtexture = textureloader.load("./textures/texture/1K-facade_1_basecolor.png");
    const windowceilingalphatexture = textureloader.load("./textures/normalmap/1K-facade_1_normal.png");
    const blankwalltexture = textureloader.load("./textures/texture/abstractwall_5_basecolor-1K.png");
    //const ceiligcolortexture = textureloader.load("./textures/skybox/stars/4.png");
    //const ceilignormaltexture = textureloader.load("./textures/normalmap/Sci-fi_Armor_001_normal.jpg");
   
    const earthtexture = textureloader.load("./textures/texture/earthsmall.jpg");
    const backbuildingtexture = textureloader.load("./textures/texture/Facade002_1K_Color.png");


    earthtexture.wrapS = THREE.RepeatWrapping;
    earthtexture.wrapT = THREE.RepeatWrapping;
    //earthtexture.repeat.set(1,1);



    const alphacircle = textureloader.load("./textures/alphamap/glow3.jpg");

    floorcolortexture.wrapS = THREE.RepeatWrapping;
    floorcolortexture.wrapT = THREE.RepeatWrapping;
    floorcolortexture.repeat.set( 4, 4 );

    flooralphatexture.wrapS = THREE.RepeatWrapping;
    flooralphatexture.wrapT = THREE.RepeatWrapping;
    flooralphatexture.repeat.set( 4, 4 );

    blankwalltexture.wrapS = THREE.RepeatWrapping;
    blankwalltexture.wrapT = THREE.RepeatWrapping;
    blankwalltexture.repeat.set( 4, 4 );


    windowceilingtexture.wrapS = THREE.RepeatWrapping;
    windowceilingtexture.wrapT = THREE.RepeatWrapping;
    windowceilingtexture.repeat.set( 8, 8 );

    windowceilingalphatexture.wrapS = THREE.RepeatWrapping;
    windowceilingalphatexture.wrapT = THREE.RepeatWrapping;
    windowceilingalphatexture.repeat.set( 2, 2 );

    backbuildingtexture.wrapS = THREE.RepeatWrapping;
    backbuildingtexture.wrapT = THREE.RepeatWrapping;
    backbuildingtexture.repeat.set( 1, 4 );

    
    //ceiligcolortexture.wrapS = THREE.RepeatWrapping;
    //ceiligcolortexture.wrapT = THREE.RepeatWrapping;
    //ceiligcolortexture.repeat.set( 4, 4 );

    //shedcolortexture.repeat.set(3, 3);
    const floormaterial = new THREE.MeshStandardMaterial({
        color: 'white',
        map: floorcolortexture,
        metalness: 0.6,
        roughness: 0.6,
        //normalMap: flooralphatexture
    })

    const planegeometry = new THREE.PlaneBufferGeometry(20,30);
    const floor  = new THREE.Mesh(planegeometry,floormaterial);
    floor.name = "warroomfloor";
    floor.position.set(0,-2,-12);
    floor.rotation.x =-1.57079;
    scene.add(floor);


    const data = await fetch('./shaders/atmosvhader.glsl');
    const vshader = await data.text();

    const data2 = await fetch('./shaders/atmosfhader.glsl');
    const fshader = await data2.text();

    const data3 = await fetch('./shaders/outatmovertex.glsl');
    const outatmovertex = await data3.text();

    const data4 = await fetch('./shaders/outatmoshader.glsl');
    const outatmoshader = await data4.text(); 

    const centralglobegeometry = new THREE.SphereGeometry(2.5,50,50);
    
    //shaders
    const atmomaterial = new THREE.ShaderMaterial({
        vertexShader: outatmovertex,
        fragmentShader: outatmoshader,
        side: THREE.BackSide
      });
      const spherematerial = new THREE.ShaderMaterial({
        vertexShader: vshader,
        fragmentShader: fshader,
        uniforms: {
          globeTexture:{
            value: new THREE.TextureLoader().load('./textures/texture/earth.jpg')
          }
        }
      
      });

    
    const centralglobemesh = new THREE.Mesh(centralglobegeometry,spherematerial);
    centralglobemesh.name = "centralglobemesh";
    centralglobemesh.position.set(0,2,-7);
    centralglobemesh.rotation.y=-2;
    centralglobemesh.rotation.x=1;

    scene.add(centralglobemesh);



    const centralglobemeshmirrormaterial = new THREE.MeshStandardMaterial({
        color: 'white',
        map: earthtexture,
        metalness: 0.2,
        roughness: 0.4,
        transparent: true,
        opacity:0.2
    })

    const centralglobemirrorgeometry = new THREE.SphereGeometry(3.5,50,50);
    const centralglobemeshmirror = new THREE.Mesh(centralglobemirrorgeometry,centralglobemeshmirrormaterial);
    centralglobemeshmirror.name = "centralglobemeshmirror";
    centralglobemeshmirror.position.set(0,10,-7)
    scene.add(centralglobemeshmirror);
    centralglobemeshmirror.renderOrder=0;

    addonclickrotateobject("centralglobemesh",0.1,0.1);


    var spriteMaterial = new THREE.SpriteMaterial({ 
        map: alphacircle, 
        color: 0x089afc, transparent: true, blending: THREE.AdditiveBlending
    });
    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.name = "glowsprite";
    sprite.scale.set(7, 7, 1.0);
    centralglobemesh.add(sprite); // this centers the glow at the mesh

    //inactive message for the globe
    const inactivetext = gamefunctions.createtexttexture("notactive","Bombardment",240,"#0000ff");
    //const inactivetexttexture = gamefunctions.gettexture();
   const inactivetexttexture = inactivetext.gettexture();
   inactivetext.settextcolor("#089afc");
   inactivetext.setfillcolor("#00ffff01");

    const inactivetextmaterial = new THREE.MeshStandardMaterial({
        color: 'white',
        map: inactivetexttexture,
        metalness: 0.4,
        roughness: 0.5,
        alphaTest: 0.3,
        transparent: true,
        opacity:0.01,
        side: THREE.DoubleSide,
    })
    inactivetextmaterial.name = "inactivetextmaterial";
    const inactivetextplanegeometry = new THREE.PlaneGeometry( 2, 0.3 );
    const inactivetextmesh = new THREE.Mesh(inactivetextplanegeometry,inactivetextmaterial)
    inactivetextmesh.name = "inactivetextmesh";
    inactivetextmesh.position.set(0,1,-4);
    scene.add(inactivetextmesh)
    inactivetext.settext("<Not available>");
    inactivetext.setbordersize(20,10);



    const globebasematerial = new THREE.MeshStandardMaterial({
        color: 'white',
        map: globebasetexture,
        metalness: 0.6,
        roughness: 0.6,
        normalMap: globebasenormal
    })
    //globe base
    const globebase = await Loadingmanager.loadgltf("./models/Base.glb")
    globebase.name = "globebase";
    globebase.traverse ( ( o ) => { if ( o.isMesh ) {
        o.material = globebasematerial;
      }
    });
    globebase.position.set(0,-2,-8);
    globebase.scale.set(2,3,2);

    const globebaselight = new THREE.PointLight( 0x089afc, 1, 100 );
    globebaselight.name = "globebaselight";
    globebaselight.position.set( 0, 1, -8 );
    scene.add( globebaselight );

   /*
    const warromcenterlight = new THREE.PointLight( 0x444444, 1, 100 );
    warromcenterlight.name = "warromcenterlight";
    warromcenterlight.position.set( 0, 1, -13 );
    scene.add( warromcenterlight );
    */


    //tutorial button
    const tutorialbuttontext = gamefunctions.createtexttexture("Tutorial","Bombardment",240,"#0000ff");
    const tutorialbuttontexture = tutorialbuttontext.gettexture();
    tutorialbuttontext.settextcolor("#089afc");
    tutorialbuttontext.setfillcolor("#00ffff01");
    tutorialbuttontext.settext("Tutorial");
    tutorialbuttontext.setbordersize(20,10);
    await tutorialbuttontext.setbackgroundimage("./textures/images/backgroundA.png");
    await tutorialbuttontext.setbackgroundimagesize(800,280);
//

    const tutorialbuttonmaterial = new THREE.MeshStandardMaterial({
        color: 'white',
        map: tutorialbuttontexture,
        metalness: 0.1,
        roughness: 0.1,
        alphaTest: 0.6,
        transparent: true,
        opacity:1,
        side: THREE.DoubleSide,
    })
    tutorialbuttonmaterial.name = "tutorialbuttonmaterial";
    const tutorialbuttonplanegeometry = new THREE.PlaneGeometry( 0.08, 0.02 );
    
    const tutorialbuttonmesh = new THREE.Mesh(tutorialbuttonplanegeometry,tutorialbuttonmaterial)
    tutorialbuttonmesh.name = "tutorialbuttonmesh";
    
    const boundingBox = new THREE.Box3().setFromObject(tutorialbuttonmesh);
    const size = boundingBox.getSize();
    let pos = await threeengine.getrelativeposition(-0.2,-0.97,0.02);
    //tutorialbuttonmesh.position.set(-0.3,-0.24,-0.2);
    tutorialbuttonmesh.position.set(pos.x+(size.x/2),-0.24,-0.2);

    tutorialbuttonmesh.onclickcall = jumptotutorial;


    threeengine.addtocameragroup(tutorialbuttonmesh);
    //window ceiling

    const windowceilingmaterial = new THREE.MeshStandardMaterial({
        color: 'white',
        map: windowceilingtexture,
        metalness: 0.2,
        roughness: 0.4,
        transparent: true,
        side: THREE.DoubleSide,
        normalMap: windowceilingalphatexture,
        depthWrite: false
    })


    const windowceiling = await Loadingmanager.loadgltf("./models/windowceiling.glb")
    windowceiling.name = "windowceiling";
    windowceiling.traverse ( ( o ) => { if ( o.isMesh ) {
        o.material = windowceilingmaterial;
      }
    });
    windowceiling.renderOrder=0;
    //windowceiling.position.set(-0.3,4,-8);
    //windowceiling.scale.set(14.3,5.6,10);
    windowceiling.position.set(0,4,-8);
    windowceiling.scale.set(13.8,5.6,10);
    
    const color = 0x000000;  // white
    const near = 5;
    const far = 15;
    scene.fog = new THREE.Fog(color, near, far);
    
    

    const building1geomoetry = new THREE.BoxGeometry(3,15,3)
    const backbuildingmaterial = new THREE.MeshStandardMaterial({
        color: 'gray',
        map: backbuildingtexture,
        metalness: 0.8,
        roughness: 0.1,
        fog: false
    })


    /*
    const building1mesh = new THREE.Mesh(building1geomoetry,backbuildingmaterial)
    building1mesh.position.set(15,7,-25);


    const building2mesh = new THREE.Mesh(building1geomoetry,backbuildingmaterial)
    building2mesh.position.set(-15,7,-25);

    const building3mesh = new THREE.Mesh(building1geomoetry,backbuildingmaterial)
    building3mesh.position.set(-12,11,-28);

    const building4mesh = new THREE.Mesh(building1geomoetry,backbuildingmaterial)
    building4mesh.position.set(-8,8,-25);
    
    const building5mesh = new THREE.Mesh(building1geomoetry,backbuildingmaterial)
    building5mesh.position.set(-11,8,-27);
    
    const building6mesh = new THREE.Mesh(building1geomoetry,backbuildingmaterial)
    building6mesh.position.set(11,6,-25);
    
    scene.add(building1mesh)
    scene.add(building2mesh)
    scene.add(building3mesh)
    scene.add(building4mesh)
    scene.add(building5mesh)
    scene.add(building6mesh)



*/

    
    await wallgenerator(scene);
    await skybox(scene);


    //-------------------------------------
    if(hideit) hide();
    objsexists = true;
}export { build};


async function wallgenerator(scene){

    const textureloader = new THREE.TextureLoader();
    const blankwalltexture = textureloader.load("./textures/texture/warroomwallA.png");
    const blankwallnormal = textureloader.load("./textures/normalmap/Metal_Plate_012_normal.jpg");
    const blankwallmaterial = new THREE.MeshStandardMaterial({
        color: 'white',
        map: blankwalltexture,
        metalness: 0.2,
        roughness: 0.3,
        normalMap: blankwallnormal
    })    


    for(let i=0;i<5;i++){
        const blankwall = await Loadingmanager.loadgltf("./models/warroomwall.glb")
        blankwall.name = "warrsimplewall"+i;
        workobjs.push(blankwall.name);
        blankwall.traverse ( ( o ) => { if ( o.isMesh ) {
            o.material = blankwallmaterial;
        }});
        blankwall.position.set(10,-2.5,-4.5-(i*4));
        blankwall.scale.set(1,2,1);
        blankwall.rotation.set(0,-1.57079,0);
    }
    for(let i=0;i<5;i++){
        const blankwall = await Loadingmanager.loadgltf("./models/warroomwall.glb")
        blankwall.name = "warlsimplewall"+i;
        workobjs.push(blankwall.name);
        blankwall.traverse ( ( o ) => { if ( o.isMesh ) {
            o.material = blankwallmaterial;
        }});
        blankwall.position.set(-10,-2.5,-4.5-(i*4));
        blankwall.scale.set(1,2,1);
        blankwall.rotation.set(0,1.57079,0);
    }


    for(let i=0;i<4;i++){
        const blankwall = await Loadingmanager.loadgltf("./models/simplewall.glb")
        blankwall.name = "backwall"+i;
        workobjs.push(blankwall.name);
        blankwall.traverse ( ( o ) => { if ( o.isMesh ) {
            o.material = blankwallmaterial;
        }});
        blankwall.position.set(-10.5+(i*6.8),-2,-20);
        blankwall.scale.set(1.7,1.43,1);
        blankwall.rotation.set(0,0,0);
    }




}


function skybox(scene){
    let materialArray = [];
    let texture_ft = new THREE.TextureLoader().load( "./textures/skybox/stars/1.png");//
    let texture_bk = new THREE.TextureLoader().load( "./textures/skybox/stars/3.png");//?
    let texture_up = new THREE.TextureLoader().load( "./textures/skybox/stars/6.png");//
    let texture_dn = new THREE.TextureLoader().load( "./textures/skybox/stars/5.png");//
    let texture_rt = new THREE.TextureLoader().load( "./textures/skybox/stars/4.png");
    let texture_lf = new THREE.TextureLoader().load( "./textures/skybox/stars/2.png");
  
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft,fog: false }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk,fog: false }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up,fog: false }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn,fog: false }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt,fog: false }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf,fog: false }));
   
    for (let i = 0; i < 6; i++) materialArray[i].side = THREE.BackSide;
    let skyboxGeo = new THREE.BoxGeometry( 100, 100, 100);
    let skybox = new THREE.Mesh( skyboxGeo, materialArray );
    scene.add( skybox );
}

const workobjs = ["centralglobemesh","glowsprite","warroomfloor","globebase","globebaselight", "windowceiling"]; 
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
    scene.fog.far = 100;
    stop();
}export { hide};
function show()
{
    const scene = threeengine.getscene();
    for (let i = 0; i < workobjs.length; i++) {
        const obj = scene.getObjectByName(workobjs[i]);
        if(typeof obj!=='undefined') obj.visible = true;
    }
    scene.fog.far = 13;
    start();
}export { show};

function playanimation(timelinename,animationname,setdelay){
    const scene = threeengine.getscene();
    if(animationname =="looktoglobe")
    {
        const timeline = animationManager.gettimeline(timelinename);
        timeline.addanimation("looktoglobepen",looktoglobe);
        timeline.startanimationchain();
    }
    if(animationname =="showwarroomcontrols")
    {
        const timeline = animationManager.gettimeline(timelinename);
        timeline.addanimation("showwarroomcontrols",showwarroomcontrols);
        timeline.startanimationchain();
    }
    if(animationname =="hidewarroomcontrols")
    {
        const timeline = animationManager.gettimeline(timelinename);
        timeline.addanimation("hidewarroomcontrols",hidewarroomcontrols);
        timeline.startanimationchain();
    }

}export { playanimation};



function looktoglobe(timeline){
    const camera = threeengine.getcameragroup();
    timeline.to(camera.rotation,{x:0.3805,y:0,z:0,duration:1.5,delay:0.4});
}

function showwarroomcontrols(timeline){
    const scene = threeengine.getscene();
    var inactivetextmesh = scene.getObjectByName("inactivetextmesh");
    inactivetextmesh.traverse ( ( h1 ) => { if ( h1.isMesh ) {
        timeline.to(h1.material,{duration:1.2,opacity:0.8});
    }});
    var tutorialbutton = scene.getObjectByName("tutorialbuttonmesh");
    timeline.to(tutorialbutton.position,{duration:0.7,y:-0.14},"<");
}

function hidewarroomcontrols(timeline){
    const scene = threeengine.getscene();
    var inactivetextmesh = scene.getObjectByName("inactivetextmesh");
    inactivetextmesh.traverse ( ( h1 ) => { if ( h1.isMesh ) {
        timeline.to(h1.material,{duration:1.2,opacity:0.0});
    }});
    var tutorialbutton = scene.getObjectByName("tutorialbuttonmesh");
    timeline.to(tutorialbutton.position,{duration:0.7,y:-0.24},"<");
}


//tutorial button pressed
function jumptotutorial(){
    window.location.replace("battle.html");
}



//globe reflection rotation
var mgrrequestid;
function loop(time) {
    mgrrequestid = undefined;
    const scene = threeengine.getscene();
    var objglobe = scene.getObjectByName("centralglobemesh"); 
    var objglobemirror = scene.getObjectByName("centralglobemeshmirror");
    const globequat = objglobe.quaternion; 
    var newglobequat = new THREE.Quaternion(globequat.x,-globequat.y,globequat.z,-globequat.w);
    objglobemirror.rotation.setFromQuaternion(newglobequat);

    start();
}

function start() {
    if (!mgrrequestid) {
        mgrrequestid = window.requestAnimationFrame(loop);
    }
}

function stop() {
    if (mgrrequestid) {
       window.cancelAnimationFrame(mgrrequestid);
       mgrrequestid = undefined;
    }
}

function toRadians(angle) {
	return angle * (Math.PI / 180);
}