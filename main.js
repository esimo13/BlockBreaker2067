const restartBtn = document.getElementById('restart-btn')
const canvas = document.querySelector('#canvas');
const cntxt = canvas.getContext('2d');
const point = document.querySelector(".score")

let isGamePaused = false;
let isGameOver = false;
let score = 0;

//Number of rows and columns
const blockRowCount = 6;
const blockColumnCount = 9;

//Creating ball properties
const ball = {
    x: canvas.width / 2 ,
    y: canvas.height -32, 
    size: 8, //radius of ball
    speed: .001,
    dx: 4, //how do ball moves along the x axis once it deflects
    dy: -4, //how do ball moves up along the y axis once it deflects
};

//Creating single block property
const blockProp = {
    w: 70,
    h: 24,
    padding: 10,
    offsetX: 45,   //position of brick on x-axis, loop through and change for each brick
    offsetY: 60,
    visible: true //turns to false when ball hits brick
}

//Create the blocks in total
const blocks = [];
for(let i = 0; i < blockColumnCount; i++){
    blocks[i] = [];
    for(let j = 0; j < blockRowCount; j++){
        const x = i * (blockProp.w + blockProp.padding) + blockProp.offsetX;
        const y = j * (blockProp.h + blockProp.padding) + blockProp.offsetY;
        blocks[i][j] = { x, y, ...blockProp };
    }    
}

//Creating paddle properties
const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 32,
    w: 80,
    h: 8,
    speed: 8,
    dx: 0
}

//Draw ball onto canvas
function drawBall(){
    cntxt.beginPath();
    cntxt.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    cntxt.fillStyle = '#d300d3';
    cntxt.fill();
    cntxt.closePath();
}

//Draw paddle on canvas
function drawPaddle(){
    cntxt.beginPath();
    cntxt.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    cntxt.fillStyle = '#d300d3';
    cntxt.fill();
    cntxt.closePath();
}


//Function to draw blocks on the canvas
function drawBlocks(){
    blocks.forEach(column => {
        column.forEach(block => {
            cntxt.beginPath();
            cntxt.rect(block.x, block.y, block.w, block.h);
            cntxt.fillStyle = block.visible ? '#d300d3' : 'transparent';
            cntxt.fill();
            cntxt.closePath();
        })
    });
}

//Drawing score on the canvas
function drawScore(){
    score += score;
    point.textContent = score;
}

//Function to move paddle on the canvas
function movePaddle(e){
    paddle.x += paddle.dx;

    //Surrounding wall detection
    //To the right side

    console.log(paddle.x)
    if(paddle.x > 720){
        paddle.x === paddle.x
    }

    //Surrounding wall detection
    //To the left side
    if(paddle.x < 0){
        paddle.x === paddle.x
    }
    
}

//Function to move ball on the canvas
function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;

    //Surrounding wall collision detection(x-axis)
    if(800<=ball.x || ball.x<0 ) ball.dx=ball.dx*(-1);

   
    
    if(500<=ball.y || ball.y<0 || (ball.x>=paddle.x-40 && ball.x<=paddle.x+40 && ball.y>=paddle.y-4 && ball.y<=paddle.y+4)) ball.dy=ball.dy*(-1);
    //Surrounding wall collision detection(y-axis)
    //top and bottom walls
    

    //Paddle collision functionality
    

    //Block collision functionality
    blocks.forEach(column => {
        column.forEach(block => {
            if(block.x === ball.x && block.y === ball.y){
                block.visible =false
            }
        });
    });

    //Lose on missing paddle
    // if(ball.y + ball.size > canvas.height){
    //     alert("Game Over")
    // }
    
}

//Funcion to increase score as block is hit
function increaseScore(){
    
}

//Make all blocks appear
function showAllBlocks(){
    blocks.forEach(column => {
        column.forEach(block => {
            block.visible = true;
        })
    })
}

function showGamePauseText(e){
   if(e.key === "Escape") {
    alert("game paused");
   }
}

function showLevelCompleteText(){
    
}

function showGameOverText(){
    // if(ball.y + ball.size > canvas.height){
    //     alert("Game Over")
    // }
}
// Function called to draw all the canvas elements
function draw(){
    //clear canvas first
    cntxt.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawScore();
    drawPaddle();
    drawBlocks();
}

//Update canvas animation and drawing
function update(){
    movePaddle();
    moveBall();

    //Drawing eveything in the update function
    draw();

    screen = requestAnimationFrame(update);
    if (score == (blockColumnCount*blockRowCount)) {
        
    }else if(isGameOver){
        
    }
}

update();
//restartBtn.style.visibility='hidden';
//Keydown event function
//Targetting the right and left arrow keys
function keyDown(e){
    if(e.key === 'Right' || e.key === 'ArrowRight' && paddle.x<720){
        paddle.x += 10
    } else if(e.key === 'Left' || e.key === 'ArrowLeft' && paddle.x>0){
        paddle.x -= 10
    } 
}

//Keyup event function
function keyUp(e){
    // console.log(e.key);
    if(e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'Left' || e.key === 'ArrowLeft'){

    } 
}

//Keyboard event handlers
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);




