// variables
let madeMove = false;
let score = 0;
let highscore = 0;
let hahaAngy = 0;

const gameGridEl = document.querySelector('.game-grid');
const gridBoxes = document.querySelectorAll('.grid-box');

const scoreUI = document.querySelector('#score');
const highscoreUI = document.querySelector('#highscore');

const buttons = document.querySelectorAll('button');
const gameOverScreen = document.querySelector('.game-over-screen');

// functions
function chooseNewTileNumber() {
  // return either 2 or 4
  return [2, 4][Math.round(Math.random())];
}

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

  // put a number in it
  elementToEdit.innerText = chooseNewTileNumber();
  elementToEdit.classList.add("tile-"+elementToEdit.innerText);
  elementToEdit.classList.add("grid-box-tile");
  elementToEdit.classList.add("new");
}

function moveBox(boxFrom, boxTo) { 
// boxFrom -current box; boxTo -where it will move to
// returns boxTo 
  if (!boxFrom.classList.contains("grid-box-tile")) {
    // ignore boxFrom if it does not have a number
    return boxTo; 
  }

  // --- under this line means boxFrom contains a number ---
  if (boxTo.classList.contains("grid-box-tile")) {
    // boxTo has number
    if (!(boxTo.classList.contains("merged")) && !(boxFrom.classList.contains("merged"))) {
      // boxTo's number & boxFrom's numbers are both not merged ones
      if (boxTo.innerText == boxFrom.innerText) {
        // boxTo's number is same as boxFrom's -> merge boxFrom's and boxTo's numbers
        // 1 - boxTo's number * 2
        boxTo.classList.remove("tile-"+boxTo.innerText);
        boxTo.innerText = Number(boxTo.innerText)*2;
        boxTo.classList.add("tile-"+boxTo.innerText);
          // and add that to score
        score += Number(boxTo.innerText);
        // 2 - remove boxFrom's number
        boxFrom.classList.remove("tile-"+boxFrom.innerText);
        boxFrom.innerText = "";
        // 3 - add merged class to boxTo
        boxTo.classList.add("merged");
        // 4 - remove grid-box-tile from boxFrom
        boxFrom.classList.remove("grid-box-tile");
        
        // note that a move was made
        madeMove = true;
        return boxTo; // final spot -> merged tile
      } else {
        // boxTo's number is different from boxFrom's -> do nothing
        return boxTo; 
      }
    } else {
      // boxTo's number is a merged one -> do nothing
      return boxTo;
    }
  } else {
    // boxTo doesn't have number -> take boxTo's spot
    // 1 - move number
    boxFrom.classList.remove("tile-"+boxFrom.innerText);
    boxTo.innerText = boxFrom.innerText;
    boxFrom.innerText = "";
    boxTo.classList.add("tile-"+boxTo.innerText);
    // 2 - move class grid-box-tile
    boxTo.classList.add("grid-box-tile");
    boxFrom.classList.remove("grid-box-tile");
    
    if (boxFrom.classList.contains("merged")) {
      // if boxFrom was merged number
      // 3 - move class merged
      boxTo.classList.add("merged")
      boxFrom.classList.remove("merged");
    }
    // note that a move was made
    madeMove = true;
    return boxTo; 
  }
}

function push(direction) {
  // direction - "left", "right", "up", "down"
  let axis = "";
  let lastLine = "";

  switch (direction) {
    case "left":
      axis = "row";
      lastLine = "col1";
      break;

    case "right":
      axis = "row";
      lastLine = "col4";
      break;

    case "up":
      axis = "col";
      lastLine = "row1";
      break;

    case "down":
      axis = "col";
      lastLine = "row4";
      break;
  }
  

  for (let k = 1; k <= 4; k++) {
    // get all divs in each row/ column (along pushed axis)
    const rowOrCol = document.querySelectorAll("."+axis+k);
    if (direction == "left" || direction == "up") {
      // towards lower number row/col
      for (let i = 1; i < rowOrCol.length; i++) {
        let j = i;
        while (!moveBox(rowOrCol[j], rowOrCol[j-1]).classList.contains(lastLine)) {
          // while box hasn't moved to its final spot, move the same box again
          j--
        }
      }
    } else {
      // towards higher number row/col
      for (let i = 3; i > 0; i--) {
        let j = i;
        while (!moveBox(rowOrCol[j-1], rowOrCol[j]).classList.contains(lastLine)) {
          // while box hasn't moved to its final spot, move the same box again
          j++
        }
      }
    }
  }
}

function resetMergeNew() {
  for (gridBox of gridBoxes) {
    gridBox.classList.remove("merged");
    gridBox.classList.remove("new");
  }
}

function resetNumbers() {
  for (gridBox of gridBoxes) {
    gridBox.classList.remove("merged");
    gridBox.classList.remove("grid-box-tile");
    for (num of [2,4,8,16,32,64,128,256,512,1024,2048]){
      gridBox.classList.remove("tile-"+num);
    }
    gridBox.innerHTML = "";
  }
}

function startNewGame() {
  resetNumbers();
  resetMergeNew();
  createNewTile();
  createNewTile();
  score = 0;
}

function updateScores() {
  scoreUI.innerText = score;
  if (score > highscore) {
    highscore = score;
  }
  highscoreUI.innerText = highscore;
}

function checkGameOver() {
  // check through all boxes
  for (box of gridBoxes) {
    if (!box.classList.contains('grid-box-tile')) {
      // if even one doesn't have a number
      return false;
    }
  }

  // check if every adjacent box is the same number
  for (let i = 1; i <= 4; i++) {
    // loops through selecting a row, 4 times
    const row = document.querySelectorAll(".row"+i);
    // in the same loop, select a column 4 times
    const col = document.querySelectorAll(".col"+i);
    for (let j = 0; j < 3; j++) {
      // loop through 1st to 3rd box in that row/ col
      if (row[j].innerText == row[j+1].innerText) {
        // if number in the two side-by-side squares are same
        return false;
      }
      if (col[j].innerText == col[j+1].innerText) {
        // if number in the two top-and-bottom squares are same
        return false;
      }       
    }
  }
  console.log("DEATH");
  return true;
}

// event listeners
for (eachButton of buttons) {
  eachButton.addEventListener("click", function() {
    startNewGame();
    score = 0;
    updateScores();
    gameOverScreen.style.display = "none";
    hahaAngy = 0;
  });
};

document.addEventListener("keydown", function(e) {
  if (!e.key.includes("Arrow")) {
    // ignore if not arrow key
    return;
  }

  // remove all merge/ new class states
  resetMergeNew(); 
  // calls the push function with the input's direction as an input
  push(e.key.slice(5).toLowerCase());
  
  if (madeMove) {
    // if user made a move, create a new tile and update the score
    createNewTile();
    updateScores();
    // reset madeMove to false
    madeMove = false;
  } else if (checkGameOver()) {
    // if game is actually over, add to haha angry count to let them struggle
    hahaAngy++;
    // once they've struggled at least 3 times, show game over screen
    if (hahaAngy >= 3) {
      gameOverScreen.style.display = "flex";     
    }
  }
  return;
})