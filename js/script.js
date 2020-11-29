class Player {
  constructor (name) {
    this.name = name;
    this.level = 1;
    this.chakra = 20;
    this.health = 100;
    this.x = 0;
    this.y = 0
    this.weapon = null;
    this.inventory = [];
  }

  setWeapon(weapon) {
    this.weapon = weapon;
  };

  addInventory(item) {
    this.inventory.push(item);
  }

}

class Enemy {
  constructor(name, level, chakra, health, path=null) {
    this.name = name;
    this.level = level;
    this.chakra = chakra;
    this.health = health;
    this.img = null;
    this.x = null;
    this.y = null;
    this.inventory = [];
    this.img = path;
  }
  setImg(path) {
    this.img = path;
  }
}

class Location {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }
}

class Weapon {
  constructor(name, value, attack) { 
    this.name = name;
    this.value = value;
    this.attack = attack;
  }
}

// TO DO: ITEMS
class Item {
  constructor (name, value) { 
    this.name = name;
    this.value = value;
  }
}

var shopItems = [
  new Item('sword',100), 
  new Item('egg', 20),
  new Item('mouse', 10)
];

function processKey(e) {
  let k = String.fromCharCode(e.which);
  if (k == "w") {
    console.log("You try to move north...");
  }
  else if (k == "s") {
    console.log("You try to move south...")
  }
  else if (k == "d") {
    console.log("You try to move east...")
  }
  else if (k == "a") {
    console.log("You try to move west...")
  }
}
/*
MULTILINE COMMENTS ARE MADE LIKE THIS! slash + star
*/

let player = new Player("New Player");
let enemies = [];
let mizuki = new Enemy("Mizuki", 1, 20, 100, '/images/mizuki.jpg');
let zabuza = new Enemy("Zabuza", 1, 20, 100);
enemies.push(mizuki);
enemies.push(zabuza);

let enemy = enemies[0];

// LOCATIONS. Need to set x, y locations in map.
let hiddenLeafVillage = new Location('hlv','Hidden Leaf Village');
let hiddenSand = new Location('hs','Hidden Sand Village');
let hiddenRain = new Location('hr','Hidden Rain Village');
let hiddenMist = new Location('hm','Hidden Mist Village');
let hiddenStone = new Location('hS','Hidden Stone Village');
let hiddenCloud = new Location('hc','Hidden Cloud Village');
let hiddenMoon = new Location('hM','Hidden Moon Village');
let tradingPoint = new Location('dp','Degarashi Port');
let hiddenSnow = new Location('HS','Hidden Snow Village');

// WEAPONS
let kunai = new Weapon("Kunai", 0.25, 1.1);
let shuriken = new Weapon("Shuriken", 0.5, 1.2);
let paperBomb = new Weapon("Paper Bomb", 1.5, 1.05);
player.setWeapon(kunai);

// ATTACK function
const attack = () => {
  let playerAttack = Math.round(Math.random() * player.chakra * player.weapon.attack);
  document.getElementById('events').innerText = "You attacked enemy for " + playerAttack + " damage";
  enemy.health -= playerAttack;
  if (enemy.health <= 0) {
    // to do: death/celebration animation
    // to do: prevent spamming of Attack button
    document.getElementById('events').innerText += ". You won!"
    document.getElementById('actionTile').innerText = " You defeated " + enemy.name + "! Believe it!";
    if (enemy.name == "Mizuki") {
      player.level += 3;
      document.getElementById('playerLevel').innerText = player.level;
    }
    return;
  }

  document.getElementById('enemyHealth').innerText = enemy.health;

  setTimeout( function() {
    let enemyAttack = Math.round(Math.random() * enemy.chakra);
    document.getElementById('events').innerText = "Enemy attacked you for " + enemyAttack + " damage";
    player.health -= enemyAttack;
    if (player.health <= 0) {
      // to do: destroy session data, really end game
      document.getElementById('events').innerText += ". You lost!"
      document.getElementById('playerTile').innerText = enemy.name + " defeated you. :(";
      return;
    }
    document.getElementById('playerHealth').innerText = player.health;
  }, 2000);
}

function renamePlayer() {
  const name = prompt("Type in player name:");
  if ((name != null) & (name != ' ')) {
    player.name = name;
    document.getElementById('playerName').innerText = name;
    saveData();
  }
}

function recharge() {
  if (player.playerChakra < 20) {
    player.chakra++;
    document.getElementById("playerChakra").innerText = player.chakra;
  }
}

function toggleDivVis(div) {
  var thisDiv = document.getElementById(div);
  if (thisDiv.classList.contains("visible")) {
    thisDiv.classList.remove("visible");
    thisDiv.classList.add("hidden");
  }
  else {
    thisDiv.classList.remove("hidden");
    thisDiv.classList.add("visible");
  }
  thisDiv.innerHTML = "<h4>" + div.toUpperCase() + "</h4>";
  if (div == 'talk') {
    thisDiv.innerHTML += "<p>You are talking with " + enemy.name;
  }
  if (div == 'shop') {
    console.log('in shop');
    thisDiv.innerHTML += "<ul>";
    shopItems.forEach(item => {
      thisDiv.innerHTML += "<li>" + item.name + "</li>";
    });
    thisDiv.innerHTML += "</ul>";
  }

}

function engageEnemy(enemy) {
  document.getElementById('actionTile').innerHTML = 
        '<h3>Enemy</h3>' +
        '<span id="enemyName">' + enemy.name + '</span><br />' +
        'Level: <span id="enemyLevel">' + enemy.level + '</span> ' +
        'Chakra: <span id="enemyChakra">' + enemy.chakra + '</span> ' +
        'Health: <span id="enemyHealth">' + enemy.health + '</span>' +
        '<div><img id="enemyImage" src="' + enemy.img + '">' +
        '</div>';
}

function randomItem(items) {
  return items[Math.floor(Math.random()*items.length)];    
}

function loadData() {
  console.log('Now loading data...');
  loadData = JSON.parse(localStorage.getItem('GameSave'));
  console.log(loadData);
  if (loadData.name != null) {
    player.name = loadData.name;
  }
  else {
    player.name = "New Player";
  }
  player.level = loadData.level;
  player.chakra = loadData.chakra;
  document.getElementById('playerName').innerText = player.name;
  document.getElementById('playerLevel').innerText = player.level;
  document.getElementById('playerChakra').innerText = player.chakra;
  document.getElementById('playerHealth').innerText = player.health;
}

function saveData() {
  //console.log('Now saving data...');
  localStorage.setItem('GameSave', JSON.stringify(player));
}

loadData();
saveData();
setInterval(saveData, 20000);
engageEnemy(mizuki);


// example of setting a variable for testing purposes
// player.playerLevel = 1;
