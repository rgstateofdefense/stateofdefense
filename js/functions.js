/*
import  { GLTFLoader } from 'https:/unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js'


async function loadtextfile(filename){
    const data = await fetch(filename);
    const result = await data.text();
    return result;
}export { loadtextfile };



async function loadgltf(filename,scene) {
    const gltfData = await modelLoader(filename),
 
    model = gltfData.scene;
    scene.add(model);
    return model;
 
 }export { loadgltf };

function modelLoader(filename){
    const gltfloader = new GLTFLoader()
    return new Promise((resolve, reject) => {gltfloader.load(filename, data=> resolve(data), null, reject);});
}
*/