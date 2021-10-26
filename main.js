song="";
song1="";
function preload(){
song=loadSound("music.mp3");
song1=loadSound("music2.mp3");
}
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftwrist=0;
scorerightwrist=0;
function setup(){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("posenet is initialised");
}
function gotPoses(results){
if(results.lenght>0){
    console.log(results);
    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log("leftWristX="+leftWristX+"leftWristY="+leftWristY);
    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("rightWristX="+rightWristX+"rightWristY="+rightWristY);
    scoreleftwrist=results[0].pose.keypoints[9].score;
    scorerightwrist=results[0].pose.keypoints[10].score;
    
}
}
function draw(){
image(video,0,0,600,500);
fill('#ff0000');
stroke('#ff0000');
if(scoreleftwrist>0.2){
    circle(leftWristX,leftWristY,20);
    song1.stop();
    song_play=song.isPlaying();
    if(song_play=="false"){
        song.play();
    }
}
if(scorerightwrist>0.2){
    circle(rightWristX,rightWristY,20);
    song.stop();
    song1_play=song1.isPlaying();
    if(song1_play=="false"){
        song1.play();
    }
}

}