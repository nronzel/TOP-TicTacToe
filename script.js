const domCache = {
  gridContainer: document.querySelector(".grid-container"),
  gridItem: Array.from(document.querySelectorAll(".gridItem")),
  restartBtn: document.querySelector("button.restart-btn"),
  winnerText: document.querySelector(".winner"),
  turn: document.querySelector(".turn"),
};

const player = (marker) => {
  let choices = [];
  return {
    marker,
    choices,
  };
};

const Game = (() => {
  // move counter | count=10 means no more moves
  let count = 1;

  // create the players
  const playerOne = player("X");
  const playerTwo = player("O");

  // all winning combos
  const winArray = [
    ["1,1", "1,2", "1,3"], // row 1
    ["2,1", "2,2", "2,3"], // row 2
    ["3,1", "3,2", "3,3"], // row 3
    ["1,1", "2,1", "3,1"], // col 1
    ["1,2", "2,2", "3,2"], // col 2
    ["1,3", "2,3", "3,3"], // col 3
    ["1,1", "2,2", "3,3"], // across l->r
    ["1,3", "2,2", "3,1"], // across r->l
  ];

  // compares each players "choices" array against the winArray
  // to see if it contains all of the moves needed for a win
  const checkForWin = () => {
    winArray.forEach((winCombo) => {
      let win = false;
      if (winCombo.every((elem) => playerOne.choices.includes(elem))) {
        domCache.winnerText.textContent = `Player One Wins!`;
        domCache.gridContainer.onclick = null;
        domCache.turn.textContent = "Play Again?";
        win = true;
      } else if (winCombo.every((elem) => playerTwo.choices.includes(elem))) {
        domCache.winnerText.textContent = `Player Two Wins!`;
        domCache.gridContainer.onclick = null;
        domCache.turn.textContent = "Play Again?";
        win = true;
      } else if (win == false && count == 10) {
        domCache.winnerText.textContent = "Draw";
        domCache.turn.textContent = "Play Again?";
      }
    });
  };

  // main gameplay loop
  const playGame = () => {
    domCache.gridContainer.onclick = (e) => {
      let gridItem = e.target;
      if (!gridItem) return;
      // checks if cell is already chosen, and determines turn
      if (gridItem.textContent) return;
      // Player1 = Odd, Player2 = Even
      if (count % 2 == 0) {
        gridItem.textContent = playerTwo.marker;
        playerTwo.choices.push(gridItem.id);
        count++;
        domCache.turn.textContent = "Player One to move..";
      } else {
        gridItem.textContent = playerOne.marker;
        playerOne.choices.push(gridItem.id);
        count++;
        domCache.turn.textContent = "Player Two to move..";
      }
      checkForWin();
    };
    domCache.restartBtn.onclick = restart;
  };

  // resets the board and game variables to prepare for new game
  const restart = () => {
    domCache.gridItem.forEach((item) => {
      item.textContent = "";
    });
    count = 1;
    playerOne.choices = [];
    playerTwo.choices = [];
    domCache.winnerText.textContent = "Tic-Tac-Toe";
    domCache.turn.textContent = "Player One to move..";
    playGame();
  };

  return {
    playGame,
  };
})();

Game.playGame();
