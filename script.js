const gameGridEl = document.querySelector('.game-grid');
const gridBoxes = document.querySelectorAll('.grid-box');

console.log(gridBoxes);


// to get empty grid boxes (filter out ones with tiles)
  // ones with tiles need class grid-box-tile
  // ones
const emptyGridBoxes = [];
for (gridBox of gridBoxes) {
  if (gridBox.classList.contains("grid-box-tile")) {
    console.log("blah");
  } else {
    emptyGridBoxes.push(gridBox);
  }
}
console.log(emptyGridBoxes);