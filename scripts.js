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

//Настройки
canvas.width = canvasWidth;
canvas.height = canvasHeight;

//Функции
function drawBackground(Color){
    canvasContext.fillStyle = Color;
    canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);
}

function drawPlayer(){
    canvasContext.fillStyle = PLAYER.color;
    canvasContext.fillRect(PLAYER.x, PLAYER.y, PLAYER.width, PLAYER.height);
}

//База
drawBackground("Red");
drawPlayer();