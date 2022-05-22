import * as THREE from 'https:/unpkg.com/three@0.126.1/build/three.module.js'
import * as Loadingmanager from '/js/loadingmanager.js'
import * as threeengine from '/js/3dengine.js'

async function build(hideit)
{
    const scene = threeengine.getscene();
    const boxGeometry = new THREE.BoxGeometry(1,1,1)
    const material = new THREE.MeshPhongMaterial({color: 0x00ff00,flatShading: THREE.FlatShading} );
    const mesh = new THREE.Mesh(boxGeometry,material)
    scene.add(mesh);
    const cubeamblight = new THREE.AmbientLight( 0xffffff ,1); // white light
    scene.add( cubeamblight );
    
    

    const textureloader = new THREE.TextureLoader();
    const shiedbasecolor = textureloader.load("./textures/texture/Greeble_Techno_002_ambientOcclusionsield.jpg");
    const shieldnormal = textureloader.load("./textures/normalmap/Greeble_Techno_001_normal.jpg");
    const shieldmaterial = new THREE.MeshStandardMaterial({
        color: 'white',
        map: shiedbasecolor,
        normalMap: shieldnormal,
        metalness: 0.3,
        roughness: 0.4,
    });
    const shield = await Loadingmanager.loadgltf("./models/Heater_Shield.glb")
    shield.traverse ( ( o ) => { if ( o.isMesh ) {
        o.material = shieldmaterial;
        o.receiveShadow = true;
      }
    });
    shield.position.set(0,0,-10);
    shield.scale.set(2,2,2);


    const sparklelight = new THREE.PointLight( 0xffffff, 1, 100 );
    sparklelight.position.set( 1, 0, -1 );
    scene.add( sparklelight );


    console.log("debugcube added");
    
    //if(hideit) hide();
}
export { build};