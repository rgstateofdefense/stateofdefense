import * as THREE from 'https:/unpkg.com/three@0.126.1/build/three.module.js'
import * as threeengine from '../3dengine.js'

var map = function () {

    const scene = threeengine.getscene();
    const textureloader = new THREE.TextureLoader();
    const groundbasetexture = textureloader.load("./textures/maptexture/dirt-512.jpg");
    const groundbasematerial = new THREE.MeshStandardMaterial({
        color: 'white',
        map: groundbasetexture,
        
    })
    
    this.mapexist = false;
    this.buildstage = 0;
    this.xside = 20;
    this.yside = 20;
    this.xres = 16;
    this.yres = 16;

    this.groundgeometry;
    this.groundplane;

    this.heightmap;
    this.texture;
    this.normalmap;
    this.aestbuildingdata = {};
    this.clickplaneimage;
    this.factoryplatforms = {};

    this.getbuildstage = function (){
        return this.buildstage;
    }


    this.setsize = function (xsize,ysize) {
        this.xside = xsize;
        this.yside = ysize;
        this.xres = 16*(xsize/20);
        this.yres = 16*(ysize/20);
	};


    this.deletemap = function (clearsettings){
        this.buildstage = 0;
        if(clearsettings){



        } 
    }

    this.setheightmap = function (targetimage){
        if(typeof targetimage == "string"){
            const thetargetheightmap = textureloader.load(targetimage);
            this.heightmap =thetargetheightmap;
        }
        else{
            this.heightmap = targetimage;
        } 
        //console.log(this.heightmap.image);
    }

    this.setvisualimages = function (targettexture,targetnormal){
        const thetargettexture = textureloader.load(targettexture);
        const thetargetnormal = textureloader.load(targetnormal);
        this.texture = thetargettexture;
        this.normalmap = thetargetnormal;
    }

    this.fillaesteticbuilding = function (allbuildingdata){
        this.aestbuildingdata = allbuildingdata;
    }

    this.setclickplanemap = function (targetimage){
        if(typeof targetimage == "string"){
            const thetargetclickplanemap = textureloader.load(targetimage);
            this.clickplaneimage =thetargetclickplanemap;
        }
        else{
            this.clickplaneimage= targetimage;
        } 
    }

    this.fillfactoryplatformdata = function (allfactorydata){
        this.factoryplatforms = allfactorydata;
    }

    //development tools
    this.dsettexture = function (targettexture){
        //this.texture = targettexture;
        this.groundplane.material = targettexture;
    }
    this.setnormal = function (targetnormal){
        this.normalmap = targetnormal;
    }
    this.addaesteticbuilding = function (name,onebuildingdata){
        this.aestbuildingdata[name] = onebuildingdata;
    }


    this.removeaesteticbuilding = function (name){
        delete this.aestbuildingdata[name];
    }

    this.setclickplanecoord = function (posx,posy, clickable){



    }

    this.addfactoryplatformbuilding = function (name,onebuildingdata){
        this.factoryplatforms[name] = onebuildingdata;
    }

    this.deletefactoryplatformbuilding = function (name){
         delete factoryplatforms[name];
    }

    this.getgroundgeometry = function (){
        return this.groundgeometry();
        
    }
    this.getgroundmaterial = function (){
        return this.groundplane.material;
    }

    //----------------------------------------------
    this.updategeometrysize = function (){
        this.groundgeometry.width = this.xres;
        this.groundgeometry.height  = this.yres;
        this.groundgeometry.widthSegments  = this.xside;
        this.groundgeometry.heightSegments   = this.yside;
        this.groundplane.updateMatrix();

    }
    
    this.creategeometry = function (){
        scene.remove(this.groundgeometry);
        this.groundgeometry = new THREE.PlaneBufferGeometry( this.xside, this.yside, this.xres,this.yres);

    }

    this.createmap = function () {
        

        
        scene.remove(this.groundplane);
        this.groundplane = new THREE.Mesh(this.groundgeometry,groundbasematerial)
  
        this.groundplane.castShadow = true;
        this.groundplane.receiveShadow = true;
        this.groundplane.name = "groundplane";
        this.groundplane.rotation.x =-1.5707;
        //groundplane.position.y =-bottompoint;
        scene.add(this.groundplane);
        


        this.buildstage = 1;
    }

    
    this.buildheightmap = function () {
        let bottompoint =10;
        //console.log(this.groundcanvas);
        var ctx = this.heightmap.image.getContext("2d");  
        var vertices = this.groundgeometry.attributes.position.array;
          let arraycount = 0;
          for (var y=0; y<this.xres+1; y++) {
            for (var x=0; x<this.xres+1; x++) { 
              let imagedata = ctx.getImageData(x*2, y*2, 2, 2 );
              let  point  = getpoint(imagedata);
              if(point<bottompoint && point>0) bottompoint = point;
              //if(imagedata.data[1]>imagedata.data[0])  point  = imagedata.data[1]/255;
              vertices[arraycount+2] =point;
              arraycount+=3;
            }
          }
          this.groundplane.position.y =-bottompoint;
          this.groundgeometry.computeVertexNormals(); 
          this.groundplane.geometry.attributes.position.needsUpdate = true;


        
        this.buildstage = 2;
    }
    function getpoint(imagedata){
        let returndata = imagedata.data[0];
        
        if(imagedata.data[1]>returndata) returndata =imagedata.data[1];
        if(imagedata.data[2]>returndata) returndata =imagedata.data[2]; 
        //if(imagedata.data[3]>returndata) returndata =imagedata.data[3]; 
        return (returndata/255)*10;
      }


    this.settexture = function () {
        
        this.buildstage = 3;
    }
    
    this.addaestetics = function () {
        
        this.buildstage = 4;
    }

    this.createclickplane = function () {
        
        this.buildstage = 5;
    }
    this.addfactorplatforms = function () {
        
        this.buildstage = 6;
    }

    console.log("map initialised");
};

export{ map};




async function build(hideit)
{    
    if(objsexists) return;







if(hideit) hide();
objsexists = true;
}export { build};
