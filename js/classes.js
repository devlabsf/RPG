class Player {
  constructor(name, chakra=2, health=100, imgPath=null) {
    this.name = name;
    this.level = 1;
    this.chakra = chakra;
    this.health = health;
    this.size = 16;
    this.x = 1;
    this.y = 3;
    this.weapon = null;
    this.inventory = [];
    this.img = imgPath;
    this.enemy = null;
    this.npc = null;
  }

  setImg(imgPath) {
    this.img = imgPath;
  }

  setIcn(icnPath) {
    document.getElementById('player').src = icnPath;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  };

  setWeapon(weapon) {
    this.weapon = weapon;
  };

  setEnemy(enemy) {
    this.enemy = enemy;
  }

  addToInventory(newItem, qty=1) {
    if (checkInventory(this.inventory, newItem) == true) {
      this.inventory.forEach(slot => {
        if (slot.item.name == newItem.name) {
          slot.qty += qty;
        }
      });
    } 
    else {
      this.inventory.push(new InventorySlot(newItem, qty));
    }
  }

  recharge() {
    if (this.chakra < 20) {
      this.chakra++;
      document.getElementById("playerChakra").innerText = this.chakra;
    }
  }

  attack() {
    if (this.enemy == null) {
      updateMessageTile("There's no enemy here!");
      return;
    }
    // fix this code to take into account weapons and armor.
    let playerAttack = Math.round(Math.random() * this.chakra * this.weapon.attack);
    this.chakra = (this.chakra * 0.9).toFixed(1);
    updateMessageTile("You attacked enemy for " + playerAttack + " damage!");
    this.enemy.health -= playerAttack;
    document.getElementById('playerChakra').innerText = player.chakra;

    if (this.enemy.health <= 0) {
      // to do: prevent spamming of Attack button
      for( var i = 0; i < enemies.length; i++){ 
        if ( enemies[i] == this.enemy) { 
            enemies.splice(i, 1); 
        }
      }
      updateMessageTile("You won!");
      updateActionTile("You defeated " + this.enemy.name + "! Believe it!", "/images/tombstone.png");
      this.level++;
      this.enemy = null;
      document.getElementById('playerLevel').innerText = this.level;
      return;
    }
    document.getElementById('enemyHealth').innerText = this.enemy.health;

    setTimeout( function() {
      let enemyAttack = Math.round(Math.random() * player.enemy.chakra);
      updateMessageTile("Enemy attacked you for " + enemyAttack + " damage!");
      player.health -= enemyAttack;
      if (player.health <= 0) {
        // to do: really end game
        player.setImg('/images/tombstone.png');
        updateMessageTile("You died!");
        document.getElementById('playerHealth').innerText = 'R.I.P.';
        return;
      }
      player.enemy.chakra = (player.enemy.chakra * 0.9).toFixed(1);
      document.getElementById('playerHealth').innerText = player.health;
    }, 2000);
  }

  move(direction) {
    switch (direction) {
      case "ArrowUp":
      case "w":
        if (unblocked(this.x, this.y - 1)) {
          this.y -= 1;
        }
        break;
      case "ArrowDown":
      case "s":
        if (unblocked(this.x, this.y + 1)) {
          this.y += 1;
        }
        break;
      case "ArrowLeft":
      case "a":
        if (unblocked(this.x - 1, this.y)) {
          this.x -= 1;
        }
        break;
      case "ArrowRight":
      case "d":
        if (unblocked(this.x + 1, this.y)) {
          this.x += 1;
        }
        break;
      default:
        break;
    }
    disengage();
    enemies.forEach( (enemy) => {
      if (enemy.x == this.x && enemy.y == this.y) {
        this.npc = enemy;
        engageEnemy(enemy);      
      };
    });
    npcs.forEach( (npc) => {
      if (npc.x == this.x && npc.y == this.y) {
        this.npc = npc;
        engageNPC(npc);
        console.log("bingo:" + this.npc.name);  
      };
    });
    updateShop();
    updateTalk();
  }

  update() {
    // update player image, inventory
    document.getElementById("playerImage").innerHTML = '<img src="' + player.img + '" />';
    const margin = (tileW - this.size) / 2;
    ctx.drawImage(document.getElementById('player'), this.x * tileW + margin, this.y * tileH + margin, this.size, this.size);
    let iDiv = document.getElementById("inventoryDiv");iDiv.innerHTML = 'INVENTORY<ul>';
    this.inventory.forEach(slot => {
      iDiv.innerHTML += `<li>${slot.item.name} (${slot.qty})</li>`;
    });
    iDiv += "</ul>";
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
    this.discovered = 1;
    this.aggro = 0;
  }
  setImg(path) {
    this.img = path;
  }
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }
}

class NPC {
  constructor(name, type, imgPath=null) {
    this.name = name;
    this.type = type;
    this.img = null;
    this.x = null;
    this.y = null;
    this.inventory = [];
    this.speech = [];
    this.img = imgPath;
    this.discovered = 1;
  }
  setImg(imgPath) {
    this.img = imgPath;
  }
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }
  // use this shortcut only for initialization. 
  setInventory(items) {
    this.inventory = items;
  }

  addToInventory(newItem, qty=1) {
    if (checkInventory(this.inventory, newItem) == true) {
      this.inventory.forEach(slot => {
        if (slot.item.name == newItem.name) {
          slot.qty += qty;
        }
      });
    } 
    else {
      this.inventory.push(new InventorySlot(newItem, qty));
    }
  }
}

function checkInventory(array, item) {
  let found = false;
  array.forEach(slot => {
    if (slot.item.name == item.name) {
      found = true;
    }
  });
  return found;
}

class Location {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }
}

// valid types are weapon, armor, potion, treasure
class Item {
  constructor(name, itemType, value, description) {
    this.name = name;
    this.itemType = itemType;
    this.description = description;
    this.value = value;
  }
}

// subclasses of Item
class Weapon extends Item {
  constructor(name, value, attack, durability, description="") { 
    super(name, "weapon", value, description);
    this.attack = attack;
    this.durability = durability;
  }
} 
class Armor extends Item {
  constructor(name, value, defense, durability, description="") { 
    super(name, "armor", value);
    this.defense = defense;
    this.durability = durability;
  }
} 
class Treasure extends Item {
  constructor(name, value, description="") { 
    super(name, "treasure", value);
  }
} 
class Potion extends Item {
  constructor(name, value, healing, uses, description="") { 
    super(name, "potion", value, description);
    this.healing = healing;
    this.uses = uses;
  }
} 
class Special extends Item {
  constructor(name, value, description="") { 
    super(name, "special", value, description);
  }
} 

class InventorySlot {
  constructor(item, qty) {
    this.item = item;
    this.qty = qty;
  }
  get getName() {
    return this.item.getName();
  }
  get getVal() {
    return this.item.getVal();
  }
  get getQty() {
    return this.qty;
  }
}