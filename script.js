const domElementCache = {
  "gridItem": Array.from(document.querySelectorAll("#gridItem")),
  "restartBtn": document.querySelector("button.restart-btn"),
};

// IIFE to listen for clicks to place an X
(() => {
  domElementCache.gridItem.forEach((item) => {
    item.addEventListener("click", () => {
      item.textContent = "X";
    });
  });
})();

// clears board
const  restart = () => {
  domElementCache.gridItem.forEach((item) => {
    item.textContent = "";
  })
}

domElementCache.restartBtn.addEventListener('click', restart)