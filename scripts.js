//Обьявление переменных
var canvas = document.getElementById("canvas");
var canvasContext = canvas.getContext("2d");
var playerColor = "White";
var xDirection = 10;

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
    live: 3,
}

var METEOR = {
    x: GAME.width * 0.5 + 1,
    y: 100,
    size: 20,
    color: "black"
}

//Настройки
canvas.width = GAME.width;
canvas.height = GAME.height;

//Функции
function drawBackground() {
    canvasContext.fillStyle = GAME.backgroudnColor;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
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

function updateMeteor() {
    METEOR.y += 5;
}

function drawFrame() {
    drawBackground();
    drawPlayer();
    drawMeteor();
}

function initEventListeners() {
    window.addEventListener("mousemove", onmousemove);
    window.addEventListener("keydown", onkeydown);
}

// function onmousemove(event) {
//     if (event.clientX < GAME.width) {
//         PLAYER.x = event.clientX - PLAYER.width / 2;
//     } else {
//         PLAYER.x = GAME.width - PLAYER.width
//     }
// }

function onkeydown(event){
    if (event.key === "ArrowLeft"){
        PLAYER.x = PLAYER.x - xDirection
    }
    if (event.key === "ArrowRight"){
        PLAYER.x = PLAYER.x + xDirection
    }
    if (PLAYER.x < 0){
        PLAYER.x = 0
    }
    if (PLAYER.x + PLAYER.width > GAME.width){
        PLAYER.x = GAME.width - PLAYER.width
    }
}

function play() {
    drawFrame();
    updateMeteor();
    requestAnimationFrame(play);
}

initEventListeners();
play();

