// load car animation
function CarAnimation(){
    car=createSprite(gameConfig.startingPointX, gameConfig.startingPointY, gameConfig.startingPoint, 0.30);
    car.addAnimation("stand",'imgs/car/red car.png');
    car.addAnimation("move",'imgs/car/red car 2.png','imgs/mario/mario03.png');
    car.addAnimation("crouch",'imgs/car/red car 3.png');
    car.addAnimation("jump",'imgs/car/green car.png');
    car.addAnimation("dead",'imgs/car/green car 2.png');
    car.addAnimation("dead",'imgs/car/green car 3.png');
  };