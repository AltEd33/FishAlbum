class rectangle{
    constructor(xpos,ypos,width,height,color,dx,dy){
        this.xpos=xpos;
        this.ypos=ypos;
        this.width=width;
        this.height=height;
        this.color=color;
        this.dx=dx;
        this.dy=dy;
    }
    draw(context){
        context.fillStyle=this.color;
        context.fillRect(this.xpos,this.ypos,this.width,this.height);
    }
}
class circle{
    constructor(xpos,ypos,radius,color,dx,dy){
        this.xpos=xpos;
        this.ypos=ypos;
        this.radius=radius;
        this.color=color;
        this.dx=dx;
        this.dy=dy;
    }
    draw(context){
        context.beginPath();
        context.fillStyle=this.color;
        context.arc(this.xpos,this.ypos,this.radius,0,Math.PI*2);
        context.fill();
        context.closePath();
    }
    updateHook(gravity,wind){
        if(this.ypos>500){return "underwater";}
        this.ypos-=this.dy;
        this.xpos+=this.dx;
        this.dy-=gravity;
        if(this.dx<=0){this.dx=0;}
        else{this.dx-=wind;}
        return "throwing";
    }
}
function drawSea(context,phi){
    context.beginPath();
    context.lineWidth=1;
    context.lineCap="butt";
    context.fillStyle="rgb(22, 145, 247)";
    context.strokeStyle="rgb(22, 175, 247)";
    moveTo(0,450);
    for(let x=1;x<=400;x++){
        context.lineTo(x,5*Math.sin(x/10+phi)+450);
    }
    context.lineTo(400,600);
    context.lineTo(0,600);
    context.stroke();
    context.fill();
    context.closePath();
}
function drawDock(context,color){
    context.beginPath();
    context.strokeStyle="black";
    context.lineWidth=1;
    context.arc(90,340,60,0,Math.PI,false);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.strokeStyle=color;
    context.lineWidth=20;
    context.lineCap="round";
    context.moveTo(30,500);
    context.lineTo(30,350);
    context.moveTo(150,500);
    context.lineTo(150,350);
    context.stroke();
    context.lineCap="butt";
    context.moveTo(240,500);
    context.lineTo(240,390);
    context.moveTo(0,420);
    context.lineTo(270,420);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.strokeStyle="black";
    context.lineWidth=1;
    context.moveTo(20,373);
    context.lineTo(40,373);
    context.moveTo(140,373);
    context.lineTo(160,373);
    context.lineTo(200,431);
    context.moveTo(20,373);
    context.lineTo(0,383)
    context.stroke();
    context.closePath();
}
function updateRod(context,initialX,initialY,finalX,finalY){
    context.beginPath();
    context.strokeStyle="black";
    context.lineWidth=1;
    context.moveTo(initialX,initialY-5);
    context.lineTo(finalX-0.5,finalY);
    context.stroke();
    context.closePath();
}
function drawSymbol(context){
    context.beginPath();
    context.strokeStyle="rgb(43, 255, 0)";
    context.lineWidth=13;
    context.lineCap="round";
    context.moveTo(210,275);
    context.lineTo(210,300); // 30
    context.moveTo(210,320);
    context.lineTo(210,320); // 20
    context.stroke();
    context.closePath();
}