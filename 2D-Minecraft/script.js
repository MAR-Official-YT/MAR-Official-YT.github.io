const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const inventoryElement = document.getElementById('inventory');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const blockSize = 50;
const inventory = {};

const blocks = [
    'Sky', 'Sky', 'Sky', 'Sky', 'Sky',
    'Grass',
    'Dirt', 'Dirt',
    'Stone', 'Stone', 'Stone', 'Stone', 'Stone', 'Stone', 'Stone', 'Stone',
    'Deepslate', 'Deepslate', 'Deepslate', 'Deepslate', 'Deepslate', 'Deepslate', 'Deepslate',
    'Bedrock'
];

function drawBlock(type, x, y) {
    switch(type) {
        case 'Sky': context.fillStyle = '#87ceeb'; break;
        case 'Grass': context.fillStyle = '#7cfc00'; break;
        case 'Dirt': context.fillStyle = '#8b4513'; break;
        case 'Stone': context.fillStyle = '#a9a9a9'; break;
        case 'Deepslate': context.fillStyle = '#696969'; break;
        case 'Bedrock': context.fillStyle = '#2f4f4f'; break;
    }
    context.fillRect(x, y, blockSize, blockSize);
}

function updateInventory() {
    inventoryElement.innerHTML = '';
    Object.keys(inventory).forEach(block => {
        const blockElement = document.createElement('div');
        blockElement.textContent = `${block} (${inventory[block]})`;
        inventoryElement.appendChild(blockElement);
    });
}

function addToInventory(block) {
    if (!inventory[block]) {
        inventory[block] = 0;
    }
    inventory[block]++;
    updateInventory();
}

function removeFromInventory(block) {
    if (inventory[block] > 0) {
        inventory[block]--;
        updateInventory();
    }
}

for (let y = 0; y < blocks.length; y++) {
    drawBlock(blocks[y], canvas.width / 2 - blockSize / 2, y * blockSize);
}

canvas.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    const x = Math.floor(touch.clientX / blockSize) * blockSize;
    const y = Math.floor(touch.clientY / blockSize) * blockSize;

    const blockIndex = Math.floor(y / blockSize);
    const blockType = blocks[blockIndex];

    if (blockType !== 'Sky') {
        blocks[blockIndex] = 'Sky';
        addToInventory(blockType);
        drawBlock('Sky', x, y);
    } else {
        const inventoryKeys = Object.keys(inventory);
        if (inventoryKeys.length > 0) {
            const blockToPlace = inventoryKeys[0];
            if (inventory[blockToPlace] > 0) {
                blocks[blockIndex] = blockToPlace;
                removeFromInventory(blockToPlace);
                drawBlock(blockToPlace, x, y);
            }
        }
    }
});
