import * as Scenehandler from '../../scenehandler.js'
import * as gamefunctions from '../../gamefunctions.js'
import * as animationManager from '../../animationmanager.js'

function initnftpage() {
    gamefunctions.setactualroom("nftroom");
    Scenehandler.scene("underconstuction").underconstructioncheck("nftroom");
   
    animationManager.addcommandtoanimation("maintimeline","open",true,Scenehandler.showscene,"garage");
    animationManager.addcommandtoanimation("maintimeline","open",true,Scenehandler.showscene,"tankscene");
    Scenehandler.scene("screendoor").playanimation("maintimeline","open",0);

}export { initnftpage };
