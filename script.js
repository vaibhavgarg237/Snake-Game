//Step 1. Initialisation
function init(){
	canvas = document.getElementById('mycanvas');
	W = canvas.width = 1290;
	H = canvas.height = 592;
	pen = canvas.getContext('2d');
	cs = 66;
	game_over = false;
	score = 0;

	//Create a Image Object for Food and Trophy( Scoreboard )
	food_img = new Image();
	food_img.src = "Assets/apple.png";
	
	trophy = new Image();
	trophy.src = "Assets/trophy.png";

	//Obj for random food -> x,y,color ( x and y coord for random food,color )
	food = getRandomFood();

	snake = {
		init_len:5,
		color:"blue",
		cells:[],
		direction:"right",

		createSnake:function(){
			for(var i=this.init_len;i>0;i--){
				this.cells.push({x:i,y:0});
			}
		},

		drawSnake:function(){
			for(var i=0;i<this.cells.length;i++){
				pen.fillStyle = this.color;
				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
			}
		},

		updateSnake:function(){
			//console.log("updating snake according to the direction property");
			//check if the snake has eaten food, increase the length of the snake and 
			//generate new food object
			var headX = this.cells[0].x;
			var headY = this.cells[0].y;

			if(headX==food.x && headY==food.y){
				console.log("Food eaten");
				food = getRandomFood();
				score++;
			}
			else{
				this.cells.pop();
			}
			
			//Response for Key Pressed
			var nextX,nextY;
			if(this.direction=="right"){
				nextX = headX + 1;
				nextY = headY;
			}
			else if(this.direction=="left"){
				nextX = headX - 1;
				nextY = headY;
			}
			else if(this.direction=="down"){
				nextX = headX;
				nextY = headY + 1;
			}
			else{
				nextX = headX;
				nextY = headY - 1;
			}

			this.cells.unshift({x: nextX,y:nextY});

			// Boundary Conditions: Prevents snake from going out
			var last_x = Math.round(W/cs);
			var last_y = Math.round(H/cs);

			if(this.cells[0].y<0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y){
				game_over = true;
			}
		}
	};

	snake.createSnake();
	//Add a Event Listener on the Document Object
	function keyPressed(e){
		//Conditional Statments
		if(e.key=="ArrowRight"){
			snake.direction = "right";
		}
		else if(e.key=="ArrowLeft"){
			snake.direction = "left";
		}
		else if(e.key=="ArrowDown"){
			snake.direction = "down";
		}
		else{
			snake.direction = "up";
		}
		console.log(snake.direction);
	}

	document.addEventListener('keydown',keyPressed) ;
	
}

function draw(){
	//console.log("In Draw");

	//Draw Snake : erase the old frame and draw new updated snake
	pen.clearRect(0,0,W,H);
	snake.drawSnake();

	//Draw Food
	pen.fillStyle = food.color;
	pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);

	//Draw Scoreboard (Trophy)
	pen.drawImage(trophy,18,20,cs,cs);
	pen.fillStyle = "blue";
	pen.font = "20px Roboto"
	pen.fillText(score,50,50);
	
}

function update(){
	//console.log("In Update");
	snake.updateSnake(); 
}

//Called in Init, Generate random food coordinatea
function getRandomFood(){

	var foodX = Math.round(Math.random()*(W-cs)/cs);
	var foodY = Math.round(Math.random()*(H-cs)/cs);

	var food = {
		x:foodX,
		y:foodY,
		color:"red",
	}
	return food
}

function gameloop(){
	if(game_over==true){
		clearInterval(f);
		alert("Game Over");
		return;
	}
	draw();
	update();
}

//Step 1.
init();
//Step 2. Run gameloop for every 200
var f = setInterval(gameloop,200);


