import * as animationManager from '../animationmanager.js'
let actualstate = "";


function createloadscreen(gamestate){
    if(gamestate =="mainmenu"){
        actualstate = gamestate;
        createmainscreen();
    }
    else if(gamestate =="battle"){;
    }
}export{createloadscreen};
function clearloadscreen(){
    if(actualstate =="mainmenu"){
        clearmainloadscreen();
    }
    else if(actualstate =="battle"){
    }
    actualstate = "";
}export{clearloadscreen};




function createmainscreen(){

    const div = document.createElement("div");
    const h1 = document.createElement("h1");
    var t = document.createTextNode("Loading");
   
    h1.appendChild(t);
    h1.style.position = 'fixed';
    h1.style.top= '50%';
    h1.style.left= '47%';
    const layoutLayer = document.querySelector('#layoutLayer');
    layoutLayer.style.background = '#000000ff';
    layoutLayer.style.opacity = 1; 
    layoutLayer.appendChild(h1);


    document.getElementById("nftbutton").style.color = "#666666"; 
    document.getElementById("marketbutton").style.color = "#666666"; 
    document.getElementById("duelbutton").style.color = "#666666"; 
    document.getElementById("warbutton").style.color = "#666666"; 
    document.getElementById("aboutbutton").style.color = "#666666";

    document.getElementById("nftbutton").style.pointerEvents = 'none'; 
    document.getElementById("marketbutton").style.pointerEvents = 'none'; 
    document.getElementById("duelbutton").style.pointerEvents = 'none'; 
    document.getElementById("warbutton").style.pointerEvents = 'none'; 
    document.getElementById("aboutbutton").style.pointerEvents = 'none';


}

function clearmainloadscreen(){
    document.getElementById("nftbutton").style.color = "#ffffff"; 
    //document.getElementById("marketbutton").style.color = "#ffffff"; 
    //document.getElementById("duelbutton").style.color = "#ffffff"; 
    document.getElementById("warbutton").style.color = "#ffffff"; 
    document.getElementById("aboutbutton").style.color = "#ffffff";

    document.getElementById("nftbutton").style.pointerEvents = 'auto'; 
    //document.getElementById("marketbutton").style.pointerEvents = 'auto'; 
    //document.getElementById("duelbutton").style.pointerEvents = 'auto'; 
    document.getElementById("warbutton").style.pointerEvents = 'auto'; 
    document.getElementById("aboutbutton").style.pointerEvents = 'auto';  



    const timeline = animationManager.gettimeline("layoutscreentimeline");
    timeline.addcommandtoanimation("fadeoutlayer",false,hidelayer,[]);
    timeline.addanimation("fadeoutlayer",fadeoutlayer);
    timeline.startanimationchain();
    layoutLayer.innerHTML = ""; 

}

function fadeoutlayer(timeline){
    const layoutLayer = document.querySelector('#layoutLayer');

    timeline.to(layoutLayer.style,{duration:0.8,opacity: 0.0});
    //layoutLayer.style.opacity = 0.5;

}

function hidelayer(){
    const layoutLayer = document.querySelector('#layoutLayer');
    //layoutLayer.style.width = '0%';
    //layoutLayer.style.height = '0%';
    layoutLayer.style.background = '#00000001';
    layoutLayer.innerHTML = ""; 
    
}