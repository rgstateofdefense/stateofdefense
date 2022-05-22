import { gsap } from 'https://unpkg.com/gsap@3.9.1/gsap-core.js'

class timeline{
    constructor(timelinename) {
     this.name = timelinename;
     this.thistimeline = gsap.timeline();   
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


}

let timelinelist = [];
var maintimeline = gsap.timeline();

function getmaintimeline(){
    return maintimeline;
}export { getmaintimeline };
function clearmaintimeline(){
    maintimeline.clear();
}export { clearmaintimeline };
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
async function istimelineruning(timelinename){
    //TweenMax.progress() or TweenMax.totalProgress()
   return false;
}export { istimelineruning };



let onstartfunctionpool = []
let oncompletefunctionpool = []

function startfunctionpool(){
    for (let i = 0; i < onstartfunctionpool.length; i++) {
        onstartfunctionpool[i][0](onstartfunctionpool[i][1]);
    }
    console.log("startfunctionpool cleaned");
    console.table(onstartfunctionpool);
    onstartfunctionpool = [];
} export { startfunctionpool };

function endfunctionpool(){
    for (let i = 0; i < oncompletefunctionpool.length; i++) {
        oncompletefunctionpool[i][0](oncompletefunctionpool[i][1]);
        
    }
    console.log("endfunctionpool cleaned");
    console.table(oncompletefunctionpool);
    oncompletefunctionpool= [];
    
} export { endfunctionpool };



function addfunctiontostartpool(functionlink,args){
    console.log("function added to startfunctionpool");
    const func= [functionlink]
    console.log(func);
    const functionbox = [functionlink,args];
    onstartfunctionpool.push(functionbox);
}export { addfunctiontostartpool };
function addfunctiontoendpool(functionlink,args){
    console.log("function added to startfunctionpool");
    const func= [functionlink]
    console.log(func);
    const functionbox = [functionlink,args];
    oncompletefunctionpool.push(functionbox);
    //oncompletefunctionpool.push(functionlink(args));
}export { addfunctiontoendpool };

//[name][animation][[starttype,function,args];[...]]
let animationpool = [];
let animationchainisrunning = false; 

function addanimationtopool(animatinname,animationcallfunction){
    //console.log(animationcallfunction);
    let oneanimationentry = [];
    oneanimationentry.push(animatinname);
    oneanimationentry.push(animationcallfunction);
    oneanimationentry.push([]);
    addfunctiontoendpool(getnextanimation,[]);
    let commanentrydecoy = [false,getnextanimation,[]];
    oneanimationentry[2].push(commanentrydecoy);
    animationpool.push(oneanimationentry);
}export { addanimationtopool };

function commandtoanimpoolelement(targetanim,starttype,functionname,args){
    const animation = animationpool.find(element => element[0] == targetanim);
    if(typeof animation != 'undefined'){
        animation[2].push([starttype,functionname,args]);
    }   
    else {
        if(starttype){
            addfunctiontostartpool(functionname,args);
        }
        else{
            addfunctiontoendpool(functionname,args);
        }
    }
}export {commandtoanimpoolelement};

function startanimationchain(){
    if(!animationchainisrunning)
    {
        getnextanimation();
        animationchainisrunning = true;
    }
}export { startanimationchain };

function getnextanimation(){
    if(animationpool.length>0){ 
        console.log("next animation called-------- "+animationpool[0][0]); 
        const functionsbox = animationpool[0][2];
        for (let i = 0; i < functionsbox.length; i++) {
            const onefunction = functionsbox[i]; 
            
            if(onefunction[0]==true){
                onefunction[1](onefunction[2]);
            }
            else {
                addfunctiontoendpool(onefunction[1],onefunction[2]);
            }
        }
        animationpool[0][1]();
        animationpool.shift();
    }else animationchainisrunning = false;
}


