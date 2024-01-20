let speedMultiplier = 1.0; // if big car fast if small car slow base is 1.0

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