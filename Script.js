// Constants
const WIDTH = 800;
const HEIGHT = 600;
const BLOCK_SIZE = 32;
const GRID_WIDTH = WIDTH / BLOCK_SIZE;
const GRID_HEIGHT = HEIGHT / BLOCK_SIZE;

// Colors
const WHITE = "white";
const BLACK = "black";
const BROWN = "brown";
const GRAY = "gray";
const BLUE = "blue";

// Block Types
const AIR = 0;
const DIRT = 1;
const STONE = 2;
const DIAMOND = 3;

// Get Canvas and Context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


function createWorld() {
    let world = Array(GRID_HEIGHT).fill(null).map(() => Array(GRID_WIDTH).fill(DIRT));

    // Randomly scatter Stone
    for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
            if (Math.random() < 0.3) {
                world[y][x] = STONE;
            }
        }
    }


    // Add a Diamond
    while (true) {
        const x = Math.floor(Math.random() * GRID_WIDTH);
        const y = Math.floor(Math.random() * GRID_HEIGHT);
        if (world[y][x] == DIRT || world[y][x] == STONE) {
            world[y][x] = DIAMOND;
            break;
        }
    }

    return world;
}

function drawWorld(world) {
  for(let y = 0; y < GRID_HEIGHT; y++){
    for(let x = 0; x < GRID_WIDTH; x++){
        const block = world[y][x];
        ctx.beginPath();
        ctx.rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        if (block == DIRT) {
            ctx.fillStyle = BROWN;
        } else if (block == STONE) {
            ctx.fillStyle = GRAY;
        } else if (block == DIAMOND) {
            ctx.fillStyle = BLUE;
        }
        ctx.fill();
    }
  }
}

function drawPlayer(playerX, playerY) {
    ctx.fillStyle = WHITE;
    ctx.fillRect(playerX * BLOCK_SIZE, playerY * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
}


// Initial game variables
let world = createWorld();
let playerX = 0;
let playerY = 0;
let playerInventory = [];
let gameOver = false;


// Game Loop
function gameLoop() {
  if(gameOver) return;

  ctx.fillStyle = BLACK; //background
  ctx.fillRect(0,0,WIDTH,HEIGHT)

  drawWorld(world);
  drawPlayer(playerX, playerY);
  requestAnimationFrame(gameLoop);
}

// Input Handling
document.addEventListener("keydown", (event) => {
    if (gameOver) return;
    if (event.key === "ArrowLeft" && playerX > 0) {
        playerX -= 1;
    } else if (event.key === "ArrowRight" && playerX < GRID_WIDTH - 1) {
        playerX += 1;
    } else if (event.key === "ArrowUp" && playerY > 0) {
        playerY -= 1;
    } else if (event.key === "ArrowDown" && playerY < GRID_HEIGHT - 1) {
        playerY += 1;
    } else if (event.key === " ") {
       const mineX = playerX;
       const mineY = playerY;
       const blockMined = world[mineY][mineX];
       if (blockMined === DIAMOND) {
           playerInventory.push("diamond");
           world[mineY][mineX] = AIR;
           gameOver = true; // Win game
           console.log("You mined a diamond! You win!");

       } else if (blockMined !== AIR) {
           world[mineY][mineX] = AIR;
       }
    }
});

gameLoop(); // Start the game loop
