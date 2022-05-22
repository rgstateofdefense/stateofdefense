import { gsap } from 'https://unpkg.com/gsap@3.9.1/gsap-core.js'

class timeline{
   

    constructor(timelinename) {
        this.name = timelinename;
        this.thistimeline = gsap.timeline(); 
        this.onstartfunctionpool = [];
        this.oncompletefunctionpool = [];
        this.animationpool = [];
        this.animationchainisrunning = false; 
        this.orphanfunctions = [];
    }
    getname() {
        return this.name;
    }
    gettimeline(){
        return this.thistimeline;
    }
    clear(){
        this.thistimeline.clear();
    }
    
    addfunctiontostartpool(functionlink,args){
        const functionbox = [functionlink,args];
        this.onstartfunctionpool.push(functionbox);
    }
    addfunctiontoendpool(functionlink,args){
        const functionbox = [functionlink,args];
        this.oncompletefunctionpool.push(functionbox);
    }
    startfunctionpool(){
        for (let i = 0; i < this.onstartfunctionpool.length; i++) {
            this.onstartfunctionpool[i][0](this.onstartfunctionpool[i][1]);
        }
        this.onstartfunctionpool = [];
    }   
    endfunctionpool(){
        for (let i = 0; i < this.oncompletefunctionpool.length; i++) {
            this.oncompletefunctionpool[i][0](this.oncompletefunctionpool[i][1]);
        }       
        this.oncompletefunctionpool = [];
        if(this.animationchainisrunning) this.getnextanimation();
    }

    addanimationtopool(animationname,animationcallfunction){
        let oneanimationentry = [];
        oneanimationentry.push(animationname);
        oneanimationentry.push(animationcallfunction);
        oneanimationentry.push([]);
        
        for(let i=this.orphanfunctions.length-1;i>-1;i--){
           
            if(this.orphanfunctions[i][0]==animationname){
                oneanimationentry[2].push(this.orphanfunctions[i][1]);
                this.orphanfunctions.splice(i,1);
            }
        }
        this.animationpool.push(oneanimationentry);
    }
    
    commandtoanimpoolelement(targetanim,starttype,functionname,args){
        const row = this.animationpool.findIndex(row => row.includes(targetanim));
        if(row != -1){
            this.animationpool[row].push([starttype,functionname,args]);
        }   
        else {
            let oneaorphanfunction = [];
            oneaorphanfunction.push(targetanim);
            oneaorphanfunction.push([starttype,functionname,args]);
            this.orphanfunctions.push(oneaorphanfunction);
        }
    }
    
    startanimationchain(){
        console.log("startanimationchain called "+this.name);
        console.log(this.animationchainisrunning);
        if(!this.animationchainisrunning)
        {
            console.log("inside startchain "+this.name);
            this.getnextanimation();
            this.animationchainisrunning = true;
        }
    }

    getnextanimation(){
        
        console.log("inside getnextanimation "+this.name);
        console.table(this.animationpool);
        if(this.animationpool.length>0){  
            const functionsbox = this.animationpool[0][2];
            for (let i = 0; i < functionsbox.length; i++) {
                const onefunction = functionsbox[i]; 
                
                if(onefunction[0]==true){
                    onefunction[1](onefunction[2]);
                }
                else {
    
                    this.addfunctiontoendpool(onefunction[1],onefunction[2]);
                }
            }
            this.animationpool[0][1](this.name);
            this.animationpool.shift();
        }else
        {
            this.animationchainisrunning = false;
            this.thistimeline.clear();
        }
    }
    
   
}

let timelinelist = [];
const maintimeline = createtimeline("maintimeline");


function gettimeline(name){
    const newtimeline = timelinelist.find(element => element.getname() == name);
    return newtimeline;
}export { gettimeline };
function cleartimeline(name){
    const newtimeline = timelinelist.find(element => element.getname() == name);
    if(typeof newtimeline !== 'undefined'){
        newtimeline.clear();
    }
}export { cleartimeline };
function deletetimeline(name){
    const newtimeline = timelinelist.find(element => element.getname() == name);
    if(typeof newtimeline !== 'undefined'){
        var index = timelinelist.indexOf(newtimeline);
        timelinelist.splice(index, 1);
    }
}export { deletetimeline };
function createtimeline(name){
    const newtimeline = timelinelist.find(element => element.getname() == name);
    if(typeof newtimeline === 'undefined'){
        const totallynewtimeline = new timeline(name);
        timelinelist.push(totallynewtimeline);
        return totallynewtimeline;
    }
    else{
        return newtimeline;
    }
}export { createtimeline };


//maintimeline
function getmaintimeline(){
    return maintimeline.gettimeline();
}export { getmaintimeline };
function clearmaintimeline(){
    maintimeline.clear();
}export { clearmaintimeline };

//onestly, why this hould looks like this? the ones who develop the javascript language are dumbs
function startfunctionpool(timelinename){
    
    const thistimeline = gettimeline(timelinename);
    if(typeof thistimeline !="undefined"){
        thistimeline.startfunctionpool();
    }

} export { startfunctionpool };

function endfunctionpool(timelinename){
    
    const thistimeline = gettimeline(timelinename);
    if(typeof thistimeline !="undefined"){
        thistimeline.endfunctionpool();
    }

} export { endfunctionpool };




function addfunctiontostartpool(timelinename,functionlink,args){
    const thistimeline = gettimeline(timelinename);
    if(typeof thistimeline !="undefined"){
        thistimeline.addfunctiontostartpool(functionlink,args);
    }
}export { addfunctiontostartpool };
function addfunctiontoendpool(timelinename,functionlink,args){
    const thistimeline = gettimeline(timelinename);
    if(typeof thistimeline !="undefined"){
        thistimeline.addfunctiontoendpool(functionlink,args);
    }
}export { addfunctiontoendpool };

//let animationpool = [];
//let animationchainisrunning = false; 
//let orphanfunctions = [];

function addanimationtopool(timelinename,animationname,animationcallfunction){
    const thistimeline = gettimeline(timelinename);
    if(typeof thistimeline !="undefined"){
        thistimeline.addanimationtopool(animationname,animationcallfunction);
    }
}export { addanimationtopool };

function commandtoanimpoolelement(timelinename,targetanim,starttype,functionname,args){
    const thistimeline = gettimeline(timelinename);
    if(typeof thistimeline !="undefined"){
        thistimeline.commandtoanimpoolelement(targetanim,starttype,functionname,args);
    }
}export {commandtoanimpoolelement};

function startanimationchain(timelinename){
    const thistimeline = gettimeline(timelinename);
    if(typeof thistimeline !="undefined"){
        thistimeline.startanimationchain();
    }
}export { startanimationchain };



