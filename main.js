carspeed = 10
carX = noseX

function preload() {
	world_start = loadSound("world_start.wav");
	setSprites();
}

function setup() {
	canvas = createCanvas(1240,336);
	canvas.parent('canvas');

	instializeInSetup(game);

	video = createCapture(VIDEO);
	video.size(800,400);
	video.parent('game_console');

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose, gotPoses');
}
function modelLoaded(){
	console.log('Model Loaded');
}

function up_cars(){
if (noseY > 200){
    carspeed + 1
}
}

function down_cars(){

}

function right_cars(){

}

function left_cars(){

}


function gotPoses(results){
if(results.length > 0)
{
	console.log(results);
	noseX = results[0].pose.nose.x;
	noseY = results[0].pose.nose.y;
}
}
function draw() {
	game()
}