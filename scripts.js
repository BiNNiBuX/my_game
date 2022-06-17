//Обьявление переменных
var canvas = document.getElementById("canvas");
var canvasWidth = 600;
var canvasHeight = 870;
var I = 25;
var canvasContext = canvas.getContext("2d");
var playerColor = "White";

//Обьявление обьектов
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
    x: canvasWidth * 0.5 + 1,
    y: 100,
    size: 20,
    color: "black"
}

//Настройки
canvas.width = canvasWidth;
canvas.height = canvasHeight;

//Функции
function drawBackground() {
    canvasContext.fillStyle = "red";
    canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);
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

function play() {
    drawFrame();
    updateMeteor();
    requestAnimationFrame(play);
}
drawBackground("red");
play();

