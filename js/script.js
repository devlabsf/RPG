// initialize game 
const gameMap = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const ctx = document.getElementById("game").getContext("2d");
const tileW = 25, tileH = 24;
const mapW = 26, mapH = 8;
const dirKeys = ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','w','a','s','d'];

// UTILITY FUNCTIONS //

// processKey: handle keyboard-to-function mappings
// TO DO with LAZLO: add Attack, Recharge
function processKey(e) {
  if (dirKeys.includes(e.key)) {
    player.move(e.key);
  } else if (e.key == "S") {
    toggleDivVis('shopDiv')
  } else if (e.key == "T") {
    toggleDivVis('talkDiv');
  } else if (e.key == "I") {
    toggleDivVis('inventoryDiv');
  } else if (e.key == "R") {
    player.recharge();
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
    if (enemy != null) {
      thisDiv.innerHTML += "<p>You are talking with " + enemy.name;
    }
    else if (npc != null) {
      thisDiv.innerHTML += "<p>You are talking with " + npc.name;
    }
  }
}

// general function to return a random item from a list (array)
function randomItem(items) {
  return items[Math.floor(Math.random()*items.length)];
}

function renamePlayer() {
  const name = prompt("Type in player name:");
  if ((name != null) & (name != ' ')) {
    player.name = name;
    document.getElementById('playerName').innerText = name;
    saveData();
  }
}

// Let's pause these for a while...
// function loadData() {
//   console.log('Now loading data...');
//   savedData = JSON.parse(localStorage.getItem('GameSave'));
//   if (savedData != null) {
//     player.name = savedData.name;
//     player.level = savedData.level;
//     player.chakra = savedData.chakra;
//     player.health = savedData.health;
//     player.inventory = savedData.inventory;
//   } else {
//     player.name = "New Player";
//   }
//   document.getElementById('playerName').innerText = player.name;
//   document.getElementById('playerLevel').innerText = player.level;
//   document.getElementById('playerChakra').innerText = player.chakra;
//   document.getElementById('playerHealth').innerText = player.health;
// }

// function saveData() {
//   localStorage.setItem('PlayerSave', JSON.stringify(player));
//   localStorage.setItem('GameSave', JSON.stringify(gameItems));
// }

function initPlayer() {
// new players should choose from a set list of starting configs
// each of which comes with a class, chakra, health, <img>, <icn>. 
// so all this init stuff should be done in the constructor

// GENERIC PLAYER
  player.setImg('/images/yo.jpeg');
  player.setIcn('/images/emperor.png');
  player.addToInventory(kunai);
  player.addToInventory(paperBomb);
  player.addToInventory(bagOfGold);
  player.addToInventory(kunai);
  player.addToInventory(smokeBomb);
  player.setWeapon(kunai);
  player.name = "New Player (click to change)";
  document.getElementById('playerName').innerText = player.name;
  document.getElementById('playerLevel').innerText = player.level;
  document.getElementById('playerChakra').innerText = player.chakra;
  document.getElementById('playerHealth').innerText = player.health;
}

// MAIN BEGINS HERE //
// I'm not sure that we should be saving and loading data.
//loadData();
//saveData();
//setInterval(saveData, 30000);
let player = new Player("New Player");
initPlayer();

document.body.addEventListener("keydown", (event) => { 
  processKey(event) 
});

requestAnimationFrame(drawMap);
