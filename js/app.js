var MOV_X = 101;
var MOV_Y = 101;


// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = 20;
    this.ancho = 50;
    this.alto = 85;
    this.velocidad = Math.random() * 4;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

function generarNumeroRan(){
    
    var numero = Math.random();
    
    if(numero < 0.34){
        return 0;
    }else if(numero <= 0.67){
        return 1;
    }else {
        return 2;
    }
    
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    this.x = this.x + MOV_X * dt * this.velocidad;
    if(this.x > 480){
        var locacion = [80.8 , 161.6 , 242.40];
        this.x = 0;
        this.y = locacion[generarNumeroRan];
        this.velocidad = Math.random() * 5;
    }
    if(this.colisiona(jugador)){
        player.reinicio();
    }
    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    Enemy.call(this);
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 405;

};

Player.prototype = Object.create(Enemy.prototype);

Player.prototype.reinicio = function(){
    this.x = 202;
    this.y = 405;
};

Player.prototype.update = function(dt) {
    if(player.y < 20){
        player.reset();
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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
});
