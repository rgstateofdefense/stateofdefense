
import * as Path from 'https://unpkg.com/pathfinding@0.4.18/visual/lib/pathfinding-browser.min.js'
let playerlist = {};

function playerconnect(){




}export { playerconnect};




function initserver(){





}export { initserver};





function setmovepoint(sender, point, tanklist){






}export { setmovepoint};


function settargetpoint(sender, target, tanklist){






}export { settargetpoint};



var mgrrequestid;
let startTime = 0;

function start() {
    if (!mgrrequestid) {
        mgrrequestid = window.requestAnimationFrame(battleframe);
        startTime = performance.now();
    }
}
function stop() {
    if (mgrrequestid) {
       window.cancelAnimationFrame(mgrrequestid);
       mgrrequestid = undefined;
    }
}




function battleframe(){
    const deltatime = performance.now()- startTime;
    mgrrequestid = undefined;
    //simulationcode-----------


    //-------------------------
    start();
    startTime = performance.now();
}