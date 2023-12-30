//board initial variables
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//bird initial position
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

//bird object
let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
}
//pipes
let pipeArray = [];
let pipeWidth = 64; //width/height ratio = 384/3072 = 1/8
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

let velocityX = -2; //pipes moving left speed
let velocityY = 0; //bird jump speed


//when the page loads
window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;//since board is a canvas element it has these properties
    board.width = boardWidth;
    context = board.getContext("2d");//used for drawing on the board


    //load images
    birdImg = new Image();
    birdImg.src = "./flappybird.png";
    //but image doesn't get loaded we need to wait for it
    birdImg.onload = function () {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    topPipeImg = new Image();
    topPipeImg.src = "./toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./bottompipe.png";
    requestAnimationFrame(update);
    setInterval(placePipes, 1500);//every 1.5 secs
}

function update() {
    requestAnimationFrame(update);//loop
    context.clearRect(0, 0, board.width, board.height);

    //bird
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        // if (!pipe.passed && bird.x > pipe.x + pipe.width) {
        //     score += 0.5; //0.5 because there are 2 pipes! so 0.5*2 = 1, 1 for each set of pipes
        //     pipe.passed = true;
        // }

        // if (detectCollision(bird, pipe)) {
        //     gameOver = true;
        // }
    }

}
function placePipes() {
    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace = board.height/4;


    let topPipe = {
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }
    pipeArray.push(topPipe);
    let bottomPipe = {
        img : bottomPipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(bottomPipe);

}
function moveBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {
        //jump
        velocityY = -6;

        //reset game
        // if (gameOver) {
        //     bird.y = birdY;
        //     pipeArray = [];
        //     score = 0;
        //     gameOver = false;
        // }
    }
}