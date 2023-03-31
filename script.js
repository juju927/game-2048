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
};

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
        boxTo.innerText = Number(boxTo.innerText)*2;
        // 2 - remove boxFrom's number
        boxFrom.innerText = "";
        // 3 - add merged class to boxTo
        boxTo.classList.add("merged");
        // 4 - remove grid-box-tile from boxFrom
        boxFrom.classList.remove("grid-box-tile");
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
    boxTo.innerText = boxFrom.innerText;
    boxFrom.innerText = "";
    // 2 - move class grid-box-tile
    boxTo.classList.add("grid-box-tile");
    boxFrom.classList.remove("grid-box-tile");
    
    if (boxFrom.classList.contains("merged")) {
      // if boxFrom was merged number
      // 3 - move class merged
      boxTo.classList.add("merged")
      boxFrom.classList.remove("merged");
    }
    return boxTo; 
  }
};

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
      for (let i = 1; i < rowOrCol.length; i++) {
        let j = i;
        while (!moveBox(rowOrCol[j], rowOrCol[j-1]).classList.contains(lastLine)) {
          // while box hasn't moved to its final spot, move the same box again
          j--
        }
      }
    } else {
      for (let i = 3; i > 0; i--) {
        let j = i;
        while (!moveBox(rowOrCol[j-1], rowOrCol[j]).classList.contains(lastLine)) {
          // while box hasn't moved to its final spot, move the same box again
          j++
        }
      }
    }
  }
};

push("down");


// for (let rowNum = 1; rowNum <= 4; rowNum++) {
//   const row = document.querySelectorAll(".row"+rowNum);
//   console.log(row);

//   for (let i = 1; i < row.length; i++) {
//     let j = i;
//     console.log(i);
//     while (!moveBox(row[j], row[j-1]).classList.contains("col1")) {
//       j--;
//       console.log(`from: ${row[j]} to: ${row[j-1]} j is ${j}`);
//     }
//   };
// }

// for (let colNum = 1; colNum <= 4; colNum++) {
//   const col = document.querySelectorAll(".col"+colNum);
//   console.log(col);

//   for (let i = 1; i < col.length; i++) {
//     let j = i;
//     console.log(i);
//     while (!moveBox(col[j], col[j-1]).classList.contains("row1")) {
//       j--;
//       console.log(`from: ${col[j]} to: ${col[j-1]} j is ${j}`);
//     }
//   };
// }



// event listeners