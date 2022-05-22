import * as Scenehandler from '/js/scenehandler.js'
import * as gamefunctions from '/js/gamefunctions.js'
import * as animationManager from '/js/animationmanager.js'

function initmarketpage() {
    gamefunctions.setactualroom("marketroom"); 
    Scenehandler.underconstruction().underconstructioncheck("marketroom");
    //animationManager.commandtoanimpoolelement("open",true,Scenehandler.showscene,["marketroom"]);
    //animationManager.addcommandtoanimation("maintimeline","open",true,Scenehandler.showscene,["marketroom"]);
    //Scenehandler.playtheanimation("screendoor","maintimeline","open",0);
    //gamefunctions.inroom(true);
    //let custom1 = document.getElementById("custommess")
    //custom1.innerHTML = "Market page was called"
}export { initmarketpage };