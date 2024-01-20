function carAnimation(){
    car=createSprite(gameConfig.startingPointX, gameConfig.startingPointY, gameConfig.startingPoint, 0.30);
    car.addAnimation("stand",'imgs/car/red_car.png');
    car.addAnimation("move",'imgs/car/red_car_2.png');
    car.addAnimation("crouch",'imgs/car/red_car_3.png');
    car.addAnimation("jump",'imgs/car/green_car.png');
    car.addAnimation("dead",'imgs/car/green_car_2.png');
    car.addAnimation("dead",'imgs/car/green_car_3.png');
  };