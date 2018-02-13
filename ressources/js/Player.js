/**
 * Created by Corentin THOMASSET on 10/02/2018.
 */

class Player {

    constructor(isCurrentPlayer, position, pseudo) {
        this.isCurrentPlayer = isCurrentPlayer;
        this.size = 25;
        this.canPlay = !isCurrentPlayer;

        if (position) {
            this.position = createVector(position.x, position.y);
        } else {
            this.position = createVector(floor(random(width - this.size)), floor(random(height - this.size)));
        }
        this.velocity = createVector(0, 0);

        this.acceleration = createVector(0, 0);
        this.pseudo = pseudo || '';
        this.score = 0;
    }

    update() {
        if (!this.canPlay) return;

        this.position.add(this.velocity);
        this.velocity.mult(0.95);
        this.velocity.limit(7);

        if (keyIsPressed) {
            if (keys[UP_ARROW] || keys[90]) this.velocity.y--;
            if (keys[DOWN_ARROW] || keys[83]) this.velocity.y++;
            if (keys[RIGHT_ARROW] || keys[68]) this.velocity.x++;
            if (keys[LEFT_ARROW] || keys[81]) this.velocity.x--;
        }

        if (this.position.x + this.size > width) this.position.x = width - this.size;
        if (this.position.x < 0) this.position.x = 0;
        if (this.position.y + this.size > height) this.position.y = height - this.size;
        if (this.position.y < 0) this.position.y = 0;

        ioSend('update-position', {
            position: this.getPosition(),
            pseudo: this.pseudo
        });
    }

    getPosition() {
        return {
            x: this.position.x,
            y: this.position.y
        }
    }

    setPosition(position) {
        this.position.x = position.x;
        this.position.y = position.y;
    }

    setPseudo(pseudo) {
        this.pseudo = pseudo;
    }

    draw() {
        if (!this.canPlay) return;

        fill(this.isCurrentPlayer ? '#18BC9C' : '#F39C12');

        rect(this.position.x, this.position.y, this.size, this.size, 5);


        if (!this.isCurrentPlayer) {
            fill('rgba(255,255,255, 0.6)');
            textAlign(CENTER);
            textSize(14);
            text(this.pseudo, this.position.x + this.size / 2, this.position.y - 10);
            textAlign(LEFT);
            textSize(17);
        }
    }
}