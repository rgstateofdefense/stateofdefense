import { initnftpage } from './menubuttoncalls/nftbutton.js'
import { initmarketpage } from './menubuttoncalls/marketbutton.js'
import { initduelpage } from './menubuttoncalls/duelbutton.js'
import { initwarpage } from './menubuttoncalls/warbutton.js'
import { initaboutpage } from './menubuttoncalls/aboutbutton.js'
import { leaveroom } from './menubuttoncalls/leaveroom.js'
import {init3dengine} from '../3dengine.js'
import * as loadingmanager from '../loadingmanager.js'
import * as gamefunctions from '../gamefunctions.js'
//buildlayoutdiv();

init3dengine(false,true);
loadingmanager.createloadscreen("mainmenu");
loadingmanager.loadstate("mainmenu");

document.getElementById("nftbutton").addEventListener("click", nftpagecall);
document.getElementById("marketbutton").addEventListener("click", marketpagecall);
document.getElementById("duelbutton").addEventListener("click", duelpagecall);
document.getElementById("warbutton").addEventListener("click", warpagecall);
document.getElementById("aboutbutton").addEventListener("click", aboutpagecall);

document.getElementById("marketbutton").style.pointerEvents = 'none'; 
document.getElementById("duelbutton").style.pointerEvents = 'none'; 
document.getElementById("marketbutton").style.color = "#666666"; 
document.getElementById("duelbutton").style.color = "#666666"; 


let custom1 = document.getElementById("custommess")
//custom1.innerHTML = "initial was successfull"

function nftpagecall() {
  clearselected()
  let actualbutton = document.getElementById("nftbutton");
  actualbutton.className += " active";
  if(gamefunctions.getactualroom() == "nftroom") return;
  leaveroom();
  preliminaries("nftroom");
  initnftpage();
}

function marketpagecall() {
  clearselected()
  let actualbutton = document.getElementById("marketbutton");
  actualbutton.className += " active";
  if(gamefunctions.getactualroom() == "marketroom") return;
  leaveroom();
  preliminaries("marketroom");
  initmarketpage();
}

function duelpagecall() {
  clearselected()
  let actualbutton = document.getElementById("duelbutton");
  actualbutton.className += " active";
  if(gamefunctions.getactualroom() == "duelroom") return;
  leaveroom();
  preliminaries("duelroom");
  initduelpage();
}

function warpagecall() {
  clearselected()
  let actualbutton = document.getElementById("warbutton");
  actualbutton.className += " active";
  if(gamefunctions.getactualroom() == "warroom") return;
  leaveroom();
  preliminaries("warroom");
  initwarpage();
}

function aboutpagecall() {
  //clearselected()
  let actualbutton = document.getElementById("aboutbutton");
  if(actualbutton.classList.contains("paperactive")){
    actualbutton.className =actualbutton.className.replace(" paperactive", "");
    initaboutpage(false);
  }
  else{
    actualbutton.className += " paperactive";
    initaboutpage(true);
  } 
}

function WriteToFile() {
  var fso = new ActiveXObject("Scripting.FileSystemObject");
  var fh = fso.CreateTextFile("./Test.txt", 8, true);
  fh.WriteLine("foo");
  fh.writeline("-----------------------------");
  fh.Close();
}




function clearselected(){
  var current = document.getElementsByClassName("active");
  // If there's no active class
    for (let k of current) {
    //console.log(k.id+" was removed from active")
    k.className = k.className.replace(" active", "");
  }
}

function preliminaries(roomname)
{
  //Scenehandler.underconstruction().underconstructioncheck(roomname);

}

function buildlayoutdiv(){

  const menuobj = document.querySelector('#threedcanvas');
  const rect = menuobj.getBoundingClientRect();
  const canvaswidth = rect.width;
  const canvasheight = rect.height;
  const canvasleft =rect.left;
  const canvastop =rect.top;

  var layoutLayer = document.createElement('div');
  layoutLayer.id = 'layoutLayer';
  layoutLayer.style.position = 'absolute';
  layoutLayer.style.left = canvasleft+'px';
  layoutLayer.style.top = canvastop+'px';
  layoutLayer.style.width = canvaswidth+'px';
  layoutLayer.style.height = canvasheight+'px';
  layoutLayer.style.padding = '0px';
  layoutLayer.style.opacity = 1;
  layoutLayer.style.background = '#00000001';
  document.body.appendChild(layoutLayer);

}