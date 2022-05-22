import * as THREE from 'https:/unpkg.com/three@0.126.1/build/three.module.js'
import * as Gamesystem from '../js/3dengine.js'
/*
const rect = menuobj.getBoundingClientRect();
const menubottom = rect.bottom-3;
const menuleft = rect.left;
*/
var clock = new THREE.Clock();

const canvasdiv = document.querySelector('#canvasdiv');
var rect = canvasdiv.getBoundingClientRect();
const canvastop = rect.top;//-3;
const canvasleft = rect.left;


const canvaswidth =rect.right-rect.left;
const canvasheight =rect.bottom-rect.top;
/*
console.log(rect.top, rect.right, rect.bottom, rect.left);

console.log("controlroom");
console.log(rect.top, rect.right, rect.bottom, rect.left);
*/


const raycaster = new THREE.Raycaster();
let clickedundermouseelements = [];
let movedundermouseelements = [];
let disabledobjectslist = ["relativeposplane"];
let onclickfunctions = [];
let movefunctions =[];
const mouse = new THREE.Vector2();
let lastcalledonmove = "";
let controlenabled = true;
let mousedown = false;

var clicklistdict = {};
var mousebuttonclicklistdict = {};
var keylistdict = {};
var keyState = {};
let perssedkeys = 0;
let clickindicatoractive = true;


window.addEventListener('mousemove',(event)=>{
    mouse.x = ((event.clientX-canvasleft)/(canvaswidth))*2-1;
    mouse.y = -((event.clientY-canvastop)/(canvasheight))*2+1;
    //console.log(event.clientX-menuleft);
    movedundermouseelements = fetchallundermouseelement();
    for (const index in movefunctions) {
        movefunctions[index](mouse);
    
    }
    checkforonmovefunctioncall();
    rotationupdate(event);
    if(clickindicatoractive) clickableindicator();
})
window.addEventListener('click',(event)=>{
    clickedundermouseelements = fetchallundermouseelement();
    checkforclickfunctioncall();

})
window.addEventListener('pointerdown',(event)=>{
    //console.log(event.button);
    clickedundermouseelements = fetchallundermouseelement();
    checkforonclickrotateobject();
    checkforspecificbuttonclick(event);

})

window.addEventListener('keydown',(event)=>{
    keyState[event.key] = true;
    perssedkeys++;
    start();
 })
 window.addEventListener('keyup',(event)=>{
    keyState[event.key] = false;
    perssedkeys--;
    if (perssedkeys == 0) stop();
 })

function checkforclickfunctioncall(){
    if(!iscontrolenabled()) return;
    //onclickfuntion calls
    for (const [key, value] of Object.entries(clicklistdict)) {     
        value(clickedundermouseelements);
    }
    //objects with functions
    for (const index in clickedundermouseelements) {

      
        if(!clickedundermouseelements[index].object.visible || !clickedundermouseelements[index].object.parent.visible) continue;
        const name = clickedundermouseelements[index].object.name;
        const parentname = clickedundermouseelements[index].object.parent.name;
        if(disabledobjectslist.includes(name) || disabledobjectslist.includes(parentname)) continue;
        let variables = [];
        if(typeof clickedundermouseelements[index].object.onclickcall!="undefined" ){
            if(typeof clickedundermouseelements[index].object.onclickvars!="undefined" )
                variables = clickedundermouseelements[index].object.onclickvars;
            clickedundermouseelements[index].object.onclickcall(variables);
        }
        if(typeof clickedundermouseelements[index].object.parent.onclickcall!="undefined"){
            if(typeof clickedundermouseelements[index].object.parent.onclickvars!="undefined" )
                variables = clickedundermouseelements[index].object.parent.onclickvars;
            clickedundermouseelements[index].object.parent.onclickcall(variables); 
        }
        return;
    }
}

function checkforonmovefunctioncall(){
    if(!iscontrolenabled()) return;
    for (const index in movedundermouseelements) {
        if(!movedundermouseelements[index].object.visible || !movedundermouseelements[index].object.parent.visible) continue;
        const name = movedundermouseelements[index].object.name;
        const parentname = movedundermouseelements[index].object.parent.name;
        if(disabledobjectslist.includes(name) || disabledobjectslist.includes(parentname)) continue;
        if(typeof movedundermouseelements[index].object.onmovecall!="undefined" && name !=lastcalledonmove){
            lastcalledonmove = name;
            movedundermouseelements[index].object.onmovecall();
        }
        if(typeof movedundermouseelements[index].object.parent.onmovecall!="undefined" && parentname !=lastcalledonmove){
            lastcalledonmove = parentname;
            movedundermouseelements[index].object.parent.onmovecall(); 
        }
        return;
    }
}
function checkforonclickrotateobject(){
    if(!iscontrolenabled()) return;
    for (const index in movedundermouseelements) {
        if(!movedundermouseelements[index].object.visible || !movedundermouseelements[index].object.parent.visible) continue;
        const name = movedundermouseelements[index].object.name;
        const parentname = movedundermouseelements[index].object.parent.name;
        if(disabledobjectslist.includes(name) || disabledobjectslist.includes(parentname)) continue;

        let row = onclickrotationlist.findIndex(row => row.includes(name));
        if(row == -1) row = onclickrotationlist.findIndex(row => row.includes(parentname));
        if(row == -1) continue;
        mouserotateobject(onclickrotationlist[row][0],onclickrotationlist[row][1],onclickrotationlist[row][2]);
        onclickmode = true;
        return;
    }
}
function checkforspecificbuttonclick(event){

    if(!iscontrolenabled()) return;
    //onclickfuntion calls
    for (const [key, value] of Object.entries(mousebuttonclicklistdict)) {     
        if(value[0] == event.button )value[1](clickedundermouseelements);
    }
}


function fetchallundermouseelement(){
        const camera = Gamesystem.getcamera();
        const scene  = Gamesystem.getscene();
        raycaster.setFromCamera(mouse,camera);
        const meshlist =getallmesh();
        const positionhit = raycaster.intersectObjects(meshlist);    
        return positionhit;
}
function getallmesh(){
    const scene = Gamesystem.getscene();
    return getallmeshreq(scene.children);
}
function getallmeshreq(group){
    let finalmeshlist = []; 
    for (const index in group) {
        if(group[index].type =="Group") {
           const partialmeshlist = getallmeshreq(group[index].children);
            for (const pindex in partialmeshlist) {
                finalmeshlist.push(partialmeshlist[pindex]); 
            }
        }
        else{
            if(group[index].type == "Mesh") finalmeshlist.push(group[index]);  
        }       
    }
    return finalmeshlist;
}
function getrealnames(elementslist,justthefirst){
    let fulllist = [];
    for (const index in elementslist) {
        let meshname = "";
        if(!elementslist[index].object.visible || !elementslist[index].object.parent.visible) continue;
        if(elementslist[index].object.parent.name == "" || 
           typeof elementslist[index].object.parent.name == "undefined" ||
           elementslist[index].object.geometry.type !="BufferGeometry") meshname = elementslist[index].object.name;
        else meshname =  elementslist[index].object.parent.name;
        if(!fulllist.includes(meshname) && !disabledobjectslist.includes(meshname))
        {

            fulllist.push(meshname);
            if(justthefirst) return fulllist;
        }
    }
    return fulllist;
}
function getallundermouseelements(clicked){
    if(clicked){
        return getrealnames(clickedundermouseelements,false);
    }
    else{
        return getrealnames(movedundermouseelements,false);
    }

}export{getallundermouseelements}
function gettopundermouseelements(clicked){
    let result = [];
    if(clicked){
        if(clickedundermouseelements.length ==0) return "";   

        result = getrealnames(clickedundermouseelements,true);
    }
    else{
        if(movedundermouseelements.length ==0) return ""; 
        result = getrealnames(movedundermouseelements,true);
    }

    return result[0];

}export{gettopundermouseelements}

function adddisabledobject(objectname){
    if(!disabledobjectslist.includes(meshname)) disabledobjectslist.push(objectname);

}export{adddisabledobject}

function removedisabledobject(objectname){
    const index = disabledobjectslist.indexOf(objectname);
    if (index > -1) {
        disabledobjectslist.splice(index, 1);
    }
}export{removedisabledobject}

function addmovefunction(thefunction){
    if(!movefunctions.includes(thefunction)) movefunctions.push(thefunction);

}export{addmovefunction}

function removemovefunction(thefunction){
    const index = movefunctions.indexOf(thefunction);
    if (index > -1) {
        movefunctions.splice(index, 1);
    }

}export{removemovefunction}

function enablecontrol(){

    controlenabled = true;
}export{enablecontrol}
function disablecontrol(){
    controlenabled = false;
}export{disablecontrol}

function iscontrolenabled(){
    return controlenabled;

}export{iscontrolenabled}


document.body.onmousedown = function(event) { 
    event.preventDefault();
    mousedown = true;
    previousMousePosition = {
        x: event.offsetX,
        y: event.offsetY
    };
}
document.body.onmouseup = function(event) {
    event.preventDefault();
    mousedown = false;
    if(onclickmode) disablemouserotation()
}
document.documentElement.addEventListener('mouseleave', () => {
    mousedown = false;
    
});


function iskeypressed(key){
    if(key in keyState && keyState[key]) return true; 
    return false;
}export{iskeypressed}

var mgrrequestid;
let startTime = 0;
let loopcounttime = 0; 
let loopcount = 0;
function keydowncheck(){
    mgrrequestid = undefined;
    //const deltatime = clock.getDelta();
    const deltatime = performance.now()- startTime;
    loopcounttime+= deltatime;
    loopcount++;
    
    for (const [key, value] of Object.entries(keyState)) {
        //console.log(key, value);
        if(!value) continue;
        if(keylistdict.hasOwnProperty(key) && keylistdict[key][0] == true){
            keylistdict[key][1](key);
            if(loopcounttime>1000) 
            {
                //console.log("loopcall: "+loopcount+" Passed time:"+loopcounttime);
                loopcounttime = 0; 
                loopcount = 0;

            }
            //console.log("command called yay at character "+key);
        }
    }
    if (document.hidden){
        perssedkeys = 0;
    }
    start();
    startTime = performance.now();

}
function start() {
    if (!mgrrequestid) {
        mgrrequestid = window.requestAnimationFrame(keydowncheck);
        startTime = performance.now();
    }
}
function stop() {
    if (mgrrequestid) {
       window.cancelAnimationFrame(mgrrequestid);
       mgrrequestid = undefined;
    }
}


function addkeyfunction(key,thefunction,enabled){
    keylistdict[key] = [enabled,thefunction];
}export{addkeyfunction}


function removekey(key){
    delete keylistdict[key];
}export{removekey}

function disblekey(key){
    if(keylistdict.hasOwnProperty(key)){
        keylistdict[key][0] = false;
    }
}export{disblekey}

function enablekey(key){
    if(keylistdict.hasOwnProperty(key)){
        keylistdict[key][0] = true;
    }
}export{enablekey}

function clearkeylist(){
    for (var prop in keylistdict) {
        if (keylistdict.hasOwnProperty(prop)) {
            delete keylistdict[prop];
        }
    }
}export{clearkeylist}

function addclickfunction(name,thefunction){
    clicklistdict[name] = thefunction;

}export{addclickfunction}

function removeclickfunction(name){
    delete clicklistdict[name];

}export{removeclickfunction}



function addmousebutttonfunction(name,button,thefunction){
    let buttonnumber = button;
    if(typeof button == "string"){
        if(button == "left") buttonnumber = 0;
        else if(button == "right") buttonnumber = 2;
        else if(button == "left")buttonnumber = 1;
    }
    mousebuttonclicklistdict[name] = [buttonnumber,thefunction];

}export{addmousebutttonfunction}

function removemousebutttonfunction(name){
    delete mousebuttonclicklistdict[name];

}export{removemousebutttonfunction}





let onclickrotationlist = [];
let onclickmode = false;
let rotationtarget;
let isrotating = false;
//angle per pixel
let rotationsxpeed = 0;
let rotationsypeed = 0;
var isDragging = false;
function disablemouserotation(){
    rotationtarget = "";
    isrotating = false;
    onclickmode = false;
}export { disablemouserotation };

function mouserotateobject(name,xspeed,yspeed){
    const scene = Gamesystem.getscene();
    var target = scene.getObjectByName(name);
    if(typeof target == undefined) return;
    rotationtarget = target;
    isrotating = true;
    rotationsxpeed = xspeed;
    rotationsypeed = yspeed

}export { mouserotateobject };

function addonclickrotateobject(name,xspeed,yspeed){
    const row = onclickrotationlist.findIndex(row => row.includes(name));
    if(row == -1) onclickrotationlist.push([name,xspeed,yspeed]);
}export { addonclickrotateobject };
function removeonclickrotateobject(name){
    const row = onclickrotationlist.findIndex(row => row.includes(name));
    if(row != -1) onclickrotationlist.splice(row,1);
}export { removeonclickrotateobject };

var previousMousePosition = {
    x: 0,
    y: 0
};
function rotationupdate(event){
    if(isrotating&&mousedown){
        
       /*
        if(rotationsxpeed>0){
            const differx = event.offsetX-previousMousePosition.x;
            const eanglex = differx*(0.01745*rotationsxpeed);
            rotationtarget.rotation.y +=eanglex;
        }
        if(rotationsypeed>0){
            const differy = event.offsetY-previousMousePosition.y;
            const eangley = differy*(0.01745*rotationsypeed);
            rotationtarget.rotation.x +=eangley;
        }
        */
        const differx = event.offsetX-previousMousePosition.x;
        const differy = event.offsetY-previousMousePosition.y;
        const eanglex = differx*(rotationsxpeed);
        const eangley = differy*(rotationsypeed);
        var deltaRotationQuaternion = new THREE.Quaternion()
        .setFromEuler(new THREE.Euler(
            toRadians(eangley),
                toRadians(eanglex),
            0,
            'XYZ'
        ));
    
        rotationtarget.quaternion.multiplyQuaternions(deltaRotationQuaternion, rotationtarget.quaternion);
        
        previousMousePosition = {
            x: event.offsetX,
            y: event.offsetY
        };
        
        //console.log(previousMousePosition.x);
    }
}
function toRadians(angle) {
	return angle * (Math.PI / 180);
}

function toDegrees(angle) {
	return angle * (180 / Math.PI);
}

let lastobject = "";
let isactive = false;

function enableclickindicator(){
    clickindicatoractive = true;
}export { enableclickindicator };

function disbaleclickindicator(){
    clickindicatoractive = false;
}export { disbaleclickindicator };

function clickableindicator(){
    if(!iscontrolenabled() || movedundermouseelements.length == 0) return;
    for(let i=0;i<movedundermouseelements.length;i++){
        if(!movedundermouseelements[i].object.visible || !movedundermouseelements[i].object.parent.visible) continue;
        const name = movedundermouseelements[i].object.name;
        const parentname = movedundermouseelements[i].object.parent.name;
        if(disabledobjectslist.includes(name) || disabledobjectslist.includes(parentname)) continue;
        const topelement = movedundermouseelements[i];
        if(typeof topelement.object.onclickcall!="undefined" || typeof topelement.object.parent.onclickcall!="undefined" ){ 
            if(lastobject == topelement.object.name || lastobject == topelement.object.parent.name) {
                if(!isactive){
                    isactive = true;
                    setclickmouse(true);
                }
            }
            else if(!isactive){
                isactive = true;
                lastobject = topelement.object.name;
                setclickmouse(true);
                
            }
            return;
        }
    }
    if(isactive){
        isactive = false;
        lastobject = "";
        setclickmouse(false);
    }
}


function setclickmouse(isclickmode){
   if(isclickmode) document.body.style.cursor = "pointer";
   else document.body.style.cursor = "default";
}

