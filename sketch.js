//add variables
var starImg, bgImg;

var star, starBody;

var fairy, fairyImg;

var wall1, wall2;

var sound1

// create your own engine and world
var engine;
var world;

//make it easier by namespacing
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	//add the animation and images
	starImg = loadImage("images/star.png");
	bgImg = loadImage("images/starNight.png");
	fairyImg = loadAnimation("images/fairyImage1.png","images/fairyImage2.png");

	sound1 = loadSound("sound/JoyMusic.mp3");

}

function setup() {

	createCanvas(800, 750);

	// link our engine to matter.js Engine
	engine = Engine.create();
	world = engine.world;

	// create sprites
	star = createSprite(550,30);
	star.addImage(starImg);
	star.scale = 0.2;

	fairy = createSprite(400,375,10,10);
	fairy.addAnimation("zaki", fairyImg);
	fairy.scale =0.2;
	fairy.setCollider("circle",0,0,40);
	fairy.debug = false;
	fairy.velocityX = 10;

	// add create the body within the engine
	starBody = Bodies.circle(550 , 30 , 5 , {restitution:0.5, isStatic:true});
	World.add(world, starBody);

	//add walls to allow the fairy to bounce off the walls
	wall1 = createSprite(-100,375,10,750);

	wall2 = createSprite(820,375,10,750);
	
	//Engine.run(engine);

	//add the sound
	sound1.play(true);
}


function draw() {
	
	//add the background
	background(bgImg);

	// let the star and the star body be at the same point
	star.x= starBody.position.x 
	star.y= starBody.position.y 

	//update the engine
	Engine.update(engine);

	//call the function to drop the star
	keyPressed();

	//make it so that if star and star body is at this point is should become static
	if(star.y > 375 && starBody.position.y > 375){
	  Body.setStatic(starBody,true);
	  fairy.velocityX = 0;
	}

	//log in the star y position
	console.log(star.y);

  
	//with zaki's libary add bouneoff
	bounceOff(fairy, wall1);
	bounceOff(fairy, wall2);

	//draw the sprites
	drawSprites();

	//add text
	fill("white")
	stroke("black")
	strokeWeight(3)
	text("try to time it so the fairy catchs the star!",50,20);
}

function keyPressed() {

	if (keyCode === DOWN_ARROW) {
		Matter.Body.setStatic(starBody,false); 
	}
	
}



