import * as THREE from 'https:/unpkg.com/three@0.126.1/build/three.module.js'
import { gsap } from 'https://unpkg.com/gsap@3.9.1/gsap-core.js'
import * as gamefunctions from '/js/gamefunctions.js'
import * as Loadingmanager from '/js/loadingmanager.js'
import * as threeengine from '/js/3dengine.js'
import * as animationManager from '/js/animationmanager.js'

let objsexists = false;
function sceneexist(){
    return objsexists;
}export { sceneexist};

async function build(hideit)
{
   
    const scene = threeengine.getscene();
    if(objsexists) return;
    animationManager.createtimeline("cardtimeline");
    const textureloader = new THREE.TextureLoader();
    const basetank = textureloader.load("./textures/texture/testtank.png");
    const nftholdertexture = textureloader.load("./textures/texture/Greeble_Techno_001_basecolor.jpg");

    const nftholdermaterial = new THREE.MeshStandardMaterial({
        color: 'white',
        map: nftholdertexture,
        metalness: 0.1,
        roughness: 0.4
    })

    const nftholderscreen1material = new THREE.MeshStandardMaterial({
        color: 'white',
        map: basetank,
        metalness: 0.0,
        roughness: 0.1
    })
    nftholderscreen1material.name = "nftholderscreen1material";

    const nftholderscreen2material = new THREE.MeshStandardMaterial({
        color: 'white',
        map: basetank,
        metalness: 0.0,
        roughness: 0.1
    })
    nftholderscreen2material.name = "nftholderscreen2material";

    const nftholder01 = await Loadingmanager.loadgltf("./models/nftholder.glb");
    nftholder01.name = "nftholder01";
    nftholder01.traverse ( ( o ) => { if ( o.isMesh ) {
        o.material = nftholdermaterial;
    }});
    nftholder01.position.set(0,0.105,-0.2);
    nftholder01.scale.set(0.3,0.3,0.1);
    const camera = threeengine.getcamera();
    nftholder01.lookAt(0,0,2.2);




    const nftholderscreen01 = await Loadingmanager.loadgltf("./models/nftholderscreen.glb");
    nftholderscreen01.name = "nftholderscreen01";
    nftholderscreen01.traverse ( ( o ) => { if ( o.isMesh ) {
        o.material = nftholderscreen1material;
    }});
    nftholderscreen01.position.set(0,0.105,-0.2);
    nftholderscreen01.scale.set(0.3,0.3,0.1);
    nftholderscreen01.lookAt(0,0,2.2);
    nftholderscreen01.onclickcall = replacenft;
    nftholderscreen01.onclickvars = nftholderscreen01.name;
    //nftholderscreen01.onmovecall = testmove2;

    const nftholder02 = await Loadingmanager.loadgltf("./models/nftholder.glb");
    nftholder02.name = "nftholder02";
    nftholder02.traverse ( ( o ) => { if ( o.isMesh ) {
        o.material = nftholdermaterial;
    }});
    nftholder02.position.set(0,0.105,-0.2);
    nftholder02.scale.set(0.3,0.3,0.1);
    nftholder02.lookAt(0,0,2.2);

    const nftholderscreen02 = await Loadingmanager.loadgltf("./models/nftholderscreen.glb");
    nftholderscreen02.name = "nftholderscreen02";
    nftholderscreen02.traverse ( ( o ) => { if ( o.isMesh ) {
        o.material = nftholderscreen2material;
    }});
    nftholderscreen02.position.set(0,0.105,-0.2);
    nftholderscreen02.scale.set(0.3,0.3,0.1);
    nftholderscreen02.lookAt(0,0,2.2);
    nftholderscreen02.onclickcall = replacenft;
    nftholderscreen02.onclickvars = nftholderscreen02.name;

    const nftholder01group = new THREE.Group();
    nftholder01group.add( nftholder01 );
    nftholder01group.add( nftholderscreen01 );
    scene.add(nftholder01group)

    const nftholder02group = new THREE.Group();
    nftholder02group.add( nftholder02 );
    nftholder02group.add( nftholderscreen02 );
    scene.add(nftholder02group)


    threeengine.addtocameragroup(nftholder01group);
    threeengine.addtocameragroup(nftholder02group);

    //nftcardbuttons
    const uparrowmaterial = new THREE.MeshStandardMaterial({
        color: 'blue',
        //metalness: 0.0,
        //roughness: 0.1
    })
    const uparrow = await Loadingmanager.loadgltf("./models/Arrow.glb");
    uparrow.name = "uparrow";
    uparrow.traverse ( ( o ) => { if ( o.isMesh ) {
        o.material = uparrowmaterial;
    }});
    uparrow.position.set(-0.155,-0.06,-0.2);
    uparrow.scale.set(0,0,0);
    threeengine.addtocameragroup(uparrow);

    const downarrowmaterial = new THREE.MeshStandardMaterial({
        color: 'blue',
        //metalness: 0.0,
        //roughness: 0.1
    })
    const downarrow = await Loadingmanager.loadgltf("./models/Arrow.glb");
    downarrow.name = "downarrow";
    downarrow.traverse ( ( o ) => { if ( o.isMesh ) {
        o.material = downarrowmaterial;

    }});
    downarrow.position.set(-0.155,-0.14,-0.2);
    downarrow.scale.set(0,0,0);
    downarrow.rotation.z =3.18;
    threeengine.addtocameragroup(downarrow);

    const xbuttonmaterial = new THREE.MeshStandardMaterial({
        color: 'red',
        //metalness: 0.0,
        //roughness: 0.1
    })
    const xbutton = await Loadingmanager.loadgltf("./models/Xbutton.glb");
    xbutton.name = "xbutton";
    xbutton.traverse ( ( o ) => { if ( o.isMesh ) {
        o.material = xbuttonmaterial;
    }});
    xbutton.position.set(-0.155,-0.10,-0.2);
    xbutton.scale.set(0,0,0);
    xbutton.onclickcall = replacenft;
    xbutton.onclickvars = "closeit";
    threeengine.addtocameragroup(xbutton);
    

    const boundingBox = new THREE.Box3().setFromObject(nftholder01);
    const size = boundingBox.getSize();

    let pos = await threeengine.getrelativeposition(-0.2,1,0);
    
    nftholder01group.position.x = pos.x-(size.x/1.6);
    nftholder02group.position.x =  nftholder01group.position.x-(size.x*1.1);
    //cardlister
    //createcards();
    createcardshowset();

    if(hideit) hide();
    objsexists = true;
}export { build};


const workobjs = ["nftholder01","basetank"]; 
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
    const scene = threeengine.getscene();
    if(animationname =="showcards" )
    {
        const timeline = animationManager.gettimeline(timelinename);
        timeline.addanimation("showcards",showcards);
        timeline.startanimationchain();
    }
    if(animationname =="hidecards")
    {
        const timeline = animationManager.gettimeline(timelinename);
        timeline.addanimation("hidecards",hidecards);
        timeline.startanimationchain();
    }
    if(animationname =="showbuttons" )
    {
        const timeline = animationManager.gettimeline(timelinename);
        timeline.addanimation("showbuttons",showbuttons);
        timeline.startanimationchain();
    }
    if(animationname =="hidebuttons" )
    {
        const timeline = animationManager.gettimeline(timelinename);
        timeline.addanimation("hidebuttons",hidebuttons);
        timeline.startanimationchain();
    }
}export { playanimation};



let cardselectoractive = false;
let targetholder = "";
function replacenft(holderdname){
    if(holderdname =="closeit") {
        replacenft(targetholder);
        return;
    }
    if(targetholder != holderdname){
        
        targetholder = holderdname;
        if(!cardselectoractive) {
            cardselectoractive = true;
            playanimation("cardtimeline","showcards",0);
            playanimation("cardtimeline","showbuttons",0);
        }
    }
    else{
        cardselectoractive = false;
        targetholder = "";
        playanimation("cardtimeline","hidebuttons",0);
        playanimation("cardtimeline","hidecards",0);
    }
    grayoutinactiveholder();
}
async function createcardshowset(){
    const scene = threeengine.getscene();
    const textureloader = new THREE.TextureLoader();
    
    const cardlistholdertexture = textureloader.load("./textures/texture/gamecard.png");
    cardlistholdertexture.name="cardlistholdertexture"; 

    const cardlistholdermaterial = new THREE.MeshStandardMaterial({
        color: 'white',
        map: cardlistholdertexture,
        metalness: 0.5,
        roughness: 0.4

    })

    for(let i =0;i<4;i++)
    {
        const tankimage = textureloader.load("./testdata/nftcards/card"+i+".png");
        tankimage.name="card"+i+"_tank"; 

    const nftholderscreenmaterial = new THREE.MeshStandardMaterial({
        color: 'white',
        map: tankimage
    })



        const card = await Loadingmanager.loadgltf("./models/nftholderscreen.glb");
        card.name = "card"+i;
        card.traverse ( ( o ) => { if ( o.isMesh ) {
            o.material = nftholderscreenmaterial;
        }});
        card.position.set(-0.105+(i*0.07),-0.3,-0.2);
        card.scale.set(0.35,0.35,0.1);
        card.onclickcall = setholdernft;
        card.onclickvars = "card"+i;

        const cardholder = await Loadingmanager.loadgltf("./models/cardcover.glb");
        cardholder.name = "cardholder"+i;
        cardholder.traverse ( ( o ) => { if ( o.isMesh ) {
            o.material = cardlistholdermaterial;
        }});
        cardholder.position.set(-0.105+(i*0.07),-0.3,-0.2);
        cardholder.scale.set(0.35,0.35,0.1);
  



        
        threeengine.addtocameragroup(card);
        threeengine.addtocameragroup(cardholder);
    }
}
function deletecardshowset(){
    const scene = threeengine.getscene();
    for(let i =0;i<4;i++)
    {
        var cardobj = scene.getObjectByName("card"+i);
        if(typeof cardobj!=='undefined') cardobj.parent.remove(cardobj);
        
        var holderobj = scene.getObjectByName("cardholder"+i);
        if(typeof holderobj!=='undefined') holderobj.parent.remove(holderobj);

    }
}

async function setholdernft(cardname){
    gamefunctions.setselectednfttank(cardname,targetholder);
    const scene = threeengine.getscene();
    const camgroup =threeengine.getcameragroup();
    var obj = scene.getObjectByName(cardname);
    //console.log(cardname);
    if(typeof obj!='undefined') 
    {
        //console.log(cardname);
        obj.traverse ( ( o ) => { if ( o.isMesh ) {

            var holderobj = scene.getObjectByName(targetholder);
            holderobj.traverse ( ( h ) => { if ( h.isMesh ) {
                h.material.map = o.material.map;
            }});
        }});
        const{  selecttank,settankname } = await import('./tankscene.js');
        const textureloader = new THREE.TextureLoader();
        //-------get tank data from file
        const data = await fetch("./testdata/nftcards/"+cardname+"data.txt");
        const namenrare = await data.text();
        var namenrarearray = namenrare.split(",");
        //------------------------------
        settankname(namenrarearray[0],namenrarearray[1]);
        const tankimage = textureloader.load("./testdata/nftcards/"+cardname+"texture.jpg");
        selecttank(tankimage);   
    }
}



function grayoutinactiveholder(){
    const scene = threeengine.getscene();
    var holder1obj = scene.getObjectByName("nftholderscreen01");
    var holder2obj = scene.getObjectByName("nftholderscreen02");
    holder1obj.traverse ( ( h1 ) => { if ( h1.isMesh ) {
        h1.material.color.setHex( 0xffffff );
        if(targetholder == "nftholderscreen02")
        {
            h1.material.color.setHex( 0x444444 );
        }
    }});
    holder2obj.traverse ( ( h2 ) => { if ( h2.isMesh ) {
        h2.material.color.setHex( 0xffffff );
        if(targetholder == "nftholderscreen01")
        { 
            h2.material.color.setHex( 0x444444 );
           
        }
    }});
}
function showcards(timeline){
    const scene = threeengine.getscene();
    for(let i =0;i<4;i++){
        var card = scene.getObjectByName("card"+i);
        timeline.to(card.position,{duration:0.7,y:-0.1,ease:"back"},"<+="+(i*0.1)/i);
        var cardholder = scene.getObjectByName("cardholder"+i);
        timeline.to(cardholder.position,{duration:0.7,y:-0.1,ease:"back"},"<");
    }
}
function hidecards(timeline){
    const scene = threeengine.getscene();
    for(let i =0;i<4;i++){
        var card = scene.getObjectByName("card"+i);
        
        timeline.to(card.position,{duration:0.7,y:-0.3},"<+="+(i*0.1)/i);
        var cardholder = scene.getObjectByName("cardholder"+i);
        timeline.to(cardholder.position,{duration:0.7,y:-0.3},"<");
    }
}
function showbuttons(timeline){
    const scene = threeengine.getscene();
    var uparrow = scene.getObjectByName("uparrow");
    timeline.to(uparrow.scale,{duration:0.5,x:0.05,y:0.05,z:0.01});
    var downarrow = scene.getObjectByName("downarrow");
    timeline.to(downarrow.scale,{duration:0.5,x:0.05,y:0.05,z:0.01},"<");
    var xbutton = scene.getObjectByName("xbutton");
    timeline.to(xbutton.scale,{duration:0.5,x:0.05,y:0.05,z:0.01},"<");
}
function hidebuttons(timeline){
    const scene = threeengine.getscene();
    var uparrow = scene.getObjectByName("uparrow");
    timeline.to(uparrow.scale,{duration:0.5,x:0,y:0,z:0});
    var downarrow = scene.getObjectByName("downarrow");
    timeline.to(downarrow.scale,{duration:0.5,x:0,y:0,z:0},"<");
    var xbutton = scene.getObjectByName("xbutton");
    timeline.to(xbutton.scale,{duration:0.5,x:0,y:0,z:0},"<");
}
function nexrowcards(timeline){


}

