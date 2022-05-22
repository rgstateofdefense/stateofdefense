import * as THREE from 'https:/unpkg.com/three@0.126.1/build/three.module.js'


let isinroom = false;
let actualroom = "";

function isitinroom(){
    return isinroom;
}export { isitinroom };
function inroom(isit){
    isinroom = isit;
}export { inroom };


function setactualroom(roomname){
    actualroom = roomname;
}export { setactualroom };
function getactualroom(){
    return actualroom;
}export { getactualroom };
function leaveroom(){
    actualroom = "";
}export { leaveroom };


let textcanvaslist = [];


class textcanvas{

    constructor(name,font,fontsize,fillcolor){
        this.name = name;
        this.fillcolor = fillcolor;
        this.textcolor = "white";
        this.ctx = document.createElement('canvas').getContext('2d');
        this.font =font;
        this.fontsize = fontsize;
        this.initcanvas();
        this.text = name;
        this.initcanvas();
        this.texture;
        this.borderx =0;
        this.bordery =0;
        this.backgroundimage = "";
        this.imagexsize =-1;
        this.imageysie =-1;
    }

    async initcanvas(){
        let font =  this.fontsize+"px "+this.font;
        this.ctx.font = font;
        const doubleBorderSize = this.borderx*2;
        const width = this.ctx.measureText(this.text).width + this.borderx;
        
        const height = this.fontsize + this.bordery*2;
        this.ctx.canvas.width = width+(this.borderx*2);
        this.ctx.canvas.height = height+(this.bordery*2);
        this.ctx.font = font;
       
        this.ctx.textBaseline = 'top';
        if(this.backgroundimage != "" && typeof this.backgroundimage !="undefined"){
            const url = this.backgroundimage;
            //let img = await loadtheImage(url);
            //this.ctx.drawImage(img, 0, 0);
            //this.ctx.fillStyle = this.textcolor;
            //this.ctx.fillText(this.text, 2,2);           
            //console.log(img);
            /*
            let img = await loadtheImage(url).then( user => {
                this.ctx.drawImage(user, 0, 0);
                this.ctx.fillStyle = this.textcolor;
                this.ctx.fillText(this.text, 2,2);           
            }).catch(e => console.error(e));
            */
            let imagexsize = this.width;
            let imageysize =  this.height;
            if(this.imagexsize!=-1)imagexsize = this.imagexsize;
            if(this.imageysize!=-1)imageysize = this.imageysize;

            let img = await loadtheImage(url);
            this.ctx.drawImage(img, 0, 0,imagexsize,imageysize);
            this.ctx.fillStyle = this.textcolor;
            this.ctx.fillText(this.text, 2,2);
        }
        else{
            this.ctx.fillStyle = this.textcolor;
            this.ctx.fillText(this.text, 2,2);
        }

        this.texture = new THREE.CanvasTexture(this.ctx.canvas);
    }
    settextcanvas(text,font,fontsize,textcolor,fillcolor){
        this.text = text;
        this.font =font;
        this.fontsize = fontsize;
        this.textcolor = textcolor;
        this.fillcolor = fillcolor;
        this.initcanvas();
    }
    
    settext(text){
        this.text = text;
        this.initcanvas();
    }

    setfont(font){
        this.font = font;
        this.initcanvas();
    }

    setfontsize(fontsize){
        this.fontsize = fontsize;
        this.initcanvas();
    }

    settextcolor(textcolor){
        this.textcolor = textcolor;
        this.initcanvas();
    }
    setfillcolor(fillcolor){
        this.fillcolor = fillcolor;
        this.initcanvas();
    }
    setbordersize(sizex,sizey){
        this.borderx =sizex;
        this.bordery =sizey;
        this.initcanvas();
    }
    async setbackgroundimage(fileroute){
        this.backgroundimage = fileroute;
        //console.log("X: "+this.backgroundimage);
        await this.initcanvas();
    }
    async setbackgroundimagesize(x,y){
        this.imagexsize =x;
        this.imageysize =y;
        await this.initcanvas();
    }
    async resetbackgroundimagesize(){
        this.imagexsize =-1;
        this.imageysie =-1;
        await this.initcanvas();
    }

    getcanvas(){
        return this.ctx.canvas;
    }

    gettexture(){        
        return this.texture;
    }
    getname(){
        return this.name;
    }
}


function createtexttexture(name,font,fontsize,fillcolor){
    const newtexturecanvas = textcanvaslist.find(element => element.getname() == name);
    if(typeof newtexturecanvas === 'undefined'){
        const totallynewtexturecanvas = new textcanvas(name,font,fontsize,fillcolor);
        textcanvaslist.push(totallynewtexturecanvas);
        return totallynewtexturecanvas;
    }
    else{
        return newtexturecanvas;
    }
}export{createtexttexture};

function gettexttexture(name){
    const texturecanvas = textcanvaslist.find(element => element.getname() == name);
    return texturecanvas;

}export{gettexttexture};

function getcanvas(name){
    const texturecanvas = textcanvaslist.find(element => element.getname() == name);
    if(typeof texturecanvas != 'undefined'){
        return texturecanvas.getcanvas();
    }
    else return undefined;
}export{getcanvas}

function gettexture(name){
    const texturecanvas = textcanvaslist.find(element => element.getname() == name);
    if(typeof texturecanvas != 'undefined'){
        return texturecanvas.gettexture();
    }
    else return undefined;

}export{gettexture}


async function loadimage(url){
    let img = await loadtheImage(url);
    return img;
}


function loadtheImage(url) {
    return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url; });
  }

async function loadtextfile(filename){
    const data = await fetch(filename);
    const result = await data.text();
    return result;
}export { loadtextfile };

function setselectednfttank(tankname,holdername){
    sessionStorage.setItem(holdername, tankname);
}export { setselectednfttank };

function pseudorandom(seed,counter) {
    //mulberry32
    seed = seed+counter*2
      var t = seed += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
}export { pseudorandom };

let objectpannerlist = [];

class objectpanner{
    constructor(name,object,domElement){
        if ( domElement === undefined ) console.warn( 'THREE.OrbitControls: The second parameter "domElement" is now mandatory.' );
        if ( domElement === document ) console.error( 'THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.' );
    
        this.name = name;
        this.object = object;
        this.subobject = object;

        if(object.type =="Group"){
           for(const onechild of object.children){
                if(onechild.type =="PerspectiveCamera")
                {
                    this.subobject = onechild;
                    break;
                }
            }
        }
        this.domElement = domElement;
        this.enabled = true;
        
        this.panOffset = new THREE.Vector3();
        // "target" sets the location of focus, where the object orbits around
        this.target = new THREE.Vector3();
        this.enableDamping = false;
        this.dampingFactor = 0.05;
        this.screenSpacePanning = true;
        this._domElementKeyEvents = null;
        this.keyPanSpeed = 7;	// pixels moved per arrow key push
        this.keys = { LEFT: 'a', UP: 'w', RIGHT: 'd', BOTTOM: 's' };


        //updatethisvars
        this.offset = new THREE.Vector3();
        this.quat = new THREE.Quaternion().setFromUnitVectors( this.subobject.up, new THREE.Vector3( 0, 1, 0 ) );
        this.quatInverse = this.quat.clone().invert();
        this.spherical = new THREE.Spherical();
        this.sphericalDelta = new THREE.Spherical();
        this.scale = 1;
        this.panOffset = new THREE.Vector3();
        this.zoomChanged = false;

        this.lastPosition = new THREE.Vector3();
		this.lastQuaternion = new THREE.Quaternion();
        this.EPS = 0.000001;



        this.minPolarAngle = 0; // radians
	    this.maxPolarAngle = Math.PI; // radians

        this.minDistance = 0;
        this.maxDistance = Infinity;


        this.changeEvent = { type: 'change' };
    }

    


	panLeft( distance, objectMatrix ) {
        var v = new THREE.Vector3();
		v.setFromMatrixColumn( objectMatrix, 0 ); // get X column of objectMatrix
		v.multiplyScalar( - distance );

		this.panOffset.add( v );

	}

    panUp( distance, objectMatrix ) {
        var v = new THREE.Vector3();
        if ( this.screenSpacePanning === true ) {

            v.setFromMatrixColumn( objectMatrix, 1 );

        } 
        else {

            v.setFromMatrixColumn( objectMatrix, 0 );
            v.crossVectors( this.object.up, v );

        }

        v.multiplyScalar( distance );
        this.panOffset.add( v );
    }
    
    pan( deltaX, deltaY ) {
        var element = this.domElement;

        if ( this.subobject.isPerspectiveCamera ) {

            // perspective
            var position = this.object.position;
            this.offset.copy( position ).sub( this.target );
            var targetDistance =  this.offset.length();

            // half of the fov is center to top of screen
            targetDistance *= Math.tan( ( this.subobject.fov / 2 ) * Math.PI / 180.0 );
            //console.log("tagetdistance: "+ this.offset.length());
            // we use only clientHeight here so aspect ratio does not distort speed
            this.panLeft( 2 * deltaX * targetDistance / element.clientHeight, this.object.matrix );
            this.panUp( 2 * deltaY * targetDistance / element.clientHeight, this.object.matrix );


        } else if ( this.subobject.isOrthographicCamera ) {

            // orthographic
            panLeft( deltaX * ( this.object.right - this.object.left ) / this.object.zoom / element.clientWidth, this.object.matrix );
            panUp( deltaY * ( this.object.top - this.object.bottom ) / this.object.zoom / element.clientHeight, this.object.matrix );

        } else {

            // camera neither orthographic nor perspective
            console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );
            this.enablePan = false;

        }

    }


    update() 
    {
        //console.log("strat position");
        //console.log(this.object.position);
        var position = this.object.position;
        //console.log("A:");
        //console.log(this.object.position);

        this.offset.copy( position ).sub( this.target );

        // rotate offset to "y-axis-is-up" space
        this.offset.applyQuaternion(  this.quat );

        // angle from z-axis around y-axis
        this.spherical.setFromVector3(  this.offset );

        if ( this.autoRotate && state === STATE.NONE ) {

            rotateLeft( getAutoRotationAngle() );

        }

        if ( this.enableDamping ) {

            spherical.theta += sphericalDelta.theta * this.dampingFactor;
            spherical.phi += sphericalDelta.phi * this.dampingFactor;

        } else {

            this.spherical.theta += this.sphericalDelta.theta;
            this.spherical.phi += this.sphericalDelta.phi;

        }

        // restrict theta to be between desired limits
        //console.log("B:");
        //console.log(this.object.position);
        var min = this.minAzimuthAngle;
        var max = this.maxAzimuthAngle;

        if ( isFinite( min ) && isFinite( max ) ) {

            if ( min < - Math.PI ) min += twoPI; else if ( min > Math.PI ) min -= twoPI;

            if ( max < - Math.PI ) max += twoPI; else if ( max > Math.PI ) max -= twoPI;

            if ( min <= max ) {

                spherical.theta = Math.max( min, Math.min( max, spherical.theta ) );

            } else {

                spherical.theta = ( spherical.theta > ( min + max ) / 2 ) ?
                    Math.max( min, spherical.theta ) :
                    Math.min( max, spherical.theta );

            }

        }
        //console.log("C:");
        //console.log(this.object.position);
        // restrict phi to be between desired limits
        
        //console.log("spherical ad def:");
       // console.log(this.spherical);

        this.spherical.phi = Math.max( this.minPolarAngle, Math.min( this.maxPolarAngle, this.spherical.phi ) );
        //console.log("polar angles");
        //console.log(this.minPolarAngle);
        //console.log(this.maxPolarAngle);
        this.spherical.makeSafe();

        //console.log("spherical after phi:");
        //console.log(this.spherical);

        this.spherical.radius *= this.scale;

        // restrict radius to be between desired limits
        this.spherical.radius = Math.max( this.minDistance, Math.min( this.maxDistance, this.spherical.radius ) );

        //console.log("spherical after radius:");
        //console.log(this.spherical);

        // move target to panned location

        if ( this.enableDamping === true ) {

            this.target.addScaledVector( this.panOffset, this.dampingFactor );

        } else {

            //console.log("Panoffset:");
            //console.log(this.panOffset);

            this.target.add( this.panOffset );

        }
        //console.log("D:");
        //console.log(this.object.position);
        //console.log("offseta:");
        //console.log(this.offset);
        this.offset.setFromSpherical( this.spherical );
        //console.log("spherical:");
        //console.log(this.spherical);
        //radius and phi is nan
        
        //console.log("offsetb:");
       // console.log(this.offset);
        //console.log("D1:");
        //console.log(this.object.position);
        //---------------------------------------------------------------------
        // rotate offset back to "camera-up-vector-is-up" space
        this.offset.applyQuaternion( this.quatInverse );
        //console.log("quatInverse:");
        //console.log(this.quatInverse);
        //console.log("offsetc:");
        //console.log(this.offset);

        position.copy( this.target ).add( this.offset );
        //-----------------------------------------------------------------------
        //console.log("D2:");
        //console.log(this.object.position);
        this.subobject.lookAt( this.target );
        //console.log("This target:");
        //console.log(this.target);
        //console.log("D3:");
        //console.log(this.object.position);
      
        
        if ( this.enableDamping === true ) {

            sphericalDelta.theta *= ( 1 - this.dampingFactor );
            sphericalDelta.phi *= ( 1 - this.dampingFactor );

            panOffset.multiplyScalar( 1 - this.dampingFactor );

        } else {

            this.sphericalDelta.set( 0, 0, 0 );

            this.panOffset.set( 0, 0, 0 );

        }
        //console.log("E:");
        //console.log(this.object.position);
        this.scale = 1;

        // update condition is:
        // min(camera displacement, camera rotation in radians)^2 > EPS
        // using small-angle approximation cos(x/2) = 1 - x^2 / 8

        if ( this.zoomChanged ||
            this.lastPosition.distanceToSquared( this.object.position ) >  this.EPS ||
            8 * ( 1 - this.lastQuaternion.dot( this.object.quaternion ) ) >  this.EPS ) {

                //this.dispatchEvent( this.changeEvent );

                this.lastPosition.copy( this.object.position );
                this.lastQuaternion.copy( this.object.quaternion );
                this.zoomChanged = false;
        }
        //console.log("End:");
        //console.log(this.object.position);
    }

    keyupdate(key){
        switch ( key ) {

			case this.keys.UP:
				this.pan( 0, this.keyPanSpeed );
				break;

			case this.keys.BOTTOM:
				this.pan( 0, - this.keyPanSpeed );
				break;

			case this.keys.LEFT:
				this.pan( this.keyPanSpeed, 0 );
				break;

			case this.keys.RIGHT:
				this.pan( - this.keyPanSpeed, 0 );
				break;
		}
        this.update();
    }
}

function createobjectpanner(name,object,domelement){
    const newtexturecanvas = objectpannerlist.find(element => element.getname() == name);
    if(typeof newtexturecanvas === 'undefined'){
        const totallynewtexturecanvas = new objectpanner(name,object,domelement);
        objectpannerlist.push(totallynewtexturecanvas);
        return totallynewtexturecanvas;
    }
    else{
        return newtexturecanvas;
    }
}export{createobjectpanner};


function Savetodisk(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}export{Savetodisk};