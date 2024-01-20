let carspeed = 10;
let carX = noseX;
let speedMultiplier = 1.0; // if big car fast if small car slow base is 1.0

function preload() {
    world_start = loadSound("world_start.wav");
    setSprites();
}

function setup() {
    canvas = createCanvas(2480, 672);
    canvas.parent('canvas');

    instializeInSetup(game);

    video = createCapture(VIDEO);
    video.size(800, 400);
    video.parent('game_console');

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('Model Loaded');
}

function up_cars() {
    if (noseY > 200) {
        carspeed += speedMultiplier; // speed go brrrr
    }
}

function down_cars() {
    carspeed -= speedMultiplier; // speed go rrrrb
    // speed should NOT be 0.
    carspeed = max(0, carspeed);
}

function right_cars() {
    // go to the right
    carX += carspeed;
}

function left_cars() {
    // go to the left
    carX -= carspeed;
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

// last commit(17:31) i accidentally put the wrong name, the right name is fixed error in html name for code, doubled canvas size and a lot of sounds were made but not yet added to the code. also some art was done