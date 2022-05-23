import * as Scenehandler from '../../scenehandler.js'
import * as gamefunctions from '../../gamefunctions.js'
import * as animationManager from '../../animationmanager.js'

function leaveroom(){
    let lastroom = gamefunctions.getactualroom();
    animationManager.cleartimeline("maintimeline");
    if(lastroom!=""){    
        
        gamefunctions.leaveroom();
        switch(lastroom) {
            case "nftroom":
                nftroomsettings();
              break;
            case "marketroom":
                marketroomsettings();
              break;
            case "duelroom":
                duelroomsettings();
              break;
              case "warroom":
                warroomsettings();
              break;
              case "aboutroom":
                aboutroomsettings();
              break;
            default:
                console.log("I think you got lost.");
          } 
        
           
    }
}export { leaveroom };

function nftroomsettings(){
  animationManager.addcommandtoanimation("maintimeline","close",false,Scenehandler.hidescene,["garage"]);
  animationManager.addcommandtoanimation("maintimeline","close",false,Scenehandler.hidescene,["tankscene"]); 
  Scenehandler.scene("screendoor").playanimation("maintimeline","close",0); 
}

function marketroomsettings(){


}
function duelroomsettings(){

}
function warroomsettings(){
  Scenehandler.scene("warroom").playanimation("hidecontrols","hidewarroomcontrols",0);
  animationManager.addcommandtoanimation("maintimeline","close",false,Scenehandler.hidescene,["warroom"]);
  Scenehandler.scene("screendoor").playanimation("maintimeline","close",0); 
}
function aboutroomsettings(){
  

}


