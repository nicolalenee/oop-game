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
    // start a battle
    this.startNewBattle();
  })
};
Game.prototype.startNewBattle = function() {
  if (this.player.agility > this.currentEnemy.agility) {
    this.isPlayerTurn = true;
  } else {
    this.isPlayerTurn = false;
  }
  console.log('Your stats are as follows:');
  console.table(this.player.getStats());
  console.log(this.currentEnemy.getDescription());
  // individual battle logic
  this.battle();
}
Game.prototype.battle = function() {
  if (this.isPlayerTurn) {
    // player prompts
    inquirer.prompt({
      type: 'list',
      message: 'What would you like to do?',
      name: 'action',
      choices: ['Attack', 'Use Potion']
    })
    .then(({action}) => {
      if (action === 'Use Potion') {
        // follow up prompt
          // if the user DOESN'T have any potions (getInventory() returns false), then return
        if (!this.player.getInventory()) {
          console.log("You don't have any potions!");
          return;
        }
        // if the user DOES have potions allow selection
        inquirer.prompt({
          type: 'list',
          message: 'Which potion would you like to use?',
          name: 'action',
          choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
        })
        .then(({action}) => {
          const potionDetails = action.split(': ');

          this.player.usePotion(potionDetails[0] - 1);
          console.log(`You used a ${potionDetails[1]} potion.`);
        })

      } else {
        const damage = this.player.getAttackValue();
        this.currentEnemy.reduceHealth(damage);

        console.log(`You attacked the ${this.currentEnemy.name}`);
        console.log(this.currentEnemy.getHealth());
      }
    })
  } else {
    const damage = this.currentEnemy.getAttackValue();
    this.player.reduceHealth(damage);

    console.log(`You were attacked by the ${this.currentEnemy.name}`);
    console.log(this.player.getHealth());
  }
}

module.exports = Game;