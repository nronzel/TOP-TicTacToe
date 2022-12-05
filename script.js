const domCache = {
  gridContainer: document.querySelector(".grid-container"),
  gridItem: Array.from(document.querySelectorAll(".gridItem")),
  restartBtn: document.querySelector("button.restart-btn"),
  winnerText: document.querySelector(".winner"),
};

// turn counter
const counter = {
  count: 1, // if count == 10, no more turns left
};

// winning positions
const winArray = [
  ['1,1', '1,2', '1,3'], // row 1
  ['2,1', '2,2', '2,3'], // row 2
  ['3,1', '3,2', '3,3'], // row 3
  ['1,1', '2,1', '3,1'], // col 1
  ['1,2', '2,2', '3,2'], // col 2
  ['1,3', '2,3', '3,3'], // col 3
  ['1,1', '2,2', '3,3'], // across l->r
  ['1,3', '2,2', '3,1'], // across r->l
];

// use event delegation to get the cell that was clicked within the gridContainer
domCache.gridContainer.onclick = (e) => {
  let gridItem = e.target
  if (!gridItem) return
  // checks if cell is already chosen, and determines turn
  if (gridItem.textContent) return;
  // Player1 = Odd, Player2 = Even
  if (counter.count % 2 == 0) {
    gridItem.textContent = playerTwo.marker
    playerTwo.choices.push(gridItem.id)
    counter.count++
  } else {
    gridItem.textContent = playerOne.marker
    playerOne.choices.push(gridItem.id)
    counter.count++
  }
  checkForWin()
};

// cycles through the subarrays in winArray and checks if either players' 
// choices array contains the proper choices needed for a win
const checkForWin = () => {
  winArray.forEach((arr) => {
    let win = false
    if (arr.every(elem => playerOne.choices.includes(elem))) {
      domCache.winnerText.textContent = "Player One Wins!"
      domCache.gridContainer.onclick = null
      win = true
    } else if (arr.every(elem => playerTwo.choices.includes(elem))){
      domCache.winnerText.textContent = "Player Two Wins!"
      domCache.gridContainer.onclick = null
      win = true
    } else if (counter.count == 10 && win == false) {
      domCache.winnerText.textContent = "Draw"
    }
  })
}

const player = (marker) => {
  let choices = []
  return {
    marker,
    choices,
  }
}

// clears board and resets turn counter
const restart = () => {
  domCache.gridItem.forEach((item) => {
    item.textContent = ""
  })
  counter.count = 1;
  playerOne.choices = []
  playerTwo.choices = []
  domCache.winnerText.textContent = "Tic-Tac-Toe";
}

const playerOne = player("X")
const playerTwo = player("O")

domCache.restartBtn.onclick = restart
console.log(domCache.gridContainer)