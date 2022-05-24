import {init3dengine,setcameraposition,setcamerarotation,setcamerafov} from '../3dengine.js'
import * as loadingmanager from '../loadingmanager.js'
//import {addkeyfunction} from  '../controlhandler.js'
init3dengine(false,true);


setcameraposition(0,30,0);
setcamerarotation(-1,0,0);
setcamerafov(45);
loadingmanager.loadstate("battle");
//loadingmanager.loadstate("tankmanager");