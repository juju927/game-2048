// variables
const gameGridEl = document.querySelector('.game-grid');
const gridBoxes = document.querySelectorAll('.grid-box');

// functions
function chooseNewTileNumber() {
  return [2, 4][Math.round(Math.random())];
}

function createNewTile() {
  // to get empty grid boxes (filter out ones with tiles)
  // ones with tiles need class grid-box-tile
  const emptyGridBoxes = [];
  for (gridBox of gridBoxes) {
    if (!(gridBox.classList.contains("grid-box-tile"))) {
      emptyGridBoxes.push(gridBox);
    }
  };
  const index = Math.floor(Math.random() * emptyGridBoxes.length);
  
  const elementToEdit = emptyGridBoxes[index];

  elementToEdit.innerText = chooseNewTileNumber();
  elementToEdit.classList.add("grid-box-tile");
}

setInterval(createNewTile, 1000);






// event listeners