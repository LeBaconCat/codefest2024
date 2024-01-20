

function game(){
    console.log("noseX = " + noseX +" ,noseY = " + noseY)
    initializeInDraw(car);
    moveEnvironment(car);
    drawSprites();

    if(gameConfig.status==='start'){

        fill(0,0,0,150);
        rect(0,0,gameConfig.screenX,gameConfig.screenY);
    
        fill(255, 255, 255);
        textSize(40);
        textAlign(CENTER);
        text("Press Play Button to Start and Play ", gameConfig.screenX/2, gameConfig.screenY/2);
        textSize(40);
    
        stroke(255);
        strokeWeight(7);
        noFill();
    
        changeGameStatud();
      }

        
  if(gameConfig.status==='play'){
    positionOfCharacter(car);
    scores(car);
    manualControl(car);
  
    // optional control version of game
    // autoControl(car);
  
  }

    // if game is over 
  if(gameConfig.status==='gameover'){
    fill(0,0,0,150);
    rect(0,0,gameConfig.screenX,gameConfig.screenY);

    fill(255, 255, 255);
    textSize(40);
    textAlign(CENTER);
    text("GAME OVER", gameConfig.screenX/2, gameConfig.screenY/2+105);
    textSize(15);
    text("Press SPACE to Restart", gameConfig.screenX/2, gameConfig.screenY/2+135);
    textSize(40);
    text(round(gameConfig.scores),gameConfig.screenX/2,gameConfig.screenY/2-35);
    text("points",gameConfig.screenX/2,gameConfig.screenY/2);

    stroke(255);
    strokeWeight(7);
    noFill();
    ellipse(gameConfig.screenX/2,gameConfig.screenY/2-30,160,160)
    changeGameStatud(car)
  }
} 

function preload() {
    car_coin = loadSound("car_coin.wav")
    car_jump = loadSound("car_jump.wav")
    car_die = loadSound("car_die.wav")
    car_gameover = loadSound("car_gameover.wav")
}

function setup() {
    canvas = createCanvas(2480, 672);
    canvas.parent('canvas');

    video = createCapture(VIDEO);
    video.size(800, 400);
    video.parent('game_console');

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('Model Loaded');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
    }
}

function draw() {
    game();
}