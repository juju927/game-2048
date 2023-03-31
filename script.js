// variables
const gameGridEl = document.querySelector('.game-grid');
const gridBoxes = document.querySelectorAll('.grid-box');

// functions
function chooseNewTileNumber() {
  // return either 2 or 4
  return [2, 4][Math.round(Math.random())];
};

function createNewTile() {
  // to get empty grid boxes (filter out ones with tiles)
  const emptyGridBoxes = [];
  for (gridBox of gridBoxes) {
    if (!(gridBox.classList.contains("grid-box-tile"))) {
      emptyGridBoxes.push(gridBox);
    }
  };
  // get a random index from the array of empty grid boxes
  const index = Math.floor(Math.random() * emptyGridBoxes.length); 
  const elementToEdit = emptyGridBoxes[index];
  elementToEdit.innerText = chooseNewTileNumber();
  elementToEdit.classList.add("grid-box-tile");
}

function moveLeft() {
  
}





// event listeners