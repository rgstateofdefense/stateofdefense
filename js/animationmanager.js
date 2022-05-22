import { gsap } from 'https://unpkg.com/gsap@3.9.1/gsap-core.js'

let timelinelist = [];

class timeline{

    constructor(timelinename){
        this.name = timelinename;
        this.thistimeline = gsap.timeline(); 
        this.animationpool = [];
        this.orphanfunctions = [];
        this.animationchainisrunning = false;
        this.actualanimation = "";
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
    cleartimeline(){
        this.thistimeline.clear();
        this.animationpool = [];
        this.orphanfunctions = [];
        this.animationchainisrunning = false;
        this.actualanimation = "";
    }

    addanimation(name,animationcallfunction){
        let oneanimationentry = [];
        oneanimationentry.push(name);
        oneanimationentry.push(animationcallfunction);
        oneanimationentry.push([]);
        for(let i=this.orphanfunctions.length-1;i>-1;i--){
           
            if(this.orphanfunctions[i][0]==name){
                oneanimationentry[2].push(this.orphanfunctions[i][1]);
                this.orphanfunctions.splice(i,1);
            }
        }


        this.animationpool.push(oneanimationentry);
    }

    addcommandtoanimation(targetanim,starttype,functionname,args){
        const row = this.animationpool.findIndex(row => row.includes(targetanim));
        if(row != -1){
            this.animationpool[row][2].push([starttype,functionname,args]);
        }
        else{
            if(this.actualanimation == targetanim){
                if(starttype){
                    functionname(args);
                }
                else{
                    this.thistimeline.call(functionname,[args]);  
                }
            }
            else{
                let oneaorphanfunction = [];
                oneaorphanfunction.push(targetanim);
                oneaorphanfunction.push([starttype,functionname,args]);
                this.orphanfunctions.push(oneaorphanfunction);
            }

        }   
    }
    startanimationchain(){
        if(!this.animationchainisrunning)
        {
            this.animationchainisrunning = true;
            getnextanimation(this.name);
        }     
    }
}

createtimeline("maintimeline");
createtimeline("layoutscreentimeline");

function gettimeline(name){
    const newtimeline = timelinelist.find(element => element.getname() == name);
    return newtimeline;
}export { gettimeline };
function cleartimeline(name){
    const newtimeline = timelinelist.find(element => element.getname() == name);
    if(typeof newtimeline != 'undefined'){
        newtimeline.cleartimeline();
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

function addcommandtoanimation(name,targetanim,starttype,functionname,args){
    const thistimeline = timelinelist.find(element => element.getname() == name);
    if(typeof thistimeline !== 'undefined'){
        thistimeline.addcommandtoanimation(targetanim,starttype,functionname,args);
    }
    else {
        console.log("the timeline with this name: "+name+" not exist");
    }
}export { addcommandtoanimation };


function getnextanimation(callingclassname){
    //gsap can't remember the paernt class, so I needed to search it every time by name outside here
    const callingclass = gettimeline(callingclassname);
    if(callingclass.animationpool.length>0){ 
        callingclass.clear();
        callingclass.actualanimation = callingclass.animationpool[0][0];
        callingclass.animationpool[0][1](callingclass.thistimeline);
        const functionsbox = callingclass.animationpool[0][2];
            for (let i = 0; i < functionsbox.length; i++) {
                const onefunction = functionsbox[i]; 
                
                if(onefunction[0]==true){
                    onefunction[1](onefunction[2]);
                }
                else {
                    callingclass.thistimeline.call(onefunction[1],onefunction[2]);
                    
                }
            }
        callingclass.animationpool.shift();
        callingclass.thistimeline.call(getnextanimation,[callingclassname]); 
    }
    else{
        callingclass.animationchainisrunning = false;
        callingclass.actualanimation = "";
    }
}