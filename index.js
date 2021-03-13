const cvs = document.getElementById("myCanvas");
const ctx = cvs.getContext("2d");
const labelScore = document.getElementById("labelScore");
const myMusic = document.getElementById("music");
const eatSound = new Audio("mixkit-chewing-something-crunchy-2244.wav", 100, true);
const gameOverSound = new Audio("mixkit-arcade-retro-game-over-213.wav", 100, true);
myMusic.volume = 0.2;

cvs.width = screen.availWidth / 2;
cvs.height = screen.availHeight / 2;
var YOUR_SCORE = "Your score: ";
var score = 0;
var frames = 0;
var speed = speedDefault;
var speedDefault = -2;
var foodEaten = false;
var dec = 10

const direction = {
    current: 0,
    idle: 0,
    right: 1,
    down: 2,
    left: 3,
    up: 4
}

document.addEventListener("keydown", function(evt) {
    setspeedDefault();
    //console.log("key = " + evt.key)
    switch (evt.key) {
        case '4':
            //move left
            if (direction.current != direction.left && direction.current != direction.right) direction.current = direction.left;
            break;
        case "ArrowLeft":
            //move left
            if (direction.current != direction.left && direction.current != direction.right) direction.current = direction.left;
            break;
        case "q":
            //move left
            if (direction.current != direction.left && direction.current != direction.right) direction.current = direction.left;
            break;

        case '8':
            //move up
            if (direction.current != direction.up && direction.current != direction.down) direction.current = direction.up;
            break;
        case 'z':
            //move up
            if (direction.current != direction.up && direction.current != direction.down) direction.current = direction.up;
            break;
        case "ArrowUp":
            //move up
            if (direction.current != direction.up && direction.current != direction.down) direction.current = direction.up;
            break;

        case '6':
            //move right
            if (direction.current != direction.right && direction.current != direction.left) direction.current = direction.right;
            break;
        case 'd':
            //move right
            if (direction.current != direction.right && direction.current != direction.left) direction.current = direction.right;
            break;
        case "ArrowRight":
            //move right
            if (direction.current != direction.right && direction.current != direction.left) direction.current = direction.right;
            break;

        case '2':
            //move down
            if (direction.current != direction.down && direction.current != direction.up) direction.current = direction.down;
            break;
        case 's':
            //move down
            if (direction.current != direction.down && direction.current != direction.up) direction.current = direction.down;
            break;
        case "ArrowDown":
            //move down
            if (direction.current != direction.down && direction.current != direction.up) direction.current = direction.down;
            break;
    }
    myMusic.play();
});

/*button key*/
function pressKey(key) {
    var k = key;
    setspeedDefault();
    switch (k) {
        case '4':
            //move left
            if (direction.current != direction.left && direction.current != direction.right) direction.current = direction.left;
            console.log("Key = " + key);
            break;
        case '8':
            //move up
            if (direction.current != direction.up && direction.current != direction.down) direction.current = direction.up;
            break;
        case '6':
            //move right
            if (direction.current != direction.right && direction.current != direction.left) direction.current = direction.right;
            break;
        case '2':
            //move down
            if (direction.current != direction.down && direction.current != direction.up) direction.current = direction.down;
            break;
    }
    myMusic.play();
};

function getDistance(pointX1, pointY1, pointX2, pointY2) {
    let distanceX = pointX2 - pointX1;
    let distanceY = pointY2 - pointY1;

    return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
}

const food = {
    x: Math.random() * cvs.width,
    y: Math.random() * cvs.height,
    r: 10,

    draw: function() {
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}
const snake = {
    radius: 10,
    position: [{ x: Math.random() * cvs.width, y: Math.random() * cvs.height }],

    draw: function() {

        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];
            if (i == 0) {
                ctx.fillStyle = "red";
            } else {
                ctx.fillStyle = "black";
            }
            ctx.beginPath();
            ctx.arc(p.x, p.y, this.radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        }
    },

    update: function() {
        if (frames % (speed * 6) == 0) { /* speed of the snake */
            //snake eat food
            if (foodEaten == true) {

                this.position.push({
                    x: this.position[this.position.length - 1].x,
                    y: this.position[this.position.length - 1].y
                });
                foodEaten = false;
                score = score + 1;
                //labelScore.textContent = YOUR_SCORE + score;
            }

            //snake move
            if (this.position[0].x < 0) this.position[0].x = cvs.width - 10;
            if (this.position[0].x > cvs.width) this.position[0].x = 10;
            if (this.position[0].y < 0) this.position[0].y = cvs.height - 10;
            if (this.position[0].y > cvs.height) this.position[0].y = 10;

            for (let i = this.position.length - 1; i > 0; i--) {
                //death
                if (this.position[0].x == this.position[i].x && this.position[0].y == this.position[i].y && this.position.length > 2) {
                    score = 0;
                    this.position.splice(1);
                    gameOverSound.play();
                    break;
                }
                this.position[i].x = this.position[i - 1].x;
                this.position[i].y = this.position[i - 1].y;

            }
            if (direction.current == direction.right) {

                this.position[0].x += 20;
            }
            if (direction.current == direction.left) {
                this.position[0].x -= 20;
            }
            if (direction.current == direction.up) {
                this.position[0].y -= 20;
            }
            if (direction.current == direction.down) {
                this.position[0].y += 20;
            };
            //food collision
            if (getDistance(food.x, food.y, this.position[0].x, this.position[0].y) <= 2 * food.r) {
                food.x = Math.random() * cvs.width;
                food.y = Math.random() * cvs.height;
                foodEaten = true;
                eatSound.play();

            }
        }

    }
}

function main() {

    ctx.clearRect(0, 0, cvs.width, cvs.height);
    snake.update();
    snake.draw();
    food.draw();
    labelScore.textContent = YOUR_SCORE + score;
    frames++;

    if (score == dec) {
        labelScore.style.color = getRandomColor();
        dec = dec + 10;
    }
    if (score == 0) {
        labelScore.style.color = "black";
    }

    if (myMusic.ended == true) {
        myMusic.play();

    }
    requestAnimationFrame(main);
}
requestAnimationFrame(main);



function play() {
    myMusic.play();
    setspeedDefault();
}

function pause() {
    myMusic.pause();
    setspeedpauze();
}

function setspeedDefault() {
    speed = speedDefault;
}

function setspeedpauze() {
    speed = 0;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}