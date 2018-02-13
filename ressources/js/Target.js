/**
 * Created by Corentin THOMASSET on 12/02/2018.
 */

class Target {

    constructor() {
        this.position = createVector(-100, -100);
        this.radius = 5;
        this.previousPosition = {};
    }

    sendTargetTouched(){
        ioSend('target-touched', {
            position:this.getPosition(),
            score: currentPlayer.score
        });
    }

    testCollision(player) {
        if(this.isColliding(player)){
            this.setNewCoordinates();

            ++currentPlayer.score;

            this.sendTargetTouched();

            this.previousPosition = this.getPosition();
        }
    }

    setNewCoordinates(){
        this.position = createVector(floor(random(this.radius, width - this.radius)), floor(random(this.radius, height - this.radius)));
    }

    isColliding(player){
        let distX = Math.abs(this.position.x - player.position.x - player.size / 2);
        let distY = Math.abs(this.position.y - player.position.y - player.size / 2);

        if (distX > (player.size / 2 + this.radius)) return false;
        if (distY > (player.size / 2 + this.radius)) return false;


        if (distX <= (player.size / 2)) return true;
        if (distY <= (player.size / 2)) return true;

        let dx = distX - player.size / 2;
        let dy = distY - player.size / 2;
        return (dx * dx + dy * dy <= (this.radius * this.radius));
    }

    draw(){
        fill('#E74C3C');
        ellipse(this.position.x, this.position.y, this.radius*2);
    }

    getPosition(){
        return {
            x: this.position.x,
            y: this.position.y
        }
    }

    setPosition(position){
        this.position.x = position.x;
        this.position.y = position.y;
    }

}