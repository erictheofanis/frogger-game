// Enemies our player must avoid
var Enemy = function(row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = -100;
    this.y = 60 + (row - 1) * 80;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;


    // Reset enemeies to left after the have reached the end of the row
    if (this.x >= 505) {
        this.x = -10; 
    }
}; 

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function() {
    this.x = 200;
    this.y = 380;
    this.score = 0;
    this.sprite = 'images/char-boy.png';
}; 

Player.prototype.update = function() {
    this.x = 200;
    this.y = 380;
}; 

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}; 


// Handle key entry input
Player.prototype.handleInput = function(key) { 
    if (key === 'left' ) {
     this.x = this.x - 100;
    }

    if (key === 'right' ) {
      this.x = this.x + 100;
    } 

    if (key === 'up' ) {
      this.y = this.y - 80;
    }

    if (key === 'down') {
      this.y = this.y + 80;
    }

    // Keeps player in game boundary
    if (this.y > 380 ) {
        this.y = 380;
    }
    if (this.x > 402.5) {
        this.x = 402.5;
    }
    if (this.x < 2.5) {
        this.x = 2.5;
    }
};

// Resets player to start place
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;     
}; 

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();

const allEnemies = [];

let enemy = new Enemy(); 


// Set enemey speed and numbers in rows
for (let i = 0; i < 5; i++) {

    let bugSpeed = enemySpeed(5, 25) * 10;
    let bugRow = enemySpeed(1, 4);
    enemy = new Enemy(bugRow, bugSpeed);
    
    allEnemies.push(enemy); 
}

function enemySpeed(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    console.log(allowedKeys[e.keyCode]);
});
