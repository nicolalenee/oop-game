const Potion = require('../lib/Potion');
const Character = require('./Character');
class Player extends Character {
  constructor(name=' ') {
    super(name);
    this.inventory = [new Potion('health'), new Potion()];
  }
  getStats() {
    return {
      potions: this.inventory.length,
      health: this.health,
      strength: this.strength,
      agility: this.agility
    };
  };

  getInventory() {
    if (this.inventory.length){
      return this.inventory;
    }
    return false;
  };

  addPotion(potion) {
    this.inventory.push(potion);
  };

  usePotion(index){
    // remove a single potion from original array and create a new array of the removed potion. then the potion at the index[0] of the new array is saved into the potion variable
    const potion = this.getInventory().splice(index, 1)[0];
    
    switch (potion.name){
      case 'agility':
        this.agility += potion.value;
        break;
      case 'health':
        this.health += potion.value;
        break;
      case 'strength':
        this.strength += potion.value;
        break;
    }
  }
}

module.exports = Player;