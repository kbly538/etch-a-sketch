// Create 16x16 grid out of divs

const MAX_GRID_SIZE = 100;
const DEFAULT_GRID_SIZE = 16;
const MAX_GRID_AREA = MAX_GRID_SIZE * MAX_GRID_SIZE;
const GRID_WIDTH = 800;
const GRID_HEIGHT = 800;
const PAINT_MODE = { default: 1, grayscale: 2, rainbow: 3 }

let userDefineGridSize = DEFAULT_GRID_SIZE;
let gridSize;
let calculatedGridArea;
let cellSize;
let grid;

let selectedColor = "red";
let erasing = false;
let paintMode = PAINT_MODE.default;

let mouseDown = false;
let clicked = false



function setupGrid(userDefineGridSize) {

    gridSize = userDefineGridSize > MAX_GRID_SIZE ? DEFAULT_GRID_SIZE : userDefineGridSize < DEFAULT_GRID_SIZE ? DEFAULT_GRID_SIZE : userDefineGridSize;
    calculatedGridArea = gridSize * gridSize;
    cellSize = GRID_WIDTH / (Math.sqrt(calculatedGridArea))
    erasing = false;
    paintMode = PAINT_MODE.default;
    const eraseButton = document.getElementById('eraser');
    eraseButton.checked = false;

    grid = document.querySelector('.grid')

    if (grid) {
        grid.remove();
    }

}

function createCell() {
    const cell = document.createElement('div');
    return cell;
}

function initializeGrid() {
    const gridWrapper = document.createElement('div');
    gridWrapper.classList.add('grid');
    return gridWrapper;
}

function styleGrid(grid, gridSize) {
    grid.style.width = `${cellSize * gridSize}px`;
    grid.style.height = `${cellSize * gridSize}px`;
}

function createGrid(gridSize) {
    const grid = initializeGrid();
    styleGrid(grid, gridSize)
    gridSize = gridSize * gridSize;

    for (let index = 0; index < gridSize; index++) {

        const cell = createCell();
        cell.classList.add('cell');
        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;
        // Add cells to the wrapper
        grid.appendChild(cell);

    }
    // Attach grid to body
    document.body.appendChild(grid);

}

function fillCellByClick(e) {

    let targetCell = e.target;

    if (e.target.classList.contains('cell')) {
        if (erasing) {
            targetCell.style.backgroundColor = "rgb(221, 216, 210)";
        }
        else if (paintMode === PAINT_MODE.default) {
            targetCell.style.filter = "none";
            targetCell.style.backgroundColor = selectedColor;
        } else if (paintMode === PAINT_MODE.grayscale) {
            targetCell.style.backgroundColor = selectedColor;
            targetCell.style.filter = "grayscale(100%)"
        } else if (paintMode === PAINT_MODE.rainbow) {
            const r = Math.round(Math.random() * 255);
            const g = Math.round(Math.random() * 255);
            const b = Math.round(Math.random() * 255);
            targetCell.style.backgroundColor = `rgb(${r},${g},${b})`;
        }

    }




}

function fillCellByMouseDown(e) {

    let targetCell = e.target;
    if (mouseDown) {
        if (e.target.classList.contains('cell')) {
            if (erasing) {
                targetCell.style.backgroundColor = "rgb(221, 216, 210)";
            }
            else if (paintMode === PAINT_MODE.default) {
                targetCell.style.filter = "none";
                targetCell.style.backgroundColor = selectedColor;
            } else if (paintMode === PAINT_MODE.grayscale) {
                targetCell.style.backgroundColor = selectedColor;
                targetCell.style.filter = "grayscale(100%)"

            } else if (paintMode === PAINT_MODE.rainbow) {
                const r = Math.round(Math.random() * 255);
                const g = Math.round(Math.random() * 255);
                const b = Math.round(Math.random() * 255);
                targetCell.style.backgroundColor = `rgb(${r},${g},${b})`;
            }

        }
    }

}

function colorCell(event) {
    selectedColor = event.target.value;
}

function run() {
    setupGrid(userDefineGridSize);
    createGrid(gridSize);
    let divs = document.querySelector('div.grid');
    let arr = Array.from(divs.children)
    arr.forEach(d => {
        d.addEventListener('click', fillCellByClick);
        d.addEventListener('mousedown', e => { mouseDown = true; e.preventDefault()})
        d.addEventListener('mouseup', e => { mouseDown = false })
        d.addEventListener('mouseover', fillCellByMouseDown)
    })

}

run();




// Listen for eraser events
const eraser = document.getElementById('eraser');
eraser.addEventListener('click', e => {
    eraser.checked === true ? erasing = true : erasing = false;
})



// Listen for clear button events
const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', e => {
    run();
})



// Listen for size selection events
const sizeSelector = document.querySelector('.gridSizeSelect');

sizeSelector.addEventListener('click', e => {
  
    const options = e.target.options;
    const selection = options.selectedIndex;
    userDefineGridSize = +(options[selection].value);
    run();
})


// Lister for color picker events
const colorPicker = document.getElementById('colorPicker');
colorPicker.addEventListener('input', colorCell)


// Listen for painting mode events
const grayscaleButton = document.querySelector("#grayscaleButton");
const rainbowButton = document.querySelector("#rainbowButton");
const customColorButton = document.querySelector("#customButton");
grayscaleButton.addEventListener('click', e => { paintMode = PAINT_MODE.grayscale })
rainbowButton.addEventListener('click', e => { paintMode = PAINT_MODE.rainbow })
customColorButton.addEventListener('click', e => { paintMode = PAINT_MODE.default })

