//draw tile map
function drawMap() {
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
  updateMapEnemies();
  updateMapNPCs();
  player.update();
  requestAnimationFrame(drawMap);
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
    if (x == player.x && y == player.y) {
      engageEnemy(thisEnemy);
    };
   });
}

function updateMapNPCs() {
  player.npc = null;
  npcs.forEach( (thisNPC, index) => {
    let x = thisNPC.x;
    let y = thisNPC.y;
    ctx.fillStyle = "#46B012";
    ctx.fillRect(x*tileW,y*tileH,tileW,tileH);
    if (x == player.x && y == player.y) {
      player.npc = thisNPC;
      engageNPC(thisNPC);      
    };
  });
  const shop = document.getElementById("shopDiv");
  if (player.npc == null) {
    shop.innerHTML = "There's no shop here!";
  } else {
    const npc = player.npc;
    shop.innerHTML = `${npc.type} ${npc.name}'s Shop:<ul>`;
    npc.inventory.forEach(slot => {
      shop.innerHTML += `<li><a href="javascript:buy(${slot.item});"> ${slot.item.name} (${slot.qty})</a></li>`;
    });
    shop.innerHTML += "</ul>";
  }
}

function engageEnemy(enemy) {
  player.enemy = enemy;
  updateActionTile('Enemy', enemy.img, enemy.name, `Level: <span id="enemyLevel">${enemy.level}</span> Chakra: <span id="enemyChakra">${enemy.chakra}</span> Health: <span id="enemyHealth">${enemy.health}</span>`);
}

function engageNPC(npc) {
  player.npc = npc;
  updateActionTile("NPC", npc.img, npc.name, npc.type);
}

function disengage() {
  player.enemy = null;
  player.npc = null;
  updateActionTile('Wilderness', '/images/forest.jpeg');
  updateMessageTile('You are wandering through a vast and mysterious wilderness.');
}

function updateActionTile(title, img, entity="", details="") {
   let tile = document.getElementById('actionTile');
   tile.innerHTML = `<h3>${title}</h3>`;
   tile.innerHTML += `${entity}<br />${details}<br />`;
   tile.innerHTML += `<div><img  src="${img}"></div>`;
}

function updateMessageTile(text) {
  let tile = document.getElementById('messageTile');
  tile.innerHTML = `<p>${text}<br><br></p>`;
}
