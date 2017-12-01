// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.width = 66;
    this.height = 40;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x >= 505) {
        this.x = 0;
    }
};

// Drawing the enemy on the screen
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.x = 200;
    this.y = 400;
    this.width = 40;
    this.height = 66;
    this.sprite = 'images/char-boy.png';
};

//Reset the player to the initial position
Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;

};

//Update player status for collisions
Player.prototype.update = function (dt) {
    this.checkCollisions();
};

//Drawing the player on screen
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Display the winning message and reset game
Player.prototype.win = function () {

    this.x = 200;
    this.y = 500;
    ctx.font = '48px arial';
    ctx.fillStyle = 'blue';
    ctx.fillText('Hooray! You did it!', 70, 650);

};

//Move player based on user input and check for winning
Player.prototype.handleInput = function (key) {
    switch (key) {
    case 'left':
        if (this.x >= 50) {
            this.x = this.x - 100
        };
        break;
    case 'right':
        if (this.x <= 350) {
            this.x = this.x + 100
        };
        break;
    case 'up':
        if (this.y < 41) {
            this.win();
        }
        if (this.y >= 20) {
            this.y = this.y - 90
        };
        break;
    case 'down':
        if (this.y <= 320) {
            this.y = this.y + 90
        };
        break;
    }
};

//Check whether a collision has occured and if so, reset player to initial location
Player.prototype.checkCollisions = function () {
    for (i = 0; i < allEnemies.length; i++) {
        if ((this.x < allEnemies[i].x + allEnemies[i].width) && (this.x + this.width > allEnemies[i].x) &&
            (this.y < allEnemies[i].y + allEnemies[i].height) && (this.height + this.y > allEnemies[i].y)) {

            this.reset();
        }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [new Enemy(0,50,50),new Enemy(0,140,300),new Enemy(0,230,100),new Enemy(0,50,400)];
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});