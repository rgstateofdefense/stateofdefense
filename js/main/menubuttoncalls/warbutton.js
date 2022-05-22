import * as Scenehandler from '/js/scenehandler.js'
import * as gamefunctions from '/js/gamefunctions.js'
import * as animationManager from '/js/animationmanager.js'

function initwarpage() {
  gamefunctions.setactualroom("warroom");
  Scenehandler.scene("underconstuction").underconstructioncheck("warroom"); 
  animationManager.addcommandtoanimation("maintimeline","open",true,Scenehandler.showscene,"warroom");
  animationManager.addcommandtoanimation("maintimeline","open",true,lookglobe,[]);
  Scenehandler.scene("screendoor").playanimation("maintimeline","open",0);
  Scenehandler.scene("warroom").playanimation("maintimeline","showwarroomcontrols",0);

  }export { initwarpage };


  function lookglobe(){
    Scenehandler.scene("warroom").playanimation("cameralook","looktoglobe",0);

  }