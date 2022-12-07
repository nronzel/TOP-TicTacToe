const domCache = {
  gridContainer: document.querySelector(".grid-container"),
  gridItem: Array.from(document.querySelectorAll(".gridItem")),
  restartBtn: document.getElementById("restartBtn"),
  winnerText: document.querySelector(".winner"),
  turn: document.querySelector(".turn"),
  settingsBtn: document.getElementById("settingsBtn"),
  playerOneName: document.getElementById("playerOneName"),
  playerTwoName: document.getElementById("playerTwoName"),
};

const Player = (name, marker) => {
  let choices = [];
  return {
    name,
    marker,
    choices,
  }
}

const Modal = (() => {
  const modalContainer = document.querySelector(".modal")
  const overlay = document.querySelector(".overlay")
  const okayBtn = document.querySelector(".okay-btn")
  const clearBtn = document.querySelector(".clear-btn")

  const openModal = () => {
    modalContainer.style.display = "block"
    overlay.style.display = "block"
  }

  const closeModal = () => {
    modalContainer.style.display = "none"
    overlay.style.display = "none"
  }

  const clearNames = () => {
    domCache.playerOneName.value = ""
    domCache.playerTwoName.value = ""
  }

  const modalLoop = () => {
    openModal();
    overlay.onclick = closeModal
    clearBtn.onclick = clearNames
    okayBtn.onclick = () => {
      Game.playGame()
      closeModal()
    }
  }

  return {
    modalLoop,
  }
})()


const Game = (() => {
  // move counter | count=10 means no more moves
  let count = 1;

  // create players
  let playerOne = Player(domCache.playerOneName.value, "X")
  let playerTwo = Player(domCache.playerTwoName.value, "O")

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

  // game board
  // const gameBoard = [
  //   ["1,1", "1,2", "1,3"],
  //   ["2,1", "2,2", "2,3"],
  //   ["3,1", "3,2", "3,3"],
  // ]

  // compares each players "choices" array against the winArray
  // to see if it contains all of the moves needed for a win
  const checkForWin = () => {
    winArray.forEach((winCombo) => {
      let win = false;
      if (winCombo.every((elem) => playerOne.choices.includes(elem))) {
        domCache.winnerText.textContent = `${playerOne.name} Wins!`;
        domCache.gridContainer.onclick = null;
        domCache.turn.textContent = "Play Again?";
        win = true;
      } else if (winCombo.every((elem) => playerTwo.choices.includes(elem))) {
        domCache.winnerText.textContent = `${playerTwo.name} Wins!`;
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
    domCache.turn.textContent = `${playerOne.name} to move..`;
    domCache.gridContainer.onclick = (e) => {
      console.log(domCache.playerOneName.value)
      let gridItem = e.target;
      if (!gridItem) return;
      // checks if cell is already chosen, and determines turn
      if (gridItem.textContent) return;
      // Player1 = Odd, Player2 = Even
      if (count % 2 == 0) {
        gridItem.textContent = playerTwo.marker;
        playerTwo.choices.push(gridItem.id);
        count++;
        domCache.turn.textContent = `${playerOne.name} to move..`;
      } else {
        gridItem.textContent = playerOne.marker;
        playerOne.choices.push(gridItem.id);
        count++;
        domCache.turn.textContent = `${playerTwo.name} to move..`;
      }
      checkForWin();
    };
    domCache.restartBtn.onclick = restart;
    domCache.settingsBtn.onclick = Modal.modalLoop
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
    playGame()
  };

  return {
    playGame,
  };
})();

Modal.modalLoop()