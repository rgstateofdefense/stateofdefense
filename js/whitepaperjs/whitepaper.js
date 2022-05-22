const clickselectorfunction = (target) => {
    return (e) => {
        setactualpage(target);
  }
}
function setactualpage(target){
    //const whitedata = document.querySelector("whitedata");
        fetch("./wpp/"+target+".html" /*, options */)
        .then((response) => response.text())
        .then((html) => {
            document.getElementById("whitedata").innerHTML = html;
            document.getElementById("titleright").innerHTML = target;
            setmenubackcolor(target);
        })
        /*
        .catch((error) => {
            console.warn(target);
        });
        */
}

function setmenubackcolor(menuid){
    var current = document.getElementsByClassName("whiteactive");
    // If there's no active class
      for (let k of current) {
        //console.log(k.id+" was removed from active")
        k.className = k.className.replace("whiteactive", "selectable");
      }
      const whitebutton = document.getElementById(menuid);
      whitebutton.className = "whiteactive";
}

function standalonecall(){
    const whitepaperLayer = document.querySelector('#whitepaperLayer');
    fetch("wpp/whitepaper.html")
    .then((response) => response.text())
    .then((html) => {
        whitepaperLayer.innerHTML = html;
        
        addeventlisteners();
    })
    //whitepaperLayer.style.opacity = 1;

}export{standalonecall};

function addeventlisteners(){
    document.getElementById("About").addEventListener("click", clickselectorfunction("About"));
    document.getElementById("Goal").addEventListener("click", clickselectorfunction("Goal"));
    document.getElementById("Roadmap").addEventListener("click", clickselectorfunction("Roadmap"));
    setactualpage("Goal");
}export{addeventlisteners};