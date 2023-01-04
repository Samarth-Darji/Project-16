var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bow , arrow,  background, redB, pinkB, greenB ,blueB ,arrowGroup;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage;
var gameOver, gameOverImage;

var score =0;
function preload(){
  
  backgroundImage = loadImage("background0.png");
  
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
  gameOverImage = loadImage("GameOver.png");
  
}



function setup() {
  createCanvas(400, 400);
  
  //creating background
  scene = createSprite(0,0,400,400);
  scene.addImage(backgroundImage);
  scene.scale = 2.5
  
  // creating bow to shoot arrow
  bow = createSprite(380,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1;

  gameOver = createSprite(200, 190, 10, 10);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.3;
  gameOver.visible = false;

  
  
   score = 0  
  redB= new Group();
  greenB= new Group();
  blueB= new Group();
  pinkB= new Group();
  arrowGroup= new Group();
 
  
}

function draw() {
 background(0);
 if(gameState === PLAY){
  // moving ground
    scene.velocityX = -3 

    if (scene.x < 0){
      scene.x = scene.width/2;
    }
  
  //moving bow
  bow.y = World.mouseY
  
   // release arrow when space key is pressed
  if (keyDown("space")) {
    createArrow();
    
  }
  
  //creating continous enemies
  var select_balloon = Math.round(random(1,4));
  
  if (World.frameCount % 100 == 0) {
    switch(select_balloon ){
      case 1: redBalloon();
      break;
      case 2:blueBalloon();
      break;
      case 3:pinkBalloon();
      break;
      case 4:greenBalloon();
      break;
      default:break;
    }
  }
  
  /*Uncomment correct statement so that 
  game goes to "END" state 
  when red balloon is hit*/
  if (arrowGroup.isTouching(redB)) {
    gameState = END;
  }
  //if (arrowGroup.Collide(redB)) 
  //if (arrowGroup.isCollide(redB)) 
  if(frameCount>2500)//comment this line after selecting the solution
  {
    redB.destroyEach();
    gameState=END; 
   }
 
  if (gameState === END) {

  arrowGroup.setVelocityXEach(0);
  redB.setVelocityXEach(0);
  greenB.setVelocityXEach(0);
  blueB.setVelocityXEach(0);
  greenB.setVelocityXEach(0);

  gameOver.visible = true;
  
  bow.destroy();
  scene.velocityX = 0;
}


/*Uncomment correct if block to 
destroy the blue balloon when hit 
by the arrows */

 if (arrowGroup.isTouching(blueB)) {
  blueB.destroyEach();
  arrowGroup.destroyEach();
  score=score+5;
}

if (arrowGroup.isTouching(greenB)) {
  greenB.destroyEach();
  arrowGroup.destroyEach();
  score=score+10;
}

if (arrowGroup.isTouching(pinkB)) {
  pinkB.destroyEach();
  arrowGroup.destroyEach();
  score=score+2;
}

redB.depth = gameOver.depth;
  gameOver.depth = gameOver.depth+1;


//  if (arrowGroup.isTouching(redB)) {
//   blueB.destroyEach();
//   arrowGroup.destroyEach();
// }


//  if (arrowGroup.isTouching(blueB)) {
//   arrowGroup.destroyEach();
// }


 }
  
  drawSprites();
  fill("RED");
  text("DONOT TOUCH THE RED BALLOON", 90, 30);
  fill("GREEN");
  textSize(20);
  text("Score: "+ score, 310,50);
}


function redBalloon() {
  var red = createSprite(0,Math.round(random(20, 370)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = 3;
  red.lifetime = -150;
  red.scale = 0.1;
  redB.add(red);
}

function blueBalloon() {
  var blue = createSprite(0,Math.round(random(20, 370)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = 3;
  blue.lifetime = 150;
  blue.scale = 0.1;
  blueB.add(blue);
}

function greenBalloon() {
  var green = createSprite(0,Math.round(random(20, 370)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = 3;
  green.lifetime = 150;
  green.scale = 0.1;
  greenB.add(green);
}

function pinkBalloon() {
  var pink = createSprite(0,Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 3;
  pink.lifetime = 150;
  pink.scale = 1.3;
  pinkB.add(pink);
}


// Creating  arrows for bow
 function createArrow() {
  var arrow= createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 360;
  arrow.y=bow.y;
  arrow.velocityX = -4;
  arrow.lifetime = -100;
  arrow.scale = 0.3;
  arrowGroup.add(arrow);
   
}
