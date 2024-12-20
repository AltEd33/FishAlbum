const canvas=document.getElementById("canvas");
const context=canvas.getContext("2d");
const WIDTH=400;
const HEIGHT=600;
canvas.width=WIDTH;
canvas.height=HEIGHT;

const characterSprite=new Image();
let characterCanBeLoaded=false;
characterSprite.src="assets/Character.png";
characterSprite.onload=()=>{characterCanBeLoaded=true;}

let phi=0;
let ranNumber=0;
let searching=false;
let timer=0;
let state="static";

const initialHookX=275;
const initialHookY=350;
let hook= new circle(initialHookX,initialHookY,6,"red",0,0);

function throwHook(dx,dy){  // (4,9)
    hook.dx=dx;
    hook.dy=dy;
    state="throwing";
}

function updateCanvas(){

    requestAnimationFrame(updateCanvas);
    context.clearRect(0,0,WIDTH,HEIGHT);
    phi+=0.1;
    if(phi>2*3.14){phi=0;}
    drawDock(context,"brown");
    if(characterCanBeLoaded){context.drawImage(characterSprite,145,298,150,150);}
    
    if(state==="static"){
        hook.xpos=initialHookX;
        hook.ypos=initialHookY;
        hook.dx=0;
        hook.dy=0;
        timer=0;
        searching=false;
    }

    else if(state==="throwing"){state=hook.updateHook(0.5,0.1);}
    updateRod(context,initialHookX,initialHookY,hook.xpos,hook.ypos);
    hook.draw(context);
    drawSea(context,phi);

    if(state==="underwater" && !searching){
        searching=true;
        timer=0;
        ranNumber=parseInt(Math.random()*60*35);
    }else if(state==="underwater" && searching){
        if(timer===ranNumber){
            state="capturing";
            searching=false;
            timer=0;
        }else{timer++;}
    }

    if(state==="capturing"){
        if(timer===45){state="static";}
        else{
            drawSymbol(context);
            timer++;
        }
    }
}
updateCanvas();