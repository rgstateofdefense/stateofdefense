import * as THREE from 'https:/unpkg.com/three@0.126.1/build/three.module.js'
import  { SceneUtils } from 'https:/unpkg.com/three@0.126.1/examples/jsm/utils/SceneUtils.js'
//
import { perlinnoise } from '../../modules/perl.js'
import * as threeengine from '../../3dengine.js'
import * as Gameunctions from '../../gamefunctions.js'
import {addkeyfunction} from  '../../controlhandler.js'
const scene = threeengine.getscene();

let perltexture;
let groundcanvas;
const boundraycastplanes = new THREE.Group();
boundraycastplanes.name = "boundraycastplanes";
let xside = 40;
let yside = 40;
let xres = 32;
let yres = 32;
let baseseed = 0;
let extedseed = 0;
let basezoom = 0;
let extendzoom = 0;
let heightmodder = 1;

let objsexists = false;
function sceneexist(){
    return objsexists;
}export { sceneexist};

async function build(hideit)
{
    
    if(objsexists) return;
    buildmap("deserthills");
    //code goes here-----------------------

    // texture used to generate "bumpiness"


   



      //cornermap
    
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    scene.add( directionalLight );
    directionalLight.position.set(-60,20,0);
    directionalLight.castShadow = true;

    const directionalLight2 = new THREE.DirectionalLight( 0xaaaaaa, 0.4 );
    scene.add( directionalLight2 );
    directionalLight2.position.set(-60,30,0);
    directionalLight2.castShadow = false;



    
    directionalLight.shadow.mapSize.width = 4096;
    directionalLight.shadow.mapSize.height = 4096;
    directionalLight.shadow.camera.near =0.1;
    directionalLight.shadow.camera.left =-100;
    directionalLight.shadow.camera.right =100;
    directionalLight.shadow.camera.top =100;
    directionalLight.shadow.camera.bottom =-100;
    
    const cubeamblight = new THREE.AmbientLight( 0xffffff ,0.4); // white light
    scene.add( cubeamblight );

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

function buildmap(mapname) {
    switch(mapname) {
        case "tutorial":
           setsize("tutorial");
          break;
        case "deserthills":
            setsize("big"); 
          break;
        case "dunesbig":
            setsize("big");
          break;
          case "villageruin":
            setsize("halfybig");
          break;
          case "cityruin":
            setsize("medium");
          break;
        default:
            console.log("This map("+mapname+") not exist.");
      } 
      buildcanvas();
      buildmapseednground(mapname);
      generateclickplane();




}export { buildmap};


function setsize(size){
    switch(size) {
        case "tutorial":
            xside = 20;
            yside = 20;
            xres = 16;
            yres = 16;
        break;
        case "medium":
            xside = 80;
            yside = 80;
            xres = 64;
            yres = 64;
        break;
        case "halfxbig":
            xside = 160;
            yside = 80;
            xres = 128 ;
            yres = 64;
        break;
        case "halfybig":
            xside = 80;
            yside = 160;
            xres = 64 ;
            yres = 128;
        break;
        case "big":
            xside = 160;
            yside = 160;
            xres = 128;
            yres = 128;
        break;
    } 
}
function buildcanvas(){
    groundcanvas = document.createElement('canvas');
    const ctx = groundcanvas.getContext('2d');
    ctx.canvas.width = xres*2;
    ctx.canvas.height = yres*2;
    //ctx.fillStyle = 'rgb(38,38,38)';
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    perltexture = new THREE.CanvasTexture(ctx.canvas);
}


function buildmapseednground(mapname){
    switch(mapname) {
        case "tutorial":
          break;
        case "deserthills":
            baseseed = 420;
            basezoom = 80;
            extedseed = 69;
            extendzoom = 10;
            heightmodder = 255;
            drawperl(mapname);
          break;
        case "dunesbig":
            baseseed = 420;
            basezoom = 100;
            extedseed = 121;
            extendzoom = 100;
            heightmodder = 255;
            drawperl(mapname);
          break;
          case "villageruin":
            drawperl(mapname);
          break;
          case "cityruin":
            drawperl(mapname);
          break;
        default:
            console.log("This map("+mapname+") not exist.");
      } 
      createground(mapname);
      createcornermap();
}



function drawperl(mapname) {
    
    var ctx = groundcanvas.getContext("2d");

  var imagedata = ctx.createImageData(255, 255);
    switch(mapname) {
      case "deserthills":
        deserthills(ctx);
        break;
      case "dunesbig":
        dunes(ctx);
        break;
        case "villageruin":
        break;
        case "cityruin":
        break;
    } 
    perltexture = new THREE.CanvasTexture(ctx.canvas);
}


function createground(mapname){
  const scene = threeengine.getscene();
  const textureloader = new THREE.TextureLoader()
  const groundbasetexture = textureloader.load("./textures/maptexture/dirt-512.jpg");


  let groundshader = buildshader(mapname);
  groundshader.then(function(theshader) {
  
const groundgeometry = new THREE.PlaneBufferGeometry( xside, yside, xres, yres);


  let bottompoint =10;
  var ctx = groundcanvas.getContext("2d");  
  var vertices = groundgeometry.attributes.position.array;
    let arraycount = 0;
    for (var y=0; y<129; y++) {
      for (var x=0; x<129; x++) { 
        let imagedata = ctx.getImageData(x*2, y*2, 2, 2 );
        let  point  = getpoint(imagedata);
        if(point<bottompoint && point>0) bottompoint = point;
        //if(imagedata.data[1]>imagedata.data[0])  point  = imagedata.data[1]/255;
        vertices[arraycount+2] =point;
        arraycount+=3;
      }
    }
   
    groundgeometry.computeVertexNormals(); 
    const groundplane = new THREE.Mesh(groundgeometry,theshader)
  
    groundplane.castShadow = true;
    groundplane.receiveShadow = true;
    groundplane.name = "groundplane";
    groundplane.rotation.x =-1.5707;
    groundplane.position.y =-bottompoint;
    scene.add(groundplane);
  
  })

  const boundraycastgeometry = new THREE.PlaneBufferGeometry( xside*1.1, yside*1.04,1,1 );
  const boundraycastmaterial = new THREE.MeshStandardMaterial( {side: THREE.DoubleSide,map:groundbasetexture ,color: 'white', wireframe: false })
  const boundraycastplane = new THREE.Mesh(boundraycastgeometry,boundraycastmaterial);
  boundraycastplane.name = "boundraycastplane";
  boundraycastplane.rotation.x =-1.5707;
  boundraycastplane.visible = true;
  boundraycastplane.position.y = -0.1;
  scene.add(boundraycastplane);
  boundraycastplanes.add( boundraycastplane );
  scene.add(boundraycastplanes);
}


function creategroundold(mapname){
  const scene = threeengine.getscene();
  const textureloader = new THREE.TextureLoader()
  const groundtexture = textureloader.load("./textures/maptexture/dirt-512.jpg");


  groundtexture.wrapS = THREE.RepeatWrapping;
  groundtexture.wrapT = THREE.RepeatWrapping;
  groundtexture.repeat.set( 10, 10 );


  const groundgeometry = new THREE.PlaneBufferGeometry(xside, yside, xres, yres);
  
 


  var materials = [];
  const shadowmaterial = new THREE.ShadowMaterial();
  shadowmaterial.opacity = 0.7;
  shadowmaterial.polygonOffset = true;
  const groundmaterial = new THREE.MeshStandardMaterial({
  
    color: 'white',
    map: groundtexture, 
    //bumpScale: 10
  })

  let groundshader = buildshader(mapname)
  groundshader.then(function(theshader) {
    theshader.polygonOffset = true;
    materials.push(theshader);
    materials.push(shadowmaterial);
    const groundplane = SceneUtils.createMultiMaterialObject(groundgeometry, materials);
    
    groundplane.children[0].traverse(function(o) {
      if (o.isMesh) {
        o.depthWrite = false;
        o.castShadow = true;
        o.receiveShadow = false;
      }
    });
    groundplane.children[1].traverse(function(o) {
      if (o.isMesh) {
        o.depthWrite = false;
        o.castShadow = false;
        o.receiveShadow = true;
      }
    });
    
    //groundplane.children[0].depthWrite = false;
    //groundplane.children[1].depthWrite = false;
    //console.log(groundplane.children[0].depthWrite);
    


        
    groundplane.name = "groundplane";
    groundplane.rotation.x =-1.5707;
   
    scene.add(groundplane);


    //boundraycastplane
    //const boundraycastgeometry = new THREE.PlaneBufferGeometry(xside, yside, 1, 1);


    let bottompoint =1;
    var ctx = groundcanvas.getContext("2d");  
    var vertices = groundgeometry.attributes.position.array;
      let arraycount = 0;
      for (var y=0; y<129; y++) {
        for (var x=0; x<129; x++) { 
          let imagedata = ctx.getImageData(x*2, y*2, 2, 2 );
          let  point  = getpoint(imagedata);
          if(point<bottompoint && point>0) bottompoint = point;
          //if(imagedata.data[1]>imagedata.data[0])  point  = imagedata.data[1]/255;
          vertices[arraycount+2] =point;
          arraycount+=3;
        }
      }
      groundplane.position.y =-bottompoint;
      groundgeometry.computeVertexNormals(); 
  });

  const boundraycastgeometry = new THREE.PlaneBufferGeometry( xside*1.1, yside*1.04,1,1 );
  const boundraycastmaterial = new THREE.MeshStandardMaterial( {side: THREE.DoubleSide,map:groundtexture ,color: 'white', wireframe: false })
  const boundraycastplane = new THREE.Mesh(boundraycastgeometry,boundraycastmaterial);
  boundraycastplane.name = "boundraycastplane";
  boundraycastplane.rotation.x =-1.5707;
  boundraycastplane.visible = true;
  boundraycastplane.position.y = -0.1;
  scene.add(boundraycastplane);
  boundraycastplanes.add( boundraycastplane );
  scene.add(boundraycastplanes);
}
function getpoint(imagedata){
  let returndata = imagedata.data[0];
  
  if(imagedata.data[1]>returndata) returndata =imagedata.data[1];
  if(imagedata.data[2]>returndata) returndata =imagedata.data[2]; 
  //if(imagedata.data[3]>returndata) returndata =imagedata.data[3]; 
  return (returndata/heightmodder)*10;
}


function buildshader(mapname){
  switch(mapname) {
    case "tutorial":
       
      break;
    case "deserthills":
      return deserthillsnoshader();
      break;
    case "dunesbig":
      return dunesshader();
      break;
      case "villageruin":
        
      break;
      case "cityruin":
        
      break;

  } 
}






async function createcornermap(){
    let pos = await threeengine.getrelativeposition(-0.2,0.95,0.95);
    //const cornermapgeometry = new THREE.PlaneGeometry( 0.08, 0.09 );
    const cornermapgeometry = new THREE.PlaneGeometry( 0.04, 0.04 );
    
    const perlmaterial = new THREE.MeshBasicMaterial({
        map: perltexture,
      });

    const cornermapmesh = new THREE.Mesh(cornermapgeometry,perlmaterial)
    //backgroundmesh.position.set(xpos+0.017,-0.129,-0.21);
    const cornermapboundingBox = new THREE.Box3().setFromObject(cornermapmesh);
    const cornermapsize =cornermapboundingBox.getSize();
    cornermapmesh.position.set(pos.x-(cornermapsize.x/2),pos.y-(cornermapsize.y/2),-0.2);
    //cornermapmesh.position.set(pos.x,pos.y,-0.2);
    scene.add(cornermapmesh)
    threeengine.addtocameragroup(cornermapmesh);
}


function generateclickplane(){
    const scene = threeengine.getscene();
    const textureloader = new THREE.TextureLoader();
    var ctx = groundcanvas.getContext("2d");
    const rocktexture = textureloader.load("./textures/maptexture/basedebug.jpg");
    const groundmaterial = new THREE.MeshStandardMaterial({
  
        color: 'white',
        map: rocktexture,
        wireframe: true,
        transparent: true,
        opacity:0.01
      })


    let cgeometry = new THREE.BufferGeometry();
    
    let triangles = [];
    const xstep =xside/xres;
    const ystep =yside/yres;
    let xleft = (xside/2)*-1;
    let ytop = (yside/2)*-1;
    for(let i=0;i<xres;i++){
        for(let j=0;j<yres;j++){
            ytop+=ystep;
            
            const imagedata = ctx.getImageData(i*2-1, j*2-1, 3, 3 );
            let heightrect = imagedata.data[0];
            if(heightrect>40) continue;
            if(imagedata.data[4]>heightrect) heightrect = imagedata.data[4];
            if(heightrect>40) continue;
            if(imagedata.data[8]>heightrect) heightrect = imagedata.data[8];
            if(heightrect>40) continue;
            if(imagedata.data[12]>heightrect) heightrect = imagedata.data[12];
            if(heightrect>40) continue;
            if(imagedata.data[16]>heightrect) heightrect = imagedata.data[16];
            if(heightrect>40) continue;
            if(imagedata.data[20]>heightrect) heightrect = imagedata.data[20];
            if(heightrect>40) continue;
            if(imagedata.data[24]>heightrect) heightrect = imagedata.data[24];
            if(heightrect>40) continue;
            if(imagedata.data[28]>heightrect) heightrect = imagedata.data[28];
            if(heightrect>40) continue;
            if(imagedata.data[32]>heightrect) heightrect = imagedata.data[32];
            if(heightrect>40) continue;

            const ta1 =  new THREE.Vector3(xleft, 0,ytop);
            const ta2 =  new THREE.Vector3(xleft+xstep, 0,ytop);
            const ta3 =  new THREE.Vector3(xleft, 0, ytop-ystep);

            const tb1 =  new THREE.Vector3(xleft, 0, ytop-ystep);
            const tb2 =  new THREE.Vector3(xleft+xstep, 0,ytop);
            const tb3 =  new THREE.Vector3(xleft+xstep, 0,ytop-ystep);
            triangles.push(ta1);
            triangles.push(ta2);
            triangles.push(ta3);
            triangles.push(tb1);
            triangles.push(tb2);
            triangles.push(tb3);

        }
        ytop = (yside/2)*-1;
        xleft+=xstep;
    }
    cgeometry.setFromPoints(triangles); 
    //cgeometry.addAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );
    //cgeometry.setAttribute( 'position', new THREE.BufferAttribute( triangles, 3 ) ); 
    cgeometry.computeVertexNormals();
    const cmesh = new THREE.Mesh(cgeometry,groundmaterial);
    cmesh.name = "clickplane";
    //cmesh.position.y =0.16;
    scene.add(cmesh);
    cmesh.position.y =0.01


}

//mapdata and texture generation--------------------------------------------------------

function deserthills(ctx){
  let pn = new perlinnoise(baseseed);
  pn.zoom(basezoom);  
  let hn = new perlinnoise(extedseed);
  hn.zoom(extendzoom);
  
  for (var x=0; x<xres*2; x++) {
    for (var y=0; y<yres*2; y++) {         
        let n=pn.simplex2(x,y);
        let nm=hn.simplex2(x,y);
        n=(((n*3)+nm)/2)/1.2;
        //let n=pn.simplex3(x,y,1); //cool map layout
        
        //let n = pn.simplex3edge(x,y,1,100,-0.2);
        //let n = pn.perlin2(x, y);
        //n=Math.abs(n);
        //let n=pn.perlin3(x,y,1,100);
        if(n<0.155) n=0.15;
        if(n<0) n=0;
        ctx.fillStyle = "rgba("+(n*255)+","+(n*255)+","+(n*255)+","+255+")";
        ctx.fillRect( x, y, 1, 1 );
    }
  }
}
async function  deserthillsshader(){

  const textureloader = new THREE.TextureLoader()
  const rocktexture = textureloader.load("./textures/texture/rock.jpg");

  var bumpTexture = textureloader.load( './textures/maptexture/heightmap.png' );
  bumpTexture.wrapS = bumpTexture.wrapT = THREE.RepeatWrapping; 

  var groundtexture = textureloader.load( './textures/maptexture/grass.jpg' );
  groundtexture.wrapS = groundtexture.wrapT = THREE.RepeatWrapping; 

  var sandyTexture = textureloader.load( './textures/maptexture/sand-512.jpg' );
  sandyTexture.wrapS = sandyTexture.wrapT = THREE.RepeatWrapping; 

  var grassTexture = textureloader.load( './textures/maptexture/grass-512.jpg' );
  grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping; 

  var rockyTexture = textureloader.load( './textures/maptexture/rock-512.jpg' );
  rockyTexture.wrapS = rockyTexture.wrapT = THREE.RepeatWrapping; 

  var rockyTexture2 = textureloader.load( './textures/maptexture/rock.jpg' );
  rockyTexture2.wrapS = rockyTexture2.wrapT = THREE.RepeatWrapping; 


  var dirtTexture = textureloader.load( './textures/maptexture/dirt-512.jpg' );
  dirtTexture.wrapS = dirtTexture.wrapT = THREE.RepeatWrapping; 

  var snowyTexture = textureloader.load( './textures/maptexture/snow-512.jpg' );
  snowyTexture.wrapS = snowyTexture.wrapT = THREE.RepeatWrapping; 

 
  
  //texturesplattingshader

  const data = await fetch('./shaders/texturesplattingvertex.glsl');
  const splattingvshader = await data.text();

  const data2 = await fetch('./shaders/texturesplattingshader3.glsl');
  const splattingfshader = await data2.text();
  
  var bumpScale   = 1;
  let customUniforms = {
      
  bumpTexture:	{ type: "t", value: perltexture },
  bumpScale:	    { type: "f", value: bumpScale },
  ground:	{ type: "t", value: dirtTexture },
  slope:	{ type: "t", value: rockyTexture2 },
  top:	{ type: "t", value: rockyTexture   },
};




  const shadermaterial = new THREE.ShaderMaterial({
      uniforms: customUniforms,
      vertexShader: splattingvshader,
      fragmentShader: splattingfshader,
      //side: THREE.BackSide
    });
    
    return shadermaterial;
}

async function  deserthillsnoshader(){

 
  const textureloader = new THREE.TextureLoader();
  const sandtexture = textureloader.load("./textures/maptexture/sand-512.jpg");
  const sandnormantexture = textureloader.load("./textures/maptexture/dry_ground_01_nor_gl_1k.png");
  const sandroughtexture = textureloader.load("./textures/maptexture/aerial_beach_01_rough_1k.png");
  const displacementtexture = textureloader.load("./textures/maptexture/aerial_beach_01_disp_1k.png");

  sandtexture.wrapS = THREE.RepeatWrapping;
  sandtexture.wrapT = THREE.RepeatWrapping;
  sandtexture.repeat.set( 8, 8 );

  sandnormantexture.wrapS = THREE.RepeatWrapping;
  sandnormantexture.wrapT = THREE.RepeatWrapping;
  sandnormantexture.repeat.set(8, 8 );

  sandroughtexture.wrapS = THREE.RepeatWrapping;
  sandroughtexture.wrapT = THREE.RepeatWrapping;
  sandroughtexture.repeat.set( 8, 8 );

  displacementtexture.wrapS = THREE.RepeatWrapping;
  displacementtexture.wrapT = THREE.RepeatWrapping;
  displacementtexture.repeat.set( 4, 4 );

  const sandmaterial = new THREE.MeshStandardMaterial({
    color: 'white',
    map: sandtexture,
    roughnessMap: sandroughtexture,
    //displacementMap: displacementtexture,
    //metalness: 0.1,
    //roughness: 0.2,
    normalMap: sandnormantexture
})
  return sandmaterial;
}

function dunes(ctx){
  console.log("dunes called");
  let pn = new perlinnoise(baseseed);
  pn.zoom(basezoom);  
  let hn = new perlinnoise(extedseed);
  hn.zoom(extendzoom);
  
  for (var x=0; x<xres*2; x++) {
    for (var y=0; y<yres*2; y++) {         
        let n=pn.simplex2(x,y);
        let nm=hn.simplex2(x,y);
        n=(n+nm)/1.6;
        //let n = pn.simplex3edge(x,y,1,100,-0.2);
        //let n = pn.perlin2(x, y);
        //n=Math.abs(n);
        //let n=pn.perlin3(x,y,1,100);
        if(n<0.155) n=0.15;
        if(n<0) n=0;
        ctx.fillStyle = "rgba("+(n*255)+","+(n*255)+","+(n*255)+","+255+")";
        ctx.fillRect( x, y, 1, 1 );
    }
  }

}
async function dunesshader(){


  const textureloader = new THREE.TextureLoader();
  const sandtexture = textureloader.load("./textures/maptexture/sand-512.jpg");
  const sandnormantexture = textureloader.load("./textures/maptexture/dry_ground_01_nor_gl_1k.png");
  const sandroughtexture = textureloader.load("./textures/maptexture/aerial_beach_01_rough_1k.png");
  const displacementtexture = textureloader.load("./textures/maptexture/aerial_beach_01_disp_1k.png");

  sandtexture.wrapS = THREE.RepeatWrapping;
  sandtexture.wrapT = THREE.RepeatWrapping;
  sandtexture.repeat.set( 4, 4 );

  sandnormantexture.wrapS = THREE.RepeatWrapping;
  sandnormantexture.wrapT = THREE.RepeatWrapping;
  sandnormantexture.repeat.set(4, 4 );

  sandroughtexture.wrapS = THREE.RepeatWrapping;
  sandroughtexture.wrapT = THREE.RepeatWrapping;
  sandroughtexture.repeat.set( 4, 4 );

  displacementtexture.wrapS = THREE.RepeatWrapping;
  displacementtexture.wrapT = THREE.RepeatWrapping;
  displacementtexture.repeat.set( 4, 4 );

  const sandmaterial = new THREE.MeshStandardMaterial({
    color: 'white',
    map: sandtexture,
    roughnessMap: sandroughtexture,
    //displacementMap: displacementtexture,
    //metalness: 0.1,
    //roughness: 0.2,
    normalMap: sandnormantexture
})
  return sandmaterial;
}



function flatruins(ctx){


}

function flattutorial(ctx){


}



async function buildshaderorig(){

  const textureloader = new THREE.TextureLoader()
  const rocktexture = textureloader.load("./textures/texture/rock.jpg");

  var bumpTexture = textureloader.load( './textures/maptexture/heightmap.png' );
bumpTexture.wrapS = bumpTexture.wrapT = THREE.RepeatWrapping; 

  var groundtexture = textureloader.load( './textures/maptexture/grass.jpg' );
  groundtexture.wrapS = groundtexture.wrapT = THREE.RepeatWrapping; 

var sandyTexture = textureloader.load( './textures/maptexture/sand-512.jpg' );
sandyTexture.wrapS = sandyTexture.wrapT = THREE.RepeatWrapping; 

var grassTexture = textureloader.load( './textures/maptexture/grass-512.jpg' );
grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping; 

var rockyTexture = textureloader.load( './textures/maptexture/rock-512.jpg' );
rockyTexture.wrapS = rockyTexture.wrapT = THREE.RepeatWrapping; 

var rockyTexture2 = textureloader.load( './textures/maptexture/rock.jpg' );
rockyTexture2.wrapS = rockyTexture2.wrapT = THREE.RepeatWrapping; 


var dirtTexture = textureloader.load( './textures/maptexture/dirt-512.jpg' );
dirtTexture.wrapS = dirtTexture.wrapT = THREE.RepeatWrapping; 

var snowyTexture = textureloader.load( './textures/maptexture/snow-512.jpg' );
snowyTexture.wrapS = snowyTexture.wrapT = THREE.RepeatWrapping; 

 
  
  //texturesplattingshader

  const data = await fetch('./shaders/texturesplattingvertex.glsl');
  const splattingvshader = await data.text();

  const data2 = await fetch('./shaders/texturesplattingshader3.glsl');
  const splattingfshader = await data2.text();
  
  var bumpScale   = 1;
  let customUniforms = {
      
  bumpTexture:	{ type: "t", value: perltexture },
  bumpScale:	    { type: "f", value: bumpScale },
  ground:	{ type: "t", value: dirtTexture },
  slope:	{ type: "t", value: rockyTexture2 },
  top:	{ type: "t", value: rockyTexture   },
};




  const shadermaterial = new THREE.ShaderMaterial({
      uniforms: customUniforms,
      vertexShader: splattingvshader,
      fragmentShader: splattingfshader,
      //side: THREE.BackSide
    });
    
    return shadermaterial;
}

