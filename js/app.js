var MOV_X = 101;
var MOV_Y = 101;
var ICON = 'images/char-boy.png';
var NOMBRE;

// Enemies our player must avoid
var Enemy = function(){
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = 50;
    this.ancho = 50;
    this.alto = 85;
    this.velocidad = Math.random()*5;
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
        var locacion = [50 , 140 , 230];
        this.x = 0;
        this.y = locacion[generarNumeroRan()];
        this.velocidad = Math.random()*5;
    }
    if(this.colisiona(player)){
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
    this.sprite = ICON;
    this.x = 202;
    this.y = 424;

};

function cambiarPersonaje(personaje,nombre){
    NOMBRE = nombre;
    switch(personaje){
        case '1':
            ICON = 'images/char-boy.png';
        break;
        case '2': 
            ICON = 'images/char-cat-girl.png';
        break;
        case '3':
            ICON = 'images/char-horn-girl.png';
        break;
        case '4':
            ICON = 'images/char-pink-girl.png';
        break;
        case '5':
            ICON = 'images/char-princess-girl.png';
        break;
    }    
}

Player.prototype = Object.create(Enemy.prototype);

Player.prototype.reinicio = function(){
    this.x = 202;
    this.y = 424;
};

Enemy.prototype.colisiona = function(object) {
    return (this.x < object.x + object.ancho  && this.x + this.ancho  > object.x &&
        this.y < object.y + object.alto && this.y + this.alto > object.y);    
};

Player.prototype.update = function() {
    if(player.y < 20){
        alert(NOMBRE + ", usted a ganado el juego!! Ok para continuar");
        player.reinicio();
    }
};

Player.prototype.render = function(){
	ctx.drawImage(Resources.get(ICON), this.x, this.y);
};

Player.prototype.handleInput = function(direccion){
    switch(direccion){
        case 'up':
            this.y = this.y - MOV_Y;
            break;
        case 'down':
            if(this.y < 424){
                this.y = this.y + MOV_Y;
            }
            break;
        case 'left':
            if(this.x > 0){
                this.x = this.x - MOV_X;
            }
            break;
        case 'right':
            if(this.x < 404){
            this.x = this.x + MOV_X;    
            }    
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for(var i = 1 ; i <= 3 ; i++){
    var enemy = new Enemy();
    allEnemies.push(enemy);
}
var player = new Player();

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
