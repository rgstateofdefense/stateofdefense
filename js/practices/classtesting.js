import { gsap } from 'https://unpkg.com/gsap@3.9.1/gsap-core.js'

class tweenline {
    constructor(tweenname) {
     this.name = tweenname;   
    }
    getname() {
        return this.name;
    }
}

const maintweenline = new tweenline("Main");

let tweenlines = [];

console.log(maintweenline.getname());
  
addanimation("potato");
addanimation("tank");
addanimation("potato");

//external functions
function addanimation(tweenname){
    const targettween = tweenlines.find(element => element.getname() == tweenname);
    if(typeof targettween === 'undefined'){
        const newtweenline = createtweenline(tweenname);
        console.log("created "+newtweenline.getname());  
    }
    else{
        console.log("found "+targettween.getname());
    }
}

function createtweenline(linename){
    const newtweenline = new tweenline(linename);
    tweenlines.push(newtweenline);
    return newtweenline;
    
}


