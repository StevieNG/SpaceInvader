
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.font = 'italic 18px Arial';
   ctx.textAlign = 'center';
   ctx. textBaseline = 'left';
   ctx.fillStyle = 'red';
   ctx.fillText('Score:', 150, 50);
let x=canvas.width/2
let y= canvas.height/2
let deltaX=0;
let deltaY=0;
let start = document.getElementById("start")
let stop = document.getElementById("stop")
let intervalID="";
let status = document.getElementById("gameStatus")
let isShooting =false;
let aliendirection="right";
let bullteX =0
let bulletY =0
let bulletIsAlive= true;
let alienBulletIsAlive =true;
let score =0;
let aliendeltaY =0;
let alienIsShooting =false

let shipImage= new Image()
shipImage.src="./img/ship.svg"

let aliensImage= new Image()
aliensImage.src="./img/alien.svg"

/* The function too draw the title */
function drawTitle() {
   ctx.font = '18px Arial';
   ctx.textAlign = 'center';
   ctx. textBaseline = 'left';
   ctx.fillStyle = 'black';

   ctx.fillText('Score: '+score, 350, 20);
}

/* The functions to start and stop the game */
function main(){
   deltaX=0;
   
   status.innerHTML= " Space Invader !!!"
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
   ctx.fillStyle="green";
   drawTitle();

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
         isAlive: true,
   }
   )
}}   

let sideMove =0;

function drawAlien(){
   for(i=0; i<alien.length; i++) {

      if(alien[i].isAlive===true){
      // ctx.fillStyle="red";
      // ctx.fillRect="red";
      
      
 
      ctx.drawImage(aliensImage, alien[i].x, alien[i].y , 30, 20);}
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
      bulletIsAlive= true;
      drawBullet()}
}

function collision(){
   for (i=0; i<alien.length; i++){
      if (bulletX >=alien[i].x && bulletX <=alien[i].x+30    && bulletY >= alien[i].y && bulletY<= alien[i].y+20  && alien[i].isAlive===true ) {
         alien[i].isAlive=false;
         bulletIsAlive=false
         score+=10;
         // status.innerHTML= score;

      }
   
   
   }  
}

function drawAlienBullet (){
   if(aliendeltaY<=500 && alienBulletIsAlive===true){
   setTimeout( function(){ 
      aliendeltaY+=10;
      ctx.beginPath();
      ctx.fillStyle = "pink";
      // ctx.arc(350+currentx, 480+deltaY, 3, 0, 2 * Math.PI, true)
      ctx.fillRect(alien[1].x+10, alien[1].y+aliendeltaY,5,15);
      // bulletX=350+currentx;
      // bulletY=deltaY+480;
      // console.log("X:" +bulletX)
      // console.log("Y:" +bulletY)
      ctx.stroke();
      ctx.fill();
      // collision()

      drawAlienBullet() }, 20  ) 
      }
      else if ( aliendeltaY>500){
         alienIsShooting=false;}
   }

function shootAlienBullet(){

   if (alienIsShooting===false){
      alienIsShooting=true;
      aliendeltaY=0;

      alienBulletIsAlive= true;
      drawAlienBullet()}

}

 

function drawBullet(){        
         if(deltaY>=-500 && bulletIsAlive===true){
               setTimeout( function(){ 
                  deltaY-=10;
                  ctx.beginPath();
                  ctx.fillStyle = "green";
                  // ctx.arc(350+currentx, 480+deltaY, 3, 0, 2 * Math.PI, true)
                  ctx.fillRect(350+currentx, 480+deltaY,5,15);
                  bulletX=350+currentx;
                  bulletY=deltaY+480;
                  // console.log("X:" +bulletX)
                  // console.log("Y:" +bulletY)
                  ctx.stroke();
                  ctx.fill();
                  collision()
            
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
      //  console.log(deltaX )
      //  console.log(deltaY )
   } else if(e.keyCode === 32) {

       shootBullet();
         // moveAlien();
          shootAlienBullet();
         console.log()
   }
}

setInterval(() => {
   moveAlien();
   drawAlien();
   
   
}, 800);


main()

//    start.addEventListener("click", main)
//    stop.addEventListener("click", stopGame)

