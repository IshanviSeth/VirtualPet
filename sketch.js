//Create variables here
var dog,happyDog,database,foodS,foodStock,database
var position,dog_image,happyDog_image,food,food_image;
function preload()
{
  //load the images here
  dog_image = loadImage("./dogImg1.png")
  happyDog_image = loadImage("./dogImg.png")
  food_image = loadImage("./food_image.jpg")
}

function setup() {
  createCanvas(500,500);
  database = firebase.database();
  dog = createSprite(250,250,10,10);
  dog.shapeColor = "red";
  foodStock = database.ref('Food');
  foodStock.on("value",readStock)

  //Creating the sprite of dog
  dog = createSprite(250,300,20,20)
  //Setting the color 
  dog.shapeColor = "red"
  //Adding the image 
  dog.addImage("dog_image", dog_image)
  dog.scale = 0.2

  //Creating the sprite of food 
  food = createSprite(250,200,20,20)
  //Setting the color 
  food.shapeColor = "yellow"
  //Adding the image 
  food.addImage("food_image", food_image)
  food.scale = 0.3
}
food_remaining = 0
function draw() {  
  background("orange")
  text("Note-Press up arrow key to feed drago milk", 135,50)
  //text.fill("yellow")
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(happyDog_image)
    food_remaining = food_remaining+1
  }
  text("Food Remaining = " + food_remaining,200,150)
  drawSprites();
  //add styles here
  dog.display()
}
function readStock(data){
  foodS = data.val()
}

function writeStock(x){
 if(x<=0){
   x=0
 }else{
   x=x-1
 }
  database.ref('/').update({
    'food':x
  })
}
