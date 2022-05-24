import * as THREE from 'https:/unpkg.com/three@0.126.1/build/three.module.js'
import { GUI } from 'https:/unpkg.com/three@0.126.1/examples/jsm/libs/dat.gui.module.js'
import * as shaderscene from '../../mapeditor/scenes/renderscene.js'


//const math = require('https://www.unpkg.com/mathjs@10.5.1/lib/browser/math.js')
//import * as mathjs from 'https://www.unpkg.com/mathjs@10.5.1/lib/browser/math.js'
//
import * as Gamefunctions from '../../gamefunctions.js'
import * as Scenehandler from '../../scenehandler.js'
import * as threeengine from '../../3dengine.js'
import * as gamemap from '../../mapbuilder/map.js'
import * as tangmanager from '../../battle/scenes/tankmanager.js'
import * as Loadingmanager from '../../loadingmanager.js'
import { perlinnoise } from '../../modules/perl.js'
import {addkeyfunction,addmousebutttonfunction,removemousebutttonfunction} from  '../../controlhandler.js'


const scene = threeengine.getscene();

const gui = new GUI({ autoPlace: true, width: 200 });
const btransformgui = new GUI({ autoPlace: true, width: 200 });
let perlcounter= 0;

var theperldata = {
    
    targetperl: "...",
    seed: 0,
    zoom: 10,
    typecounter: 0,
    type: "perlin2",
    x:0,
    y: 0,
    autoelevate: true
};
let theperldatalist = {}


let targetmap;

let perltexture;
let groundcanvas= document.createElement('canvas');
let clickplanecanvas= document.createElement('canvas');


const boundraycastplanes = new THREE.Group();
boundraycastplanes.name = "boundraycastplanes";

let noiselist = {} 
addnoise("base",420);
addnoise("erode1",69);
theperldata.targetperl = Object.keys(noiselist)[0];
theperldata.seed = noiselist[theperldata.targetperl].getseed(); 

createthatgui();
//buildheightdatgui();

let objsexists = false;
function sceneexist(){
    return objsexists;
}export { sceneexist};

async function build(hideit)
{
    
    if(objsexists) return;
    //buildmap("deserthills");
    //code goes here-----------------------
    Scenehandler.scene("controlscene").setdollyfurthestpoint(200);

   



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

    targetmap = new gamemap.map(); 
    //targetmap.setsize(10,10);
    targetmap.creategeometry();
    targetmap.createmap();
    

    tangmanager.createmapeditortank();
    addkeyfunction("t", hideshowtank,true);
    console.log("mapeditor initialised");
    //-------------------------------------
    if(hideit) hide();
    objsexists = true;
}export { build};


let tankishidden = false;
let lasposition = new THREE.Vector3(0,0,0);

function hideshowtank(){
    if(tankishidden) tangmanager.settankposition(lasposition.x,lasposition.y,lasposition.z);
    else  lasposition = tangmanager.settankposition(0,-100,0);
    tankishidden = !tankishidden;
}




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

let isingridmode = false;
function setgrid(){
    const mapmaterial = targetmap.getgroundmaterial();
    if(isingridmode){
        isingridmode = false;
        mapmaterial.wireframe = false;
    }
    else{
        isingridmode = true;
        mapmaterial.wireframe = true;
    }
}export { setgrid};



let menuvisible = false;
function showhidemenu(){
    if(menuvisible){
        menuvisible = false;
    }
    else{
        menuvisible = true;
    }
}export { showhidemenu};


let resultvisible = false;
function showhideresult(){
    if(resultvisible){
        resultvisible = false;
    }
    else{
        resultvisible = true;
    }
}export { showhideresult};

let edditormode = 0;
function seteditormode(mode){
    //console.log("mode set to "+mode);
    edditormode = mode;
    cleargui();
    onchangeeditmode();
   
}export { seteditormode};

function onchangeeditmode(){
    document.getElementById("imagepreview").innerHTML = '';
    document.getElementById("buildingtransform").style.height = "0px";
    disableclickfunctions();
    //console.log("imagepreview cleared");
    switch(edditormode) {
        case 0:
            document.getElementById("imagepreview").appendChild(groundcanvas);
            showheightmaplayout();
        break;
        case 1:
            shaderscene.showrender();
            showtexturelayout();
        break;
        case 2:
            showaesteticlayout();
            enablebuildingclickfunction();
        break;
        case 3:
            document.getElementById("imagepreview").appendChild(clickplanecanvas);
            showclickplanelayout();
            enableclickplaneclickfunction();
        break;
    }
}

function disableclickfunctions(){
    removemousebutttonfunction("clickplaneposition");
    removemousebutttonfunction("buildingposition");
    removemousebutttonfunction("tankposition");
    hitpositionmaterial.opacity = 0;
}

function cleargui(){
    for (var i in gui.__controllers) {
        gui.__controllers[i].remove();
    }
    if(gui.__controllers.length>0) cleargui();
    for (var i in btransformgui.__controllers) {
        btransformgui.__controllers[i].remove();
    }
    if(btransformgui.__controllers.length>0) cleargui();
}

function createthatgui(){
    let datguidiv = document.getElementById("guidiv");
    datguidiv.appendChild( gui.domElement );
    gui.domElement.style.position = 'absolute';
    gui.domElement.style.fontSize = "14px"

    let transdatguidiv = document.getElementById("buildingtransform");
    transdatguidiv.appendChild( btransformgui.domElement );
    btransformgui.domElement.style.position = 'absolute';
    btransformgui.domElement.style.fontSize = "14px"
    //console.log(gui);
    //gui.domElement.style="width:100%";


}

//HEIGHTMAP MODE-----------------------------------
function heightmapmode(){
    showheightmaplayout();
}
function setheightmap(){
    buildcanvas();
    //setimagepreview(); 
    buildheightdatgui();
    document.getElementById("imagepreview").innerHTML = '';
    document.getElementById("imagepreview").appendChild(groundcanvas);

}
function buildcanvas(){
    groundcanvas = null;
    groundcanvas = document.createElement('canvas');
    const ctx = groundcanvas.getContext('2d');
    ctx.canvas.width = targetmap.xres*2;
    ctx.canvas.height = targetmap.yres*2;
    //ctx.fillStyle = 'rgb(38,38,38)';
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    scene.remove(perltexture);
    perltexture = new THREE.CanvasTexture(ctx.canvas);
    
    groundcanvas.style.width ='100%';
    groundcanvas.style.height='100%';
    drawperl(ctx);
    initshader();
}

function buildinitheightdatgui(){
    //cleargui();
    var obj = { ShowHgui:function(){ setheightmap() }};
    gui.add(obj,'ShowHgui');

}
function buildheightdatgui(){
    cleargui();
    gui.add(theperldata, 'seed');
    var obj = { Select_perl:function(){ switchperl() }};
    gui.add(obj,'Select_perl');
    var uobj = { Update_seed:function(){ updateseed() }};
    gui.add(uobj,'Update_seed');
    var obj = { Settype:function(){ setperltype() }};
    gui.add(obj,'Settype');
    gui.add(theperldata, 'type');

    gui.add(theperldata, 'zoom').onChange(updateperl);
    gui.add(theperldata, 'x').onChange(updateperl);
    gui.add(theperldata, 'y').onChange(updateperl);
    gui.add(theperldata, 'autoelevate');
    var obj = { Elevate:function(){ elevatemap() }};
    gui.add(obj,'Elevate');
    gui.open();
}
function updatedatgui(){
    for (var i in gui.__controllers) {
        gui.__controllers[i].updateDisplay();
    }
}
function updateseed(){
    noiselist[theperldata.targetperl].setseed(theperldata.seed);
    theperldatalist[theperldata.targetperl].seed = theperldata.seed;
    
    updateperl();
}
function updateperl(){
     theperldatalist[theperldata.targetperl].zoom = theperldata.zoom;
     theperldatalist[theperldata.targetperl].x = theperldata.x;
     theperldatalist[theperldata.targetperl].y = theperldata.y;
     noiselist[theperldata.targetperl].zoom(theperldata.zoom); 
     drawperl(groundcanvas.getContext('2d'));
     if(theperldata.autoelevate) elevatemap();
}
function switchperl(){
    if(perlcounter+1==Object.keys(noiselist).length ) perlcounter = 0;
    else perlcounter++; 
    const name = Object.keys(noiselist)[perlcounter];
    theperldata.targetperl=theperldatalist[name].targetperl;
    theperldata.seed=theperldatalist[name].seed;
    theperldata.zoom=theperldatalist[name].zoom;
    theperldata.typecounter=theperldatalist[name].typecounter;
    theperldata.type=theperldatalist[name].type;
    theperldata.x=theperldatalist[name].x;
    theperldata.y=theperldatalist[name].y;
    updatedatgui();
}
function setperltype(){
    if(theperldata.typecounter==7) theperldata.typecounter = 0;
    else theperldata.typecounter++;
    switch(theperldata.typecounter) {
        case 0:
            theperldata.type = "perlin2";
          break;
        case 1:
            theperldata.type = "perlin3";
          break;
        case 2:
            theperldata.type = "simplex2";
          break;
        case 3:
            theperldata.type = "simplex3";
          break;
        case 4:
            theperldata.type = "perlin2edge";
         break;
        case 5:
            theperldata.type = "perlin3edge";
         break;
        case 6:
            theperldata.type = "simplex2edge";
         break;
        case 7:
            theperldata.type = "simplex3edge";
         break;
        default:
            console.log("Fatal error");
      }
      theperldatalist[theperldata.targetperl].type = theperldata.type;
      updatedatgui();
}
function addnoise(name,tseed){
    let pn = new perlinnoise(tseed);
    pn.zoom(10); 
    noiselist[name] = pn;
    //theperldata.seed = seed;
    //theperldata.targetperl = name;
    theperldatalist[name] = {
    
        targetperl: name,
        seed: tseed,
        zoom: 10,
        typecounter: 0,
        type: "perlin2",
        x:0,
        y: 0
    };
}
function drawperl(ctx){
   
    for (var x=0; x<targetmap.xres*2; x++) {
      for (var y=0; y<targetmap.yres*2; y++) {         
          //let n=pn.simplex2(x,y);
          //let nm=hn.simplex2(x,y);
          let n=getperlval("base",x,y);
          let nm=getperlval("erode1",x,y);
          
          n=generateN(n,nm);
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
//create the actual math here(because mathjs not working)
function getperlval(name,x,y){
    let n = noiselist[name];
    const xplus = theperldatalist[name].x;
    const yplus = theperldatalist[name].y;
    x+=xplus;
    y+=yplus;
    switch(theperldata.typecounter) {
        case 0:
            return n.perlin2(x, y);
          break;
        case 1:
            return n.perlin3(x, y,1);
          break;
        case 2:
            return n.simplex2(x, y);
          break;
        case 3:
            return n.simplex3(x, y,1);
          break;
        case 4:
            return n.perlin2edge(x, y);
         break;
        case 5:
            return n.perlin3edge(x, y,1);
         break;
        case 6:
            return n.simplex2edge(x, y);
         break;
        case 7:
            return n.simplex3edge(x, y,1);
         break;
        default:
            console.log("Fatal error");
      } 



}
function generateN(n,nm){
    return (((n*3)+nm)/2)/1.2;
}
function elevatemap(){
    targetmap.setheightmap(perltexture);
    targetmap.buildheightmap();
}
//TEXTURE MODE-----------------------------------
const editortextureloader = new THREE.TextureLoader();

//textures and normalmaps
var rockyTexture = editortextureloader.load( './textures/maptexture/rock-512.jpg' );
rockyTexture.wrapS = rockyTexture.wrapT = THREE.RepeatWrapping; 

var rockyTexture2 = editortextureloader.load( './textures/maptexture/rock.jpg' );
rockyTexture2.wrapS = rockyTexture2.wrapT = THREE.RepeatWrapping; 


var dirtTexture = editortextureloader.load( './textures/maptexture/dirt-512.jpg' );
dirtTexture.wrapS = dirtTexture.wrapT = THREE.RepeatWrapping; 


//shader calls



const data = await fetch('./shaders/texturesplattingvertex.glsl');
const splattingvshader = await data.text();

const data2 = await fetch('./shaders/texturesplattingshader3.glsl');
const splattingfshader = await data2.text();

let textureshadermaterial;
let normalshadermaterial;

//uniforms



function initshader(){
    var bumpScale   = 1;
    let textureUniforms = {    
        bumpTexture:	{ type: "t", value: perltexture },
        bumpScale:	    { type: "f", value: bumpScale },
        //images
        ground:	{ type: "t", value: dirtTexture },
        slope:	{ type: "t", value: rockyTexture2 },
        top:	{ type: "t", value: rockyTexture   },
    };

    let normalUniforms = {
        bumpTexture:	{ type: "t", value: perltexture },
        bumpScale:	    { type: "f", value: bumpScale },
        //images
        ground:	{ type: "t", value: dirtTexture },
        slope:	{ type: "t", value: rockyTexture2 },
        top:	{ type: "t", value: rockyTexture   },
    };
    //shadermaterials

    textureshadermaterial = new THREE.ShaderMaterial({
        uniforms: textureUniforms,
        vertexShader: splattingvshader,
        fragmentShader: splattingfshader,
    });

    normalshadermaterial = new THREE.ShaderMaterial({
        uniforms: normalUniforms,
        vertexShader: splattingvshader,
        fragmentShader: splattingfshader,
    });
}

function texturemode(){
    showtexturelayout();

}

function buildtexturedatgui(){
    var obj = { Basetexture:function(){ setbasetexture() }};
    gui.add(obj,'Basetexture');
    var obj = { Texture:function(){ showtexture() }};
    gui.add(obj,'Texture');
    var uobj = { Normal:function(){ shownormal() }};
    gui.add(uobj,'Normal');
    var uobj = { Set4096:function(){ shaderscene.setresolution(4096) }};
    gui.add(uobj,'Set4096');
    var uobj = { Set2048:function(){ shaderscene.setresolution(2048) }};
    gui.add(uobj,'Set2048');
    var uobj = { Set1024:function(){ shaderscene.setresolution(1024) }};
    gui.add(uobj,'Set1024');
    var uobj = { Set512:function(){ shaderscene.setresolution(512) }};
    gui.add(uobj,'Set512');
    var uobj = { Set256:function(){ shaderscene.setresolution(256) }};
    gui.add(uobj,'Set256');
    gui.open();
}


function setbasetexture(){
    shaderscene.setmaterial("reset");
   
}
function showtexture(){
    shaderscene.setmaterial(textureshadermaterial);
    targetmap.dsettexture(textureshadermaterial);

}
function shownormal(){
    shaderscene.setmaterial(normalshadermaterial);
    targetmap.dsettexture(normalshadermaterial);

}





//AESTETIC MODE-----------------------------------
function aesteticbuildingmode(){
    showaesteticlayout();

}


const hitpositionsphere = new THREE.SphereGeometry(0.5,2,2);
const hitpositionmaterial = new THREE.MeshStandardMaterial({
    color: 'red',
    transparent: true,
    opacity:0,
    wireframe: true
})




const buildingmaterial = new THREE.MeshStandardMaterial({
    color: 'grey',
    transparent: true,
    opacity:1,
    //wireframe: true
})
buildingmaterial.name ="bmaterial";

const markedbuildingmaterial = new THREE.MeshStandardMaterial({
    color: 'green',
    transparent: true,
    opacity:1,
    //wireframe: true
})
markedbuildingmaterial.name ="markerbmaterial";

const hitpositionmesh = new THREE.Mesh(hitpositionsphere,hitpositionmaterial);
hitpositionmesh.name = "hitpositionmesh";
scene.add(hitpositionmesh);

let buildinglist = [];
//geometries
const factoryplatform = new THREE.BoxGeometry(4,0.1,5);
factoryplatform.name = "factoryplatform";
const ruinedskyscraper = new THREE.BoxGeometry(7,15,7);
factoryplatform.name = "ruinedskyscraper";


let basebuildinglist = {
    "factoryplatform": factoryplatform,
    "ruinedskyscraper": ruinedskyscraper,
    "Tank": "./models/basetank.glb",
    "hbuild": "./models/heightbuilding.glb",
    "shoptest": "./models/shop.glb",
};




//init


var objdata = new function() {
    this.objname = "name0";
    this.savefilename = "builddata.txt";
}

var objeditvars = new function() {
    this.objname = "name0";
    this.xpos =0.0;
    this.ypos= 0.0;
    this.zpos= 0.0;
    this.xscale =1.0;
    this.yscale= 1.0;
    this.zscale= 1.0;
    this.xangle =0.0;
    this.yangle= 0.0;
    this.zangle= 0.0;
}

function buildbuildingdatgui(){
    gui.add(objdata,"objname");
    for (const [key, value] of Object.entries(basebuildinglist)) {
        var obj = { theobject:function(){ addbuilding(key) }};
        gui.add(obj,"theobject").name(key);
    }
    var obj = { shwres:function(){ showallbuildingdata() }};
    gui.add(objdata,"savefilename");
    gui.add(obj,'shwres').name("-=Save=-");

    document.getElementById("buildingtransform").style.height = "330px";
    /*
    document.getElementById("imagepreview").innerHTML =
   '<textarea maxlength="5000" cols="40" rows="18">aaaa</textarea>'
   */


    btransformgui.add(objeditvars,"objname");
    btransformgui.add(objeditvars, 'xpos').step(0.1).onChange(updatebuildingtransf);
    btransformgui.add(objeditvars, 'ypos').step(0.1).onChange(updatebuildingtransf);
    btransformgui.add(objeditvars, 'zpos').step(0.1).onChange(updatebuildingtransf);
    btransformgui.add(objeditvars, 'xscale').step(0.01).onChange(updatebuildingtransf);
    btransformgui.add(objeditvars, 'yscale').step(0.01).onChange(updatebuildingtransf);
    btransformgui.add(objeditvars, 'zscale').step(0.01).onChange(updatebuildingtransf);
    btransformgui.add(objeditvars, 'xangle').step(0.1).onChange(updatebuildingtransf);
    btransformgui.add(objeditvars, 'yangle').step(0.1).onChange(updatebuildingtransf);
    btransformgui.add(objeditvars, 'zangle').step(0.1).onChange(updatebuildingtransf);
    var obj = { delit:function(){ deletebuilding() }};
    btransformgui.add(obj,'delit').name("Detete");
}
function enablebuildingclickfunction(){
    addmousebutttonfunction("buildingposition",1,setbuildingmarkerposition);
    addmousebutttonfunction("selectbuilding","right",selectbuilding);
    hitpositionmaterial.opacity = 1;

}
let markerposition = new THREE.Vector3(0,0,0);
function setbuildingmarkerposition(underelements){
    if(underelements.length>2){
        let target = underelements[2].point;
        if(underelements[2].object.name =="clickplane") target = underelements[3].point;  
        markerposition.set( target.x,target.y,target.z);
        const obj = scene.getObjectByName("hitpositionmesh");
        obj.position.set( target.x,target.y,target.z);
    }
}

let nameindex = 0;
let actualbuilding = "null";
async function addbuilding(buildingname){
    let modelname = objdata.objname;
    if(buildinglist.includes(modelname)){ 
        modelname+=nameindex;
        nameindex++;
        objdata.objname = modelname;
        updatedatgui();
    }
    let mesh;
    if(typeof basebuildinglist[buildingname] == "string" ){
        mesh = await Loadingmanager.loadgltf(basebuildinglist[buildingname])
        
        mesh.traverse ( ( o ) => { if ( o.isMesh ) {
        o.material = markedbuildingmaterial;
      }});
    }
    else{
        mesh = new THREE.Mesh(basebuildinglist[buildingname],buildingmaterial)
        scene.add(mesh);
    }
    mesh.name = modelname;
    mesh.position.set(markerposition.x,markerposition.y,markerposition.z);
    buildinglist.push(modelname);
    if(actualbuilding!= "null"){
        var markedobj = scene.getObjectByName(actualbuilding);
        markedobj.traverse ( ( o ) => { if ( o.isMesh ) {
          o.material = buildingmaterial;
        }})
    }
    actualbuilding = modelname;
    updatetransfgui();
}


function selectbuilding(underelements){
    if(actualbuilding == "null") return;
    if(underelements.length>2 && underelements[2].object.name!= "groundplane" && underelements[2].object.name!= "hitpositionmesh"){
        var obj = scene.getObjectByName(actualbuilding);
        obj.traverse ( ( o ) => { if ( o.isMesh ) {
            o.material = buildingmaterial;
        }})
        actualbuilding = underelements[2].object.parent.name;
        if(actualbuilding ==  "" || actualbuilding ==  undefined) actualbuilding = underelements[2].object.name;
        obj = scene.getObjectByName(actualbuilding);
        obj.traverse ( ( o ) => { if ( o.isMesh ) {
            o.material = markedbuildingmaterial;
        }})
        updatetransfgui();
    }
}

function updatetransfgui(){
    if(actualbuilding == "null") return;
    objeditvars.objname =actualbuilding;
    var obj = scene.getObjectByName(actualbuilding);
    objeditvars.xpos =obj.position.x;
    objeditvars.ypos= obj.position.y;
    objeditvars.zpos= obj.position.z;
    objeditvars.xscale =obj.scale.x;
    objeditvars.yscale= obj.scale.y;
    objeditvars.zscale= obj.scale.z;
    objeditvars.xangle =obj.rotation.x;
    objeditvars.yangle= obj.rotation.y;
    objeditvars.zangle= obj.rotation.z;
    for (var i in btransformgui.__controllers) {
        btransformgui.__controllers[i].updateDisplay();
    }
}

function updatebuildingtransf(){
    var obj = scene.getObjectByName(actualbuilding);
    if(obj == undefined) return;
    obj.position.set(objeditvars.xpos,objeditvars.ypos,objeditvars.zpos);
    obj.scale.set(objeditvars.xscale,objeditvars.yscale,objeditvars.zscale);
    obj.rotation.set(objeditvars.xangle*0.01745,objeditvars.yangle*0.01745,objeditvars.zangle*0.01745);

}

function deletebuilding(){
    if(actualbuilding == "null") return;
    const index = buildinglist.indexOf(actualbuilding);
    if (index > -1) {
        buildinglist.splice(index, 1);
        var obj = scene.getObjectByName(actualbuilding);
        if(typeof obj!=='undefined') scene.remove(obj);
        actualbuilding = "null";
        updatetransfgui();
    }
}

function showallbuildingdata(){
    let savestring = "";
    for (const x of buildinglist) { 
        var obj = scene.getObjectByName(x);
        let xpos =obj.position.x.toFixed(3);
        let ypos= obj.position.y.toFixed(3);
        let zpos= obj.position.z.toFixed(3);
        let xscale =obj.scale.x.toFixed(3);
        let yscale= obj.scale.y.toFixed(3);
        let zscale= obj.scale.z.toFixed(3);
        let xangle =obj.rotation.x.toFixed(3);
        let yangle= obj.rotation.y.toFixed(3);
        let zangle= obj.rotation.z.toFixed(3);
        savestring+=xpos+","+ypos+","+zpos+","+xscale+","+yscale+","+zscale+","+xangle+","+yangle+","+zangle+"\n";
    }
    Gamefunctions.Savetodisk(objdata.savefilename,savestring);

}




//CLICKPLANE MODE-----------------------------------
function enableclickplaneclickfunction(){
    addmousebutttonfunction("clickplaneposition",0,clickplaneonclick);
    addmousebutttonfunction("tankposition",1,postitionthetank);
    hitpositionmaterial.opacity = 1;

}

function clickplanemodde(){
    showclickplanelayout();

}
const textureloader = new THREE.TextureLoader();
const rocktexture = textureloader.load("./textures/maptexture/basedebug.jpg");



let clickcanvastexture;
let  clickmaterial;
//let clickgeometry = new THREE.BufferGeometry();
let clickgeometry;

let clickmesh;
let visible = true;


function buildclickplanedatgui(){
    var obj = { generatecplane:function(){ generateclickplanegrid() }};
    gui.add(obj,'generatecplane').name("Generate");
    obj = { generatecplane:function(){ setvisible() }};
    gui.add(obj,'generatecplane').name("Visible");
    

}

function buildclickcanvas(){
    clickplanecanvas = null;
    clickplanecanvas = document.createElement('canvas');
    const ctx = clickplanecanvas.getContext('2d');
    ctx.canvas.width = targetmap.xres;
    ctx.canvas.height = targetmap.yres;
    //ctx.fillStyle = 'rgb(38,38,38)';
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    clickplanecanvas.style.width ='100%';
    clickplanecanvas.style.height='100%';
}


function generateclickplanegrid(){
    generateclickplanegridtexture();
    buildclickplanemesh();


}


function generateclickplanegridtexture(){
    buildclickcanvas();
    document.getElementById("imagepreview").innerHTML = '';
    document.getElementById("imagepreview").appendChild(clickplanecanvas);
   
    var ctx = groundcanvas.getContext("2d");
    var cctx = clickplanecanvas.getContext("2d");
    
    
    for(let i=0;i<targetmap.xres;i++){
        for(let j=0;j<targetmap.yres;j++){
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
            //cctx.fillStyle = "rgba("+255+","+255+","+255+","+255+")";
            cctx.fillStyle = "rgba("+0+","+0+","+0+","+255+")";
            cctx.fillRect( i, j, 1, 1 );

        }
    }
}

function buildclickplanemesh(){
    
    clickgeometry = new THREE.PlaneBufferGeometry( targetmap.xside, targetmap.yside, targetmap.xres,targetmap.yres);
    var cctx = clickplanecanvas.getContext("2d");
    clickcanvastexture = new THREE.CanvasTexture(cctx.canvas);
    clickmaterial = new THREE.MeshStandardMaterial({
  
        color: 'white',
        map: clickcanvastexture,
        wireframe: false,
        transparent: true,
        opacity:0.95
    })


    scene.remove(clickmesh);
    clickmesh = new THREE.Mesh(clickgeometry,clickmaterial);




    clickmesh.name = "clickplane";
    //cmesh.position.y =0.16;
    scene.add(clickmesh);
    clickmesh.position.y =0.01;
    clickmesh.rotation.x =-1.5707;
}

function clickplaneonclick(underelements){

    if(underelements.length>2){
    let target = underelements[2];
        if(target.object.name !="clickplane" &&underelements.length>3) target = underelements[3];
        if(visible && target.object.name =="clickplane"){
            const targetpos =  target.point;
            markerposition.set( targetpos.x,targetpos.y,targetpos.z);
            const obj = scene.getObjectByName("hitpositionmesh");
            obj.position.set( targetpos.x,targetpos.y,targetpos.z);
            switchpixel(targetpos);
        }
    }
}

function switchpixel(position){
   let absxpos = (position.x+targetmap.xside/2)*(targetmap.xres/targetmap.xside);
   let abszpos = (position.z+targetmap.yside/2)*(targetmap.yres/targetmap.yside);
    console.log(parseInt(absxpos)+" <> "+parseInt(abszpos));
    //( targetmap.xside, targetmap.yside, targetmap.xres,targetmap.yres);
    updateclickplanepixel(parseInt(absxpos),parseInt(abszpos),true)

}

function updateclickplanepixel(x,y,isclickable){
    var cctx = clickplanecanvas.getContext("2d");
    var imgData = cctx.getImageData(x, y, 1, 1);
	const red = imgData.data[0];
    if(red==0)  cctx.fillStyle = "rgba("+255+","+255+","+255+","+255+")";
    else cctx.fillStyle = "rgba("+0+","+0+","+0+","+255+")";
    cctx.fillRect( x, y, 1, 1 );
    clickcanvastexture.needsUpdate = true;
}

function setvisible(){
    if(visible){
        visible = false;
        clickmesh.visible = false;
    }
    else{
        visible = true;
        clickmesh.visible = true;
    }
}

function postitionthetank(underelements){
    if(underelements.length>2){
        let target = underelements[2];
            if(target.object.name !="clickplane" &&underelements.length>3) target = underelements[3];
            if(visible && target.object.name =="clickplane" && !tankishidden){
                const targetpos =  target.point;
                lasposition = tangmanager.settankposition(targetpos.x,targetpos.y,targetpos.z);
            }
        }



}


//-----------------------------------


//layout init and show/hide functions

function showheightmaplayout(){
    buildinitheightdatgui();
}
function showtexturelayout(){
    buildtexturedatgui();
}
function showaesteticlayout(){
    buildbuildingdatgui();
}
function showclickplanelayout(){
    buildclickplanedatgui();
}



//settingsbuttons calls
function settingscalls(buttonid){
    if(buttonid == "setsizebutton"){
        let newxsize = parseInt(document.getElementById("xpos").value);
        let newysize = parseInt(document.getElementById("ypos").value);
        targetmap.setsize(newxsize,newysize);
        shaderscene.resizeplane(newxsize,newysize);
        //targetmap.updategeometrysize();
        targetmap.creategeometry();
        targetmap.createmap();
    }
    if(buttonid == "resetbutton"){
        switch(edditormode) {
            case 0:
            break;
            case 1:
               
            break;
            case 2:
               
            break;
            case 3:
              
            break;
        }
    }

}export { settingscalls};


