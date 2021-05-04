function setup(){
    canvas=createCanvas(450,350);
    canvas.center();
    video.hide();
}
status="";
objects=[]; 

function preload() {
    video=createVideo("video.mp4");
}
function start() {
    objectdetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Detecting Objects🔎";
}
function modelLoaded() {
    console.log("Model Has Loaded🔃")
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0.5);
}

function draw() {
    image(video,0,0,450,350);
    if (status != "") {
        objectdetector.detect(video,gotResult);
        for (i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML="Objects Detected🌈 ";
        document.getElementById("number").innerHTML="Number Of Objects Detected Are:"+ objects.length;
        fill("#f28ba0");
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
        noFill();
        stroke("#f28ba0");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        
    }


    }
    
}

function gotResult(error,results) {
   if(error) {
       console.error(error);
   }
   else{
       console.log(results);
       objects=results;
   }
}