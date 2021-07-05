var database;
var happydog,dog;
var foods,foodstock;
var food;

var feed,addfood;
var fedTime,lastFed;


function preload(){
    dogimj = loadImage("Dog.png");
    happydogimj = loadImage("happydog.png");
}


function setup(){
createCanvas(500,500);

database = firebase.database();

writeStock(21)

food = new Food();

dog = createSprite(250,250,20,20);
dog.addImage("dogimj",dogimj);
dog.scale = 0.1;

feed = createButton("Feed the dog");
feed.position(700,95);
feed.mousePressed(feedDog);

addfood= createButton("Add Food");
addfood.position(800,95);
addfood.mousePressed(addFoods)

foodstock = database.ref('Food');
foodstock.on("value",readStock)

}


function draw(){

    background(46,139,87);

/*
    if(keyWentDown(UP_ARROW)){
       // database.ref('Food').set({
      //      Food : foodstock - 1
      //foods = foods - 1;
      writeStock(foods);
     //   })
     dog.addImage(happydogimj);
    }
*/

    food.display();

    //print = database.ref('Food');
   // print.on("value",readStock)
    //console.log(print);

    lastFed = database.ref("FeedTime");
    lastFed.on("value",readlastFed)


    hour();

    fill(255,255,254);
    textSize(15);
    if(lastFed >= 12){
        text("Last Feed : " + lastFed % 12 + " PM",350,30);
    }else if (lastFed === 0){
        text ("last Feed : 12 AM",350,30);
    }else{
        text ("lastFeed : " + lastFed + "AM", 350,30);
    }


    drawSprites();

   
   
    fill ("red");
    //Stroke(5);

    text("Food Left = " + foods,200,50,textSize(20));

}

function readStock (data){
    foods = data.val();
}

function writeStock(x){

    if (x<=0){
        x = 0;
    }else{
        x = x - 1;
    }

    database.ref('/').update({
        'Food' : x
    })
}

function feedDog(){

    dog.addImage("happydogimj",happydogimj);

    //food.updateFoodStock(food.getFoodStock() - 1);
    database.ref('/').update({

        'Food' : food.getFoodStock(),
        'FeedTime' : hour()

    })

}

function addFoods(){

    foods ++;
    database.ref('/').update({

        'Food' : foods

    })

}

async function hour(){

    var information = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata")
    var informationJSON = await information.json();

    var dt = informationJSON.datetime;
    var hour = dt.slice(11,13);

    database.ref('/').update({

        'FeedTime' : hour
    })
    

}

function readlastFed(data){

    lastFed = data.val()

}
