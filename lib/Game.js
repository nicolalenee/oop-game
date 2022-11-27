const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');
function Game() {
  this.roundNumber = 0;
  this.enemies = [];
  this.currentEnemy;
  this.player;
}

Game.prototype.initializeGame = function() {
  // populate the enemies array on game initialization
  this.enemies.push(new Enemy('goblin', 'sword'));
  this.enemies.push(new Enemy('orc', 'baseball bat'));
  this.enemies.push(new Enemy('skeleton', 'axe'));
  // keep track of which enemy object is currently fighting our player
  this.currentEnemy = this.enemies[0];
  // prompt the user to enter their name
  inquirer.prompt({
    type: 'text',
    name: 'name',
    message: 'What is your name?'
  })
  // destructure name from the prompt object
  .then(({ name }) => {
    this.player = new Player(name);
    // test the object creation
    console.log(this.currentEnemy, this.player);
  })
}

module.exports = Game;