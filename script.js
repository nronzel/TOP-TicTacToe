const domCache = {
  "gridContainer": document.querySelector(".grid-container"),
  "gridItem": Array.from(document.querySelectorAll( "#gridItem" )),
  "restartBtn": document.querySelector( "button.restart-btn" ),
  // "marker": document.getElementById( "select" ),
};

// turn counter
const counter = {
  "count": 1, // if count == 10, no more turns left
};

// use event delegation to get which cell was clicked
domCache.gridContainer.onclick = (e) => {
  let gridItem = e.target;
  if (!gridItem) return;
  
  if ( counter.count % 2 == 0 ) {
    if ( gridItem.textContent ) {
      return
    } else {
      gridItem.textContent = playerTwo.marker;
      counter.count++
      console.log(counter.count)
    }
  } else {
    if ( gridItem.textContent ) {
      return
  } else {
      gridItem.textContent = playerOne.marker;
      counter.count++
      console.log(counter.count)
    }
  }

}

const player = ( marker ) => {
  return { 
    marker,
    makeMove() {

    }
  }
}

// clears board and resets turn counter
const restart = () => {
  domCache.gridItem.forEach(( item ) => {
    item.textContent = "";
    counter.count = 1;
  })
}

const playerOne = player("X");
const playerTwo = player("O");

domCache.restartBtn.addEventListener( 'click', restart )