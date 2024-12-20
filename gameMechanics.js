const Pescado=document.getElementById("Pescado");
const PescadoIMG=document.getElementById("-1");
const ALBUM=document.getElementById("ALBUM");
const rollCounter=document.getElementById("rollCounter");

const IMAGENES=28; // CONFIG
const timeoutMinutes=20; // CONFIG

let blocked=false;
let rolls=JSON.parse(localStorage.getItem("rolls")) || 0;

checkForNewRolls(new Date());

// LOADING GAME AND ALBUM

let foundImages=JSON.parse(localStorage.getItem("foundImages")) || {};
for(let i=1;i<=IMAGENES;i++){
    if(foundImages[i]===undefined){foundImages[i]=0;}

    let usedPath;
    if(foundImages[i]===1){usedPath=`url(assets/d/${i}.jpeg)`;}
    else{usedPath="url(assets/Question.jpg)"}

    let newImage= `<div class="Imagen"><div class="contenedorImagen" style="background-image:${usedPath}" id="${i}"></div></div>`;
    ALBUM.innerHTML+=newImage;
}

function checkForNewRolls(dateNow){
    let lastDate= JSON.parse(localStorage.getItem("lastDate")) || -1;
    
    if(lastDate===-1){
        rolls=2;
        return updateRolls();
    }

    lastDate=new Date(lastDate);

    const diff=parseInt((dateNow-lastDate)/(1000*60));
    if(diff>=timeoutMinutes){rolls=2;}

    updateRolls();
    if(rolls===0){setTimeout(()=>{
        alert(`Quedan ${timeoutMinutes-diff} minutos para más rolls.`)
    },300)}
}

function updateRolls(){
    rollCounter.innerText=`Rolls: ${rolls}`;
    localStorage.setItem("rolls",JSON.stringify(rolls));
}

function pescar(){
    
    if(blocked){return;}
    if(rolls==2){localStorage.setItem("lastDate",JSON.stringify(new Date()));}

    if(state==="static"){
        if(rolls===0){return location.reload();}
        throwHook(4,9);
        rolls--;
        updateRolls();
    }
    else if(state==="capturing"){recompensa();}
    else{state="static";}
}

function recompensa(){
    let imagenObtenida=parseInt(Math.random()*(IMAGENES))+1;
    ALBUM.style.display="none";
    Pescado.style.display="block";
    PescadoIMG.style.backgroundImage=`url(assets/d/${imagenObtenida}.jpeg)`;
    Pescado.classList.add("animation");
    blocked=true;

    if(isNew(imagenObtenida)){
        setInterval(()=>{
            if(Pescado.style.backgroundColor==="green"){Pescado.style.backgroundColor="black"}
            else{Pescado.style.backgroundColor="green"}
        },500);
    }

    foundImages[imagenObtenida]=1;
    localStorage.setItem("foundImages",JSON.stringify(foundImages));
}

function isNew(num){
    if(foundImages[num]===1){return false;}
    return true;
}

function closePescado(){if(blocked){location.reload();}}