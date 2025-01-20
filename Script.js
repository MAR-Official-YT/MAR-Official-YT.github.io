const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const TILE_SIZE = 30;
const MAP_WIDTH = 20;
const MAP_HEIGHT = 15;

canvas.width = MAP_WIDTH * TILE_SIZE;
canvas.height = MAP_HEIGHT * TILE_SIZE;


// Initialize Game Map (Example: ground and few tree and player)
let map = [];
for (let y = 0; y < MAP_HEIGHT; y++) {
   map[y] = [];
   for (let x = 0; x < MAP_WIDTH; x++) {
       map[y][x] = 1; // 1 for ground
   }
}
// adding some tree
map[10][5] = 2;
map[10][6] = 2;
map[9][5] = 2;
map[9][6] = 2;
map[8][5] = 2;
map[8][6] = 2;

// adding player at center
let playerX = Math.floor(MAP_WIDTH/2);
let playerY = Math.floor(MAP_HEIGHT/2);



// Tile Dictionary
const tiles = {
    0: { color: 'white'},
    1: { color: 'green' },     // Ground
    2: { color: 'brown' },     // Tree
    3: { color: 'blue'},      // Player
    // Add more tiles as needed
};


function drawMap() {
    for (let y = 0; y < MAP_HEIGHT; y++) {
        for (let x = 0; x < MAP_WIDTH; x++) {
            const tileType = map[y][x];
            const tile = tiles[tileType] || tiles[0];
            ctx.fillStyle = tile.color;
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);

        }
    }

    //draw the player

    ctx.fillStyle = tiles[3].color;
     ctx.fillRect(playerX * TILE_SIZE, playerY * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}



 // Create Control Buttons
 const controlsDiv = document.getElementById('controls');
 const directions = ['up', 'down', 'left', 'right'];

 directions.forEach(dir => {
     const button = document.createElement('div');
     button.classList.add('control-button');
     button.textContent = dir;
     button.addEventListener('click', () => movePlayer(dir));
     controlsDiv.appendChild(button);
 });

function movePlayer(direction){
     switch(direction){
     case 'up':
         if (playerY > 0) playerY--;
         break;
     case 'down':
             if (playerY < MAP_HEIGHT - 1) playerY++;
             break;
      case 'left':
              if (playerX > 0) playerX--;
             break;
      case 'right':
              if (playerX < MAP_WIDTH -1) playerX++;
             break;
     }
    drawMap();
}
 drawMap(); // initial draw