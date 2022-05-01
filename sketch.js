var PLAY = 1;
var END = 0;
var gameState = PLAY;

var verde, verde_running, verde_collided;
var ground, invisibleGround, groundImage;

//var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;


function preload(){
  verde_running =   loadAnimation("verde1.png","verde3.png","verde4.png");
  verde_collided = loadAnimation("verde_collided.png");
  
  groundImage = loadImage("ground2.png");
  
 // cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
 verde = createSprite(50,180,20,50);
  
  verde.addAnimation("running", verde_running);
  verde.addAnimation("collided", verde_collided);
  verde.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
 // cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(255);
  text("Pontuação: "+ score, 500,50);
  
  verde.depth = verde.depth + 1;

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    //altere a animação de trex
    verde.changeAnimation("running", verde_running);
    
    if(keyDown("space") && verde.y >= 159) {
      verde.velocityY = -12;
    }
  
    verde.velocityY = verde.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    verde.collide(invisibleGround);
    //spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(verde)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //defina a velocidade de cada objeto do jogo para 0
    ground.velocityX = 0;
    verde.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    //cloudsGroup.setVelocityXEach(0);
    
    //mude a animação de trex 
    verde.changeAnimation("collided",verde_collided); //escrever verificar se estar no lugar certo
    
    //defina o tempo de vida dos objetos do jogo para que eles não sejam destruídos
    obstaclesGroup.setLifetimeEach(-1);
   // cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {// colocar para resetar
      reset();
    }
  }
  
  
  drawSprites();
}

/*function spawnClouds() {
  //escreva o código aqui para gerar as nuvens
 if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //atribua tempo de vida à variável
   // cloud.lifetime = 200;
    
    //ajuste a profundidade (depth)
   // cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adicione cada nuvem ao grupo
  //  cloudsGroup.add(cloud);
  }
  
}*/

function reset(){ // escrever
  gameState = PLAY; // escrever
  gameOver.visible = false;// escrever
  restart.visible = false;// escrever
  
  obstaclesGroup.destroyEach();// escrever
 // cloudsGroup.destroyEach();// escrever
  score = 0;// escrever
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //gere obstáculos aleatórios
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //atribua dimensão e tempo de vida ao obstáculo           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //adicione cada obstáculo ao grupo
    obstaclesGroup.add(obstacle);
  }
}
