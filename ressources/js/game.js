/**
 * Created by Corentin THOMASSET on 10/02/2018.
 */

// To prevent scrolling using the arrows and the space bar
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

let currentPlayer;
let keys = [];

let otherPlayers = [];
let leaderboard;
let target;

function canPlay(){
    currentPlayer.canPlay = true;

    if(otherPlayers['length'] == 0){
        target.setNewCoordinates();
        target.sendTargetTouched();
    }
}

function onTargetTouched(id, position, score) {
    target.setPosition(position);

    if (otherPlayers[id]) {
        otherPlayers[id].score = score;
    }
}

function removeUser(socketid) {
    // I postpone the deletion to ensure that all "update-position" of this user can't be received after the deletion
    setTimeout(function () {
        console.log('user has been remove');
        delete otherPlayers[socketid];
    }, 100)
}

function addNewPlayer(userSocketId, position, pseudo) {
    if (otherPlayers[userSocketId] || userSocketId == pb2.sessionid) {
        console.log('Current user');
    } else {
        otherPlayers[userSocketId] = new Player(false, position, pseudo);
    }
}

function updatePosition(userSocketId, position, pseudo) {
    if (userSocketId == pb2.sessionid) return;

    if (otherPlayers[userSocketId]) {
        otherPlayers[userSocketId].setPosition(position);
    } else {
        addNewPlayer(userSocketId, position, pseudo);
    }
}



// P5.JS



function setup() {
    createCanvas(900, 600).parent('canvas-container');

    currentPlayer = new Player(true);
    leaderboard = new Leaderboard();
    target = new Target();

    textSize(17);
    textFont('Calibri');

    noStroke();
}

function draw() {
    background('#2C3E50');

    target.draw();

    target.testCollision(currentPlayer);

    for (let key in  otherPlayers) {
        otherPlayers[key].draw();
    }

    currentPlayer.update();
    currentPlayer.draw();

    leaderboard.printLeaderboard();

}

function keyPressed() {
    keys[keyCode] = true;
}

function keyReleased() {
    keys[keyCode] = false;
}

