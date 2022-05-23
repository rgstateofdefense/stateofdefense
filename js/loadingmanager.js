import * as THREE from 'https:/unpkg.com/three@0.126.1/build/three.module.js'
import  { GLTFLoader } from 'https:/unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js'
import * as Scenehandler from './scenehandler.js'
import * as Gamesystem from './3dengine.js'
import * as loadscene from './load/loadscene.js'
const manager = new THREE.LoadingManager();
const scene = Gamesystem.getscene();



async function loadstate(statename){
    /*Gamesystem.cleantewholescene();*/
    await Scenehandler.loadimportset(statename);
    if(statename =="initpage"){
       

    }
    else if(statename =="testing"){
        Scenehandler.buildscene("debugscene",false);

    } 
    else if(statename =="mainmenu"){
       
        Scenehandler.buildscene("screendoor",false);
        Scenehandler.buildscene("nftcardscene",false);
        Scenehandler.buildscene("SODFscene",false);
        Scenehandler.buildscene("garage",true);
        Scenehandler.buildscene("tankscene",true);
        Scenehandler.buildscene("marketroom",true);
        Scenehandler.buildscene("warroom",true);
        Scenehandler.buildscene("underconstuction",false);
        Scenehandler.buildscene("whitepaper",false);
        
    }
    else if(statename =="battle"){
        Scenehandler.buildscene("map",false);
        Scenehandler.buildscene("tankmanager",false);
        Scenehandler.buildscene("controlscene",false);


    }
    else if(statename =="tutorial"){


    }
    else if(statename =="mapeditor"){
        Scenehandler.buildscene("controlscene",false);
        //Scenehandler.buildscene("map",false);
        Scenehandler.buildscene("mapeditormain",false);
        Scenehandler.buildscene("tankmanager",false);
        
    }


}export{loadstate};





manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
    //console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};
manager.onLoad = function ( ) {
	//console.log( 'Loading complete!');
    clearloadscreen();
};
manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
	//console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};
manager.onError = function ( url ) {
	//console.log( 'There was an error loading ' + url );
};

async function loadgltf(filename) {
    const gltfData = await modelLoader(filename),
    model = gltfData.scene;
    scene.add(model);
    return model;
 
 }export { loadgltf };

function modelLoader(filename){
    const gltfloader = new GLTFLoader(manager);
    return new Promise((resolve, reject) => {gltfloader.load(filename, data=> resolve(data), null, reject);});
}

function createloadscreen(gamestate){
    loadscene.createloadscreen(gamestate);
    
}export{createloadscreen};
function clearloadscreen(){
    loadscene.clearloadscreen();
    

}

