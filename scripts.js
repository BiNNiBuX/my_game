//Обьявление переменных
var canvas = document.getElementById("canvas");
var canvasContext = canvas.getContext("2d");
var playerColor = "White";
var xDirection = 10;
var maxSize = 50;
var minSize = 20;
var minSpeed = 10;
var maxSpeed = 30;
var bgPic = new Image();
bgPic.src = 'img/bg.png'
var nlo = new Image();
nlo.src = 'img/nlo.png';
var playerPic = new Image();
playerPic.src = 'img/hero.png';
var meteorPic = new Image();
meteorPic.src = 'img/meteor.png';


//Обьявление обьектов
var GAME = {
    width: 600,
    height: 870,
    ifLost: false,
    backgroudnColor: "red",
    bgPic: new Image(),
}
var PLAYER = {
    x: 275,
    y: 700,
    color: "white",
    width: 55,
    height: 135,
    score: 0,
    lives: 3,
    playerPic: new Image(),
}

var METEOR = {
    x: Math.floor(Math.random() * (GAME.width - maxSize)),
    width: Math.floor(Math.random() * maxSize + minSize),
    y: - maxSize,
    speedy: 10,
    meteorPic: new Image(),
}

var InfoWindow = {
    width: 200,
    height: GAME.height,
    x: GAME.width,
    backgroudnColor: "black",
    textColor: "white",
}

var ENEMY = {
    width: 222,
    height: 122,
    nlo: new Image(),
}

//Настройки
canvas.width = GAME.width + InfoWindow.width;
canvas.height = GAME.height;

//Функции
bgPic.onload = function () {
    GAME.bgPic = bgPic
}
meteorPic.onload = function () {
    METEOR.meteorPic = meteorPic
}

playerPic.onload = function () {
    PLAYER.playerPic = playerPic
}

nlo.onload = function () {
    ENEMY.nlo = nlo;
}

function drawEnemy() {
    if (ENEMY.nlo) {
        canvasContext.drawImage(ENEMY.nlo, (GAME.width - ENEMY.width) / 2, 0, ENEMY.width, ENEMY.height)
    }
}

function drawBackground() {
    canvasContext.fillStyle = GAME.backgroudnColor;
    canvasContext.drawImage(GAME.bgPic, 0, 0, GAME.width, GAME.height);
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
    if (PLAYER.playerPic) {
        canvasContext.drawImage(PLAYER.playerPic, PLAYER.x, PLAYER.y, PLAYER.width, PLAYER.height);
    }
}

function drawMeteor() {
    if (METEOR.meteorPic) {
        console.log(METEOR.meteorPic + ' ' + METEOR.x + ' ' + METEOR.y + ' ' + METEOR.width + ' ' + METEOR.width * 1.7)
        canvasContext.drawImage(METEOR.meteorPic, METEOR.x, METEOR.y, METEOR.width, METEOR.width * 1.7);
    }
}


function respawnMeteor() {
    METEOR.y = -METEOR.width;
    METEOR.width = Math.floor(Math.random() * maxSize + minSize);
    METEOR.x = Math.floor(Math.random() * (GAME.width - METEOR.width));
    METEOR.speedy = Math.floor(Math.random() * maxSpeed + minSpeed);
}

function updateMeteor() {
    METEOR.y += METEOR.speedy;
    var losePositionY = METEOR.y + METEOR.width >= PLAYER.y;
    var losePositionX = (METEOR.x - METEOR.width <= PLAYER.x + PLAYER.width) && (METEOR.x + METEOR.width >= PLAYER.x);
    var scoreUpdate = METEOR.y >= GAME.height + METEOR.width;
    if (scoreUpdate) {
        respawnMeteor();
        PLAYER.score++;
        console.log(PLAYER.score)
    }
    if (losePositionX && losePositionY) {
        PLAYER.lives -= 1;
        respawnMeteor();
        if (PLAYER.lives === 0) {
            GAME.ifLost = true;
        }
    }
}

function drawFrame() {
    drawBackground();
    drawEnemy();
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
    if (GAME.ifLost === false) {
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

