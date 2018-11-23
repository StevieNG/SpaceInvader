
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
let x=canvas.width/2
let y= canvas.height/2
let deltaX=0;
let deltaY=0;
let start = document.getElementById("start")
let stop = document.getElementById("stop")
let intervalID="";
let status = document.getElementById("gameStatus")
let isShooting =false;
let aliendirection="right"      

let shipImage= new Image()
shipImage.src="./img/ship.svg"

let aliensImage= new Image()
aliensImage.src="./img/alien.svg"

// let shipImage= new Image()
// shipImage.src="./img/ship.svg"
   // ctx.drawImage(shipImage,0,0)

/* The functions to start and stop the game */
function main(){
   deltaX=0;
   
   status.innerHTML= " Score: ???? "
   intervalID = setInterval( clearScreen, 20)
   setInterval(drawShip,20)
}


function stopGame(){
   status.innerHTML= " GAME OVER!"
   clearInterval(intervalID)
   deltaX=0;
}

function clearScreen() {
   ctx.clearRect(0, 0, 700, 500); 
}

/* Drawing the Ship that go on the top of the canvas */

function drawShip(){
  
  
   ctx.fillStyle="#FF0000";

   if (deltaX >350){
       deltaX=350;
   }

   else if(deltaX <-350){
       deltaX=-350;
   }
   ctx.drawImage(shipImage,x-25+deltaX,450,50,30)
   // ctx.fillRect();
   drawAlien();
}


/* Drawing the Aliens that go on the top of the canvas */

let alien=[];

for (i=0; i<12; i++){
   for(let j = 0; j < 4; j++) {
   alien.push({
         x: 20+i *50,
         y: 50+j *30,
   }
   )
}}

let sideMove =0;

function drawAlien(){
   for(i=0; i<alien.length; i++) {
      ctx.fillStyle="green";
      ctx.drawImage(aliensImage, alien[i].x, alien[i].y , 30, 20);
   }
}
function alienDirection(){

   if (alien[47].x>= 670 ){
      aliendirection="left"
      for(i=0; i<alien.length; i++) {
         alien[i].y +=10;
      }
    
   }
   if (alien[0].x<= 0 ){
      aliendirection="right"
      for(i=0; i<alien.length; i++) {
         alien[i].y +=10;
      }
   }
}

function moveAlien(){

   alienDirection()
   if (aliendirection==="right"){
      
      for(i=0; i<alien.length; i++) {
         alien[i].x +=10;

   }}

   else {
      for(i=0; i<alien.length; i++) {
         alien[i].x -=10;
      }
   }

}

function shootBullet(){

   if (isShooting===false){
      isShooting=true;
      deltaY=0;
      currentx= deltaX;
      drawBullet()}
}

function drawBullet(){        
         if(deltaY>=-500){
               setTimeout( function(){ 
                  deltaY-=10;
                  ctx.beginPath();
                  ctx.fillStyle = "black";
                  ctx.arc(350+currentx, 480+deltaY, 5, 0, 2 * Math.PI, true)
                  ctx.stroke();
                  ctx.fill();
                   console.log(deltaY)
                  drawBullet() }, 20  ) 
                  }
         else if ( deltaY<500){
            isShooting=false;
         }
}

/* The event listeners that move the ship */

document.onkeydown = function(e) {

   if (e.keyCode === 37){
       deltaX-=5;
   }
   else if (e.keyCode === 39){
       deltaX+=5;
       console.log(deltaX)
   } else if(e.keyCode === 32) {

       shootBullet();
         moveAlien();
         drawAlien();
   }
}



main()

//    start.addEventListener("click", main)
//    stop.addEventListener("click", stopGame)

