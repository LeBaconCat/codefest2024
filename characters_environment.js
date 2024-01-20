
/*=================================
=            Variables            =
=================================*/

function displace(obj1, obj2) {
    // Check for collision using bounding boxes
    if (
      obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y
    ) 
}
      // Handle displacement
      // You can adjust the displacement logic based on your specific requirements
  
      // For example, you can push the coins upward when they collide with the platform
      obj1.y = obj2.y - obj1.height;
  displace(coins, platform);

/* main variables */
var car, child_with_football,fallen_tree,traffic_cones,speedpad,slowdownpad,star;

/* Control variabes */
var control={
    up: "UP_ARROW", // 32=spaceBar
    left: 'LEFT_ARROW',
    right: 'RIGHT_ARROW',
    revive: 32
  }

//Inner game status, which might affect game balance or playability.
var gameConfig={
  
    // start, playing, over
    status: "start", 
    
    // initial lives of car
    initialLifes: 5,
  
    // character moves speed
    moveSpeed: 10,
  
    // gravity and jump speed for all the characters
    gravity: 1,
    gravityEnemy: 10,
    jump:-15,
  
    // character starting point
    startingPointX: 500,
    startingPointY: 0,
  
    // default canvas size
    screenX:2480,
    screenY:672,
  
    // scores
    timeScores: 0,
    scores: 0
  }
  

/*=====  End of Variables  ======*/


/*====================================
=            Game Status             =
====================================*/

noseX = "";
noseY = "";
GameStatus = "";
game = game

function startGame()
{
  GameStatus = "start";
  document.getElementById("status").innerHTML = "Game is Loading"
}

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

// change game status if any key is pressed
function changeGameStatud(character){
    if(GameStatus=="start" && noseX !="" && gameConfig.status==="start") {
      initializeCharacterStatus(car);
      gameConfig.status= "play";
    }
    if(gameConfig.status==="gameover" && keyDown(control.revive)) {
      gameConfig.status= "start";        
    }
  }
  
/*=====  End of Game Status   ======*/

/*=============================================
=                 Initialize                  =
=============================================*/

//initialize
function initializeInDraw(character){
	frameRate(120);
	
	character.scale=0.35;
	initializeCharacterStatus(character)

    displace(star, star)
	displace(fallen_tree, fallen_tree)    
    displace(star, fallen_tree)
    displace(star, traffic_cones)
	star.collide(child_with_football);
    displace(speedpad, slowdownpad)	
}

function initializeCharacterStatus(character){
    // set up the initial config of character  
    character.scale=0.5;
    character["live"]=true;
    character["liveNumber"]=gameConfig.initialLifes;
    character["status"]='live';
    character["coins"]=0;
    character["dying"]=0;
    character.position.x=gameConfig.startingPointX;
    character.position.y=gameConfig.startingPointY;
  }
  
  function initializeInDraw(){
    background(109,143,252);
    
    
    // make objects not overlap each other.
    displace(fallen_tree, fallen_tree)
    displace(traffic_cones, traffic_cones)
    displace(star, star)
    displace(child_with_football, child_with_football)
  
    // make character not overlap other objects
    if(car.live){
        displace(fallen_tree, car)
        displace(traffic_cones, car)
        displace(child_with_football, car)
        displace(speedpad, car)
        displace(slowdownpad, car)
        displace(star, car)
    }
    
    // character config initialize
    car["standOnObj"]=false;
    car.velocity.x=0;
    car.maxSpeed=20;
  
  }
  
  /*=====       End of Initialize        ======*/

  /*============================================
=            Interactive Elements            =
============================================*/

// Character get coins
function getStars(star,character){
    if( character.overlap(star) && character.live && star.get==false){
      character.stars+=1;
      coin.get=true;
      car_coin.play()
    };
  }

  // Reappear coin after goin is got.
function starVanish(star){
    if(star.get){
      star.position.x=random(50,gameConfig.screenX)+gameConfig.screenX;
      star.get=false;
    };
  }
  
  /*=====  End of Interactive Elements  ======*/


/*=============================================
=    Main character setting and control       =
=============================================*/

/* Make main character standing on objs */
function positionOfCharacter(character){
  
    // Not on the platform
    if(character.live){
      
      // See if standing on bricks
      fallen_tree.forEach(function(element){ standOnObjs(character,element); });
      child_with_football.forEach(function(element){ standOnObjs(character,element); });
      traffic_cones.forEach(function(element){ standOnObjs(character,element); });
      
  
      // If character can only jump if standing on the object
      if(character.standOnObj) jumping(character);
        
    }
  
    // Coins interaction event
    coins.forEach(function(element){
      getCoins(element,car);
      coinVanish(element);
    });

      // Make it stay in the screen
  dontGetOutOfScreen(car);

}

    /* Auto moving character  */
function autoControl(character){
    character.velocity.x+=gameConfig.moveSpeed;
    character.changeAnimation('move');
    character.mirrorX(1);
}

    /* Manual control character */
function manualControl(character){
  
    if(character.live){
      if(noseX < 300){
        character.velocity.x-=gameConfig.moveSpeed;
        character.changeAnimation('move');
        character.mirrorX(-1);
      }
  
      if(nose > 300){
        character.velocity.x+=gameConfig.moveSpeed;
        character.changeAnimation('move');
        character.mirrorX(1);
      }
  
      if(!keyDown(control.left)&&!keyDown(control.right)&&!keyDown(control.up)){ 
        character.changeAnimation('stand');
      }
    }
   
  }
  
  /* Movements of character */
  function jumping(character){
      if( (noseY < 200 &&character.live) || (touchIsDown&&character.live) ){
      car_jump.play();
          character.velocity.y+=gameConfig.jump;
      }
  }
  function updateCharacter(character) {
    // Check if the down arrow key is pressed
    if( (nose > 200 &&character.live) || (touchIsDown&&character.live) ){
        character.velocity.y+=gameConfig.gravity;
    }

    /* See if  obj1 stand on obj2, mainly for see if standing on the objcs*/
function standOnObjs(obj1,obj2){
  
	var obj1_Left=leftSide(obj1);
	var obj1_Right=rightSide(obj1);
	var obj1_Up=upSide(obj1);
	var obj1_Down=downSide(obj1);

	var obj2_Left=leftSide(obj2);
	var obj2_Right=rightSide(obj2);
	var obj2_Up=upSide(obj2);
	var obj2_Down=downSide(obj2);

	if(obj1_Right>=obj2_Left&&obj1_Left<=obj2_Right && obj1_Down<=obj2_Up+7 && obj1_Down>=obj2_Up-7){
		// println("YES");
		obj1.velocity.y = 0;
		obj1.position.y=obj2_Up-(obj1.height/2)-1;
		obj1.standOnObj= true;
	}
}
  }

  // make character die if he touched by enemy
function die(character){
    character.live=false;
    character.dying+=120;
    character.liveNumber--;
    character.status="dead";
    character.changeAnimation('dead');
    character.velocity.y-=2;
    if(character.liveNumber > 0)
    {
      car_die.play();
    }
}

// check character status and response to sprite and game status
function checkStatus(character){    
    if(character.live==false){
      character.changeAnimation('dead');
      character.dying-=1;
      reviveAfterMusic(character);
    }
    if(character.live==false && character.liveNumber==0){
      gameConfig.status="gameover"
      car_gameover.play();
    }
  
  }
  // revive after dying music finished
function reviveAfterMusic(character){
    if( character.live === false && car.liveNumber !==0 && character.dying===0 ){
      character.live=true;
      character.status="live";
      character.position.x=500;
      character.position.y=40;
      character.velocity.y=0;
    }
  }

  /* Make character stay in screen */
function dontGetOutOfScreen(character){
  
    //if e drop in the holes 
    if(character.position.y>gameConfig.screenY&&character.live && character==car){
        die(car);
    }
  
    if(character.position.x>gameConfig.screenX-(character.width*0.5)){
        character.position.x=gameConfig.screenX-(character.width*0.5);
    }else if(character.position.x<character.width*0.5){
      if(character==car){
        character.position.x=character.width*0.5;
      }else{ 
        character.live=false; 
      }
    }
  
  }

  /*=====  End of main character setting and control ======*/

  /*=============================================
=          Enemy setting and control          =
=============================================*/

function enemys(enemys){
    enemys.forEach(function(enemy){
      stateOfEnemy(enemy);
	    positionOfEnemy(enemy);
	    enemy.position.x-=gameConfig.enemyMoveSpeed;
  });
} 

// Check enemy status
function stateOfEnemy(enemy){
    if (enemy.live==false||enemy.position.y>gameConfig.screenY+50){
      enemy.position.x=random(gameConfig.screenX*1.5,2*gameConfig.screenX+50);
      enemy.position.y=random(gameConfig.screenY*0.35,gameConfig.screenY*0.75);
      enemy.live=true;
    }
  }

  /* Make enemy standing on objs */
function positionOfEnemy(enemy){

	fallen_tree.forEach(function(element){ enemyStandOnObjs(enemy, element); });
	child_with_football.forEach(function(element){ enemyStandOnObjs(enemy, element);});
    traffic_cones.forEach(function(element){ enemyStandOnObjs(enemy, element); })
	
	enemy.position.y+=gameConfig.gravityEnemy;

	dontGetOutOfScreen(enemy);
}

/* See if  obj1 stand on obj2, mainly for see if standing on the objcs*/
function enemyStandOnObjs(obj1,obj2){
  
    var obj1_Left=leftSide(obj1);
    var obj1_Right=rightSide(obj1);
    var obj1_Up=upSide(obj1);
    var obj1_Down=downSide(obj1);
  
    var obj2_Left=leftSide(obj2);
    var obj2_Right=rightSide(obj2);
    var obj2_Up=upSide(obj2);
    var obj2_Down=downSide(obj2);
  
    if(obj1_Right>=obj2_Left&&obj1_Left<=obj2_Right && obj1_Down<=obj2_Up+7 && obj1_Down>=obj2_Up-7){
      // println("YES");
      obj1.velocity.y = 0;
      obj1.position.y=obj2_Up-(obj1.height);
    }
  }

  /*=====  End of enemy setting and control ======*/


/*===================================
=            Environment            =
===================================*/

// call all environment scroll functions 
function moveEnvironment(character){
    var environmentScrollingSpeed=gameConfig.moveSpeed*0.3; 
    
    if(gameConfig.status==='play'){
      environmentScrolling(fallen_tree,environmentScrollingSpeed);
      environmentScrolling(child_with_football,environmentScrollingSpeed);
      environmentScrolling(traffic_cones,environmentScrollingSpeed*0.5);
      environmentScrolling(star,environmentScrollingSpeed); 
      character.position.x-=environmentScrollingSpeed;
    }
  }


// scroll different element in the screen
function environmentScrolling(group, environmentScrollingSpeed) {
    group.forEach(function (element) {
      if (element.position.x > -50) {
        element.position.x -= environmentScrollingSpeed;
      } else {
        element.position.x = gameConfig.screenX + 50;
  
        //if group is bricks, randomize its y position
        if (group === bricks) {
          element.position.y = random(gameConfig.screenY*0.35, gameConfig.screenY*0.75);
        }
  
        //if group is bricks or mountains, randomize its x position
        if (group === traffic_cones || group === mountains) {
          element.position.x = random(50, gameConfig.screenX) + gameConfig.screenX;
        }
  
        //if group is fallen_tree, randomize its x & y position
        if (group === fallen_tree) {
          element.position.x = random(50, gameConfig.screenX) + gameConfig.screenX;
          element.position.y = random(0, gameConfig.screenY*0.5);
          element.scale = random(0.3, 1.5);
        }
  
        if (group === star) {
          element.position.x = random(0, gameConfig.screenX) + gameConfig.screenX;
          element.position.y = random(gameConfig.screenY*0.2, gameConfig.screenY * 0.8);
        }
      }
    });
  }
  

/*=====  End of Environment  ======*/


/*=====================================
=            For Debugging            =
=====================================*/

/* for position state of character */
function debugging(character){
	strokeWeight(1);
	fill(255);
	textSize(12);
  text(character.dying, 20,20);
	text(gameConfig.status, 20,80);
	// text("v: "+character.velocity.y,150,20);
	noFill();
	// outline(tube01);
	stroke(251);
	strokeWeight(2);
	outline(character);

	pipes.forEach(function(element){ outline(element); });
  child_with_football.forEach(function(element){ outline(element); });

}

// calculate scores of every game
function scores(character){

    strokeWeight(0);
    fill(255, 255, 255, 71);
    textSize(40);
  
    gameConfig.scores=character.coins+character.kills+gameConfig.timeScores;
  
  
    if(character.live&&gameConfig.status==='play') gameConfig.timeScores+=0.05;
    
    text("scores: "+round(gameConfig.scores),20,40);
    text("lives: "+character.liveNumber,20,80);
  
    if(car.live==false && car.liveNumber!=0){
      fill(0,0,0,150);
      rect(0,0,gameConfig.screenX,gameConfig.screenY);
      
      strokeWeight(7);
      noFill();
      
      stroke(255);
      ellipse(gameConfig.screenX/2,gameConfig.screenY/2-30,150,150)
  
      stroke("red");
      var ratio=(character.liveNumber/gameConfig.initialLifes);
      arc(gameConfig.screenX/2,gameConfig.screenY/2-30,150,150, PI+HALF_PI,(PI+HALF_PI)+(TWO_PI*ratio));
      fill(255, 255, 255);
      noStroke();
      textAlign(CENTER);
      textSize(40);
      text(round(character.liveNumber),gameConfig.screenX/2,gameConfig.screenY/2-35);
      text("lives",gameConfig.screenX/2,gameConfig.screenY/2);
  
      
    }
  
  
  }
  /* make outline of obj*/
function outline(obj){ rect(leftSide(obj),upSide(obj),rightSide(obj)-leftSide(obj),downSide(obj)-upSide(obj));}

/* get each side position of obj*/
function leftSide(obj){ return obj.position.x-(obj.width/2);}
function rightSide(obj){ return obj.position.x+(obj.width/2);}
function upSide(obj){ return obj.position.y-(obj.height/2);}
function downSide(obj){ return obj.position.y+(obj.height/2);}