
var importdict = {};

async function loadimportset(gamelevel){
  //rwhitepaperscene = await import( '/js/main/scenes/whitepaperscene.js' )
  if(gamelevel =="testing") await loaddebug();
  else if(gamelevel =="mainmenu") await loadmain();
  else if(gamelevel =="battle") await loadmbattle();
  else if(gamelevel =="mapeditor") await loadmapeditor();
}export { loadimportset };

async function loaddebug(){
  importdict['debugscene'] =await import('./main/scenes/debugscene.js');
}

async function loadmain(){
  importdict['screendoor']=await import('./main/scenes/screendoor.js');
  importdict['garage']=await import('./main/scenes/garage.js');
  importdict['tankscene']=await import('./main/scenes/tankscene.js');
  importdict['marketroom']=await import('./main/scenes/marketroom.js');
  importdict['nftcardscene']=await import('./main/scenes/NFTcardsscene.js');
  importdict['SODFscene']=await import('./main/scenes/SODFuelscene.js');
  importdict['underconstuction']=await import('./main/scenes/underconstruction.js');
  importdict['warroom']=await import('./main/scenes/warroom.js');
  importdict['whitepaper']=await import('./main/scenes/whitepaperscene.js');
}
async function loadmbattle(){
  importdict['map']=await import('./battle/scenes/map.js');
  importdict['tankmanager']=await import('./battle/scenes/tankmanager.js');
  importdict['controlscene']=await import('./battle/scenes/controlscene.js');
}

async function loadmapeditor(){
  //importdict['map']=await import('/js/battle/scenes/map.js');
  importdict['controlscene']=await import('./battle/scenes/controlscene.js');
  importdict['mapeditormain']=await import('./mapeditor/scenes/mapeditormain.js');
  importdict['tankmanager']=await import('./battle/scenes/tankmanager.js');
}


async function buildscene(targetscene,hideit){
  importdict[targetscene].build(hideit).then();
}export { buildscene };

async function clearscene(targetscene){
  importdict[targetscene].clear();
}export { clearscene };
async function hidescene(targetscene){
  importdict[targetscene].hide();
}export { hidescene };

async function showscene(targetscene){
    //var startTime = performance.now();
    importdict[targetscene].show();
    //var endTime = performance.now()
    //console.log(`Call to show took ${endTime - startTime} milliseconds`)
}export { showscene };


function scene(scenename){
  return importdict[scenename];
}export {scene};

/*
function debugscene(){
    return importdict['debugscene'];
}export {debugscene};

function screendoor(){
  return importdict['screendoor'];
}export {screendoor};

function garage(){
  return importdict['garage'];
}export {garage};

function tankscene(){
  return importdict['tankscene'];
}export {tankscene};

function marketroom(){
  return importdict['marketroom'];
}export {marketroom};

function NFTcardsscene(){
  return importdict['nftcardscene'];
}export {NFTcardsscene};

function SODFuelscene(){
  return importdict['SODFscene'];
}export {SODFuelscene};

function underconstruction(){
  return importdict['underconstuction'];
}export {underconstruction};

function warroom(){
  return importdict['warroom'];
}export {warroom};

function whitepaper(){
  return importdict['whitepaper'];
}export {whitepaper};
*/
