//Обьявление переменных
var canvas = document.getElementById("canvas");
var canvasContext = canvas.getContext("2d");
var playerColor = "White";
var xDirection = 10;
var maxSize = 50;
var minSize = 20;
var minSpeed = 10;
var maxSpeed = 30;

//Обьявление обьектов
var GAME = {
    width: 600,
    height: 870,
    ifLost: false,
    backgroudnColor: "red",
}
var PLAYER = {
    x: 275,
    y: 800,
    color: "white",
    width: 50,
    height: 20,
    score: 0,
    lives: 3,
}

var METEOR = {
    x: Math.floor(Math.random() * (GAME.width - maxSize * 2) + maxSize),
    y: -maxSize,
    size: Math.floor(Math.random() * maxSize + minSize),
    speedy: Math.floor(Math.random() * maxSpeed + minSpeed),
    color: "black",
}

var InfoWindow = {
    width: 200,
    height: GAME.height,
    x: GAME.width,
    backgroudnColor: "black",
    textColor: "white",
}

//Настройки
canvas.width = GAME.width + InfoWindow.width;
canvas.height = GAME.height;

//Функции
function drawBackground() {
    canvasContext.fillStyle = GAME.backgroudnColor;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
}

function drawInfoWindow() {
    canvasContext.fillStyle = InfoWindow.backgroudnColor;
    canvasContext.fillRect(InfoWindow.x, 0, InfoWindow.width, InfoWindow.height);
    canvasContext.fillStyle = InfoWindow.textColor;
    canvasContext.beginPath();
    canvasContext.font = "30px serif";
    canvasContext.fillText("Your Score: " + PLAYER.score, InfoWindow.x + 10, 50);
    canvasContext.fillText("Your Lives: " + PLAYER.lives, InfoWindow.x + 10, 120);
}

function drawPlayer() {
    canvasContext.fillStyle = PLAYER.color;
    canvasContext.fillRect(PLAYER.x, PLAYER.y, PLAYER.width, PLAYER.height);
}

function drawMeteor() {
    canvasContext.fillStyle = METEOR.color;
    canvasContext.beginPath();
    canvasContext.arc(METEOR.x, METEOR.y, METEOR.size, 0, 2 * Math.PI);
    canvasContext.fill();
}

function respawnMeteor() {
    METEOR.size = Math.floor(Math.random() * maxSize + minSize);
    METEOR.x = Math.floor(Math.random() * (GAME.width - METEOR.size * 2) + METEOR.size);
    METEOR.y = -METEOR.size;
    METEOR.speedy = Math.floor(Math.random() * maxSpeed + minSpeed);
}

function updateMeteor() {
    METEOR.y += METEOR.speedy;
    var losePositionY = METEOR.y + METEOR.size >= PLAYER.y;
    var losePositionX = (METEOR.x - METEOR.size <= PLAYER.x + PLAYER.width) && (METEOR.x + METEOR.size >= PLAYER.x);
    var scoreUpdate = METEOR.y >= GAME.height + METEOR.size;
    if (scoreUpdate){
        respawnMeteor();
        PLAYER.score++;
        console.log(PLAYER.score)
    }
    if (losePositionX && losePositionY) {
        PLAYER.lives -= 1;
        respawnMeteor();
        if (PLAYER.lives === 0){
            GAME.ifLost = true;
        }
    }
}

function drawFrame() {
    drawBackground();
    drawPlayer();
    drawMeteor();
    drawInfoWindow();
}

function initEventListeners() {
    window.addEventListener("mousemove", onmousemove);
    window.addEventListener("keydown", onkeydown);
}

function onmousemove(event) {
    if ((event.clientX + PLAYER.width < GAME.width) && (event.clientX - PLAYER.width / 2 > 0)) {
        PLAYER.x = event.clientX - PLAYER.width / 2;
    } else {
        if ((event.clientX + PLAYER.width > GAME.width)) {
            PLAYER.x = GAME.width - PLAYER.width;
        } else {
            PLAYER.x = 0;
        }
    }
}

function onkeydown(event) {
    if (event.key === "ArrowLeft") {
        PLAYER.x = PLAYER.x - xDirection
    }
    if (event.key === "ArrowRight") {
        PLAYER.x = PLAYER.x + xDirection
    }
    if (PLAYER.x < 0) {
        PLAYER.x = 0
    }
    if (PLAYER.x + PLAYER.width > GAME.width) {
        PLAYER.x = GAME.width - PLAYER.width
    }
}

function play() {
    if (GAME.ifLost === false){
        drawFrame();
        updateMeteor();
        requestAnimationFrame(play);
    } else {
        drawFrame();
        alert("You lost");
    }
}

initEventListeners();
play();

