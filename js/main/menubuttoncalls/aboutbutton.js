import * as Scenehandler from '/js/scenehandler.js'

function initaboutpage(openit) {
    if(openit) Scenehandler.showscene("whitepaper");
    else Scenehandler.hidescene("whitepaper");
    //Scenehandler.underconstruction().underconstructioncheck("aboutroom");
    //let custom1 = document.getElementById("custommess")
    //custom1.innerHTML = "Aboutpage called"
  }

  export { initaboutpage };