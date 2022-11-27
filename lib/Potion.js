class Potion {
  constructor(name) {
    this.types = ['strength', 'agility', 'health'];
    // name is what user entered OR a random index from the this.types[0] array
    this.name = name || this.types[Math.floor(Math.random() * this.types.length)];


    if (this.name === 'health') {
      this.value = Math.floor(Math.random() * 10 + 30);
    } else {
      this.value = Math.floor(Math.random() * 5 + 7);
    }
  }
}

module.exports = Potion;