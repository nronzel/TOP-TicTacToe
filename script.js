const domCache = {
  "gridItem": Array.from(document.querySelectorAll( "#gridItem" )),
  "restartBtn": document.querySelector( "button.restart-btn" ),
  // "marker": document.getElementById( "select" ),
};

// turn counter
const counter = {
  "count": 1, // if count == 10, no more turns left
};

// event listener loop should be main game loop
// inside the event listener loop it should check for two things:
//  1. if there is already a letter in the selected square
//  2. if the count % 2 == 0, playerTwo's turn, else playerOne's turn

const gameLoop = () => {
  domCache.gridItem.forEach(( item ) => {
    item.addEventListener( "click", () => {
      if ( counter.count % 2 == 0 ) {
        item.textContent = playerTwo.marker;
        counter.count++
      } else {
        item.textContent = playerOne.marker;
        counter.count++
      }
    })
  })
}

const player = ( marker ) => {
  return { 
    marker,
    makeMove() {

    }
  }
}

const playerOne = player("X");
const playerTwo = player("O");

gameLoop();

// clears board and resets turn counter
const restart = () => {
  domCache.gridItem.forEach(( item ) => {
    item.textContent = "";
    counter.count = 0;
  })
}

domCache.restartBtn.addEventListener( 'click', restart )