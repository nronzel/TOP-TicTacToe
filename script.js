const domCache = {
  gridContainer: document.querySelector(".grid-container"),
  gridItem: Array.from(document.querySelectorAll(".gridItem")),
  restartBtn: document.getElementById("restart-btn"),
  winnerText: document.querySelector(".winner"),
  turn: document.querySelector(".turn"),
  settingsBtn: document.getElementById("settingsBtn")
};

const player = (marker) => {
  let choices = [];
  let name = ""
  return {
    name,
    marker,
    choices,
  };
};

const Modal = (() => {
  const modalContainer = document.querySelector(".modal")
  const vsPlayerSelect = document.querySelector("#vsPlayer")
  const vsCpuSelect = document.querySelector("#vsCPU")
  const overlay = document.querySelector(".overlay")
  const playerSettings = document.querySelector(".player-settings")
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

  const openPlayerSettings = () => {
    playerSettings.classList.remove("hidden")
  }

  const closePlayerSettings = () => {
    playerSettings.classList.add("hidden")
  };

  const getNames = (() => {
    const playerOneName = document.getElementById("playerOneName")
    const playerTwoName = document.getElementById("playerTwoName")

    return {
      playerOneName,
      playerTwoName,
    }
  })();

  const clearNames = () => {
    getNames.playerOneName.textContent = ""
    getNames.playerOneName.value = ""
    getNames.playerTwoName.textContent = ""
    getNames.playerTwoName.value = ""
    console.log(getNames.playerOneName)
    console.log(getNames.playerTwoName)
  }

  const modalLoop = () => {
    openModal();
    vsPlayerSelect.onclick = openPlayerSettings
    vsCpuSelect.onclick =  closePlayerSettings
    overlay.onclick = closeModal
    let names = getNames
    okayBtn.onclick = names
    clearBtn.onclick = clearNames
    console.log(names)
  }

  return {
    modalLoop,
    getNames,
  }
})()


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
    domCache.turn.textContent = "Player One to move..";
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
    playGame();
  };

  return {
    playGame,
  };
})();

Modal.modalLoop();
Game.playGame();
