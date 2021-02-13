const gameUpdate = () => {
  drawMapPaths();
  updateMapEnemies();
  updateMapNPCs();
  player.update();
  requestAnimationFrame(gameUpdate);
}

//draw tile map

const drawMapPaths = () => {
  for (var y = 0; y < mapH; y++) {
    for (var x = 0; x < mapW; x++) {
      switch(gameMap[y][x]) {
        case 0:
          ctx.fillStyle = "#2645e0";
          break;
        default:
          ctx.fillStyle = "#A58361";
      }
      ctx.fillRect(x*tileW,y*tileH,tileW,tileH);
    }
  }
}

// check to see if a tile location is open to move into
function unblocked(x, y) {
  return gameMap[y][x];
}

// Do we even want to color (mark) NPC and enemy tile locations at all?

function updateMapEnemies() {
  enemies.forEach( (thisEnemy, index) => {
    let x = thisEnemy.x;
    let y = thisEnemy.y;
    ctx.fillStyle = "#EE9999";
    ctx.fillRect(x*tileW,y*tileH,tileW,tileH);
   });
}

function updateMapNPCs() {
  npcs.forEach( (thisNPC, index) => {
    let x = thisNPC.x;
    let y = thisNPC.y;
    ctx.fillStyle = "#46B012";
    ctx.fillRect(x*tileW,y*tileH,tileW,tileH);
  });
}

function engageEnemy(enemy) {
  player.enemy = enemy;
  updateActionTile('Enemy', enemy.img, enemy.name, `Level: <span id="enemyLevel">${enemy.level}</span> Chakra: <span id="enemyChakra">${enemy.chakra}</span> Health: <span id="enemyHealth">${enemy.health}</span>`);
  updateMessageTile("You encounter the enemy " + enemy.name + "!");

}

function engageNPC(npc) {
  player.npc = npc;
  updateActionTile("NPC", npc.img, npc.name, npc.type);
  updateMessageTile("You encounter the NPC " + npc.name + "!");
}

function disengage() {
  player.enemy = null;
  player.npc = null;
  updateActionTile('Wilderness', '/images/forest.jpeg');
  updateMessageTile('You are wandering through a vast and mysterious wilderness.');
}

function updateShop() {
  const shop = document.getElementById("shopDiv");
  const npc = player.npc;
  if (npc == null) {
    shop.innerHTML = "There's no shop here!";
  } else {
    shop.innerHTML = `${npc.type} ${npc.name}'s Shop:<ul>`;
    npc.inventory.forEach(slot => {
      shop.innerHTML += `<li><a href="javascript:buy(${slot.item});"> ${slot.item.name} (${slot.qty})</a></li>`;
    });
    shop.innerHTML += "</ul>";
  }
}

function updateTalk() {
  const talk = document.getElementById("talkDiv");
  const enemy = player.enemy;
  const npc = player.npc;
  if (npc != null) {
    talk.innerHTML = `You are talking to ${npc.name}`;
  } else if (enemy != null) {
    talk.innerHTML = `You are talking to ${enemy.name}`;
  } else {
    talk.innerHTML = `Talking to yourself?`;
  }
}


function updateActionTile(title, img, entity="", details="") {
   const tile = document.getElementById('actionTile');
   tile.innerHTML = `<h3>${title}</h3>`;
   tile.innerHTML += `${entity}<br />${details}<br />`;
   tile.innerHTML += `<div><img  src="${img}"></div>`;
}

function updateMessageTile(text) {
  let tile = document.getElementById('messageTile');
  tile.innerHTML = `<p>${text}<br><br></p>`;
}
