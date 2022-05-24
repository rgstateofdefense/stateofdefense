import {init3dengine,setcameraposition,setcamerarotation,setcamerafov} from '/js/3dengine.js'
import * as loadingmanager from '../loadingmanager.js'
import * as Scenehandler from '../scenehandler.js'
//import {addkeyfunction} from  '../controlhandler.js'
init3dengine(false,true);


setcameraposition(0,30,0);
setcamerarotation(-1,0,0);
setcamerafov(45);
await loadingmanager.loadstate("mapeditor").then (()=>{heightgen()});

document.getElementById("heightgen").addEventListener("click", heightgen);
document.getElementById("texturegen").addEventListener("click", texturegen);
document.getElementById("aebuildinggen").addEventListener("click", aebuildinggen);
document.getElementById("clickmapgen").addEventListener("click", clickmapgen);

document.getElementById("switchgrid").addEventListener("click", switchgrid);
document.getElementById("settings").addEventListener("click", settings);
document.getElementById("showresult").addEventListener("click", showresult);



const onClick = (event) => {
  if(event.srcElement.type == 'number' || event.srcElement.type == 'text') event.srcElement.focus();
  if(event.srcElement.type == 'button') Scenehandler.scene("mapeditormain").settingscalls(event.srcElement.id);
}
  window.addEventListener('click', onClick);

//canvasDiv.addEventListener('mousedown', onDocumentMouseDown, false);
//canvasDiv.addEventListener('mousedown', onDocumentMouseDown, false);

function heightgen() {
  clearselected();
  Scenehandler.scene("mapeditormain").seteditormode(0);
  let actualbutton = document.getElementById("heightgen");
  actualbutton.className += " active";
}
function texturegen() {
  clearselected();
  Scenehandler.scene("mapeditormain").seteditormode(1);
  let actualbutton = document.getElementById("texturegen");
  actualbutton.className += " active";
}
function aebuildinggen() {
  clearselected();
  Scenehandler.scene("mapeditormain").seteditormode(2);
  let actualbutton = document.getElementById("aebuildinggen");
  actualbutton.className += " active";
}
function clickmapgen() {
  clearselected();
  Scenehandler.scene("mapeditormain").seteditormode(3);
  let actualbutton = document.getElementById("clickmapgen");
  actualbutton.className += " active";
}


function switchgrid() {
    Scenehandler.scene("mapeditormain").setgrid();
  }

  function settings() {
    let actualbutton = document.getElementById("settings");
    let actualdivfield = document.getElementById("settingslayer");
    if(actualbutton.classList.contains("settingsactive")){
      actualbutton.className =actualbutton.className.replace(" settingsactive", "");
      actualdivfield.style.width = '0%';
      actualdivfield.style.height = '0%';
    }
    else{
      actualbutton.className += " settingsactive";
      actualdivfield.style.width = '20%';
      actualdivfield.style.height = '50%';
    } 
  }

  function showresult() {
    Scenehandler.scene("mapeditormain").showhideresult();
    let actualbutton = document.getElementById("showresult");
    let actualdivfield = document.getElementById("resultlayer");
    if(actualbutton.classList.contains("resultactive")){
      actualbutton.className =actualbutton.className.replace(" resultactive", "");
      
      actualdivfield.style.width = '0%';
      actualdivfield.style.height = '0%';

    }
    else{
      actualbutton.className += " resultactive";
      actualdivfield.style.width = '40%';
      actualdivfield.style.height = '99.5%';
    } 
  }


  function clearselected(){
    var current = document.getElementsByClassName("active");

    // If there's no active class
      for (let k of current) {
      //console.log(k.id+" was removed from active")
      k.className = k.className.replace(" active", "");
    }
  }