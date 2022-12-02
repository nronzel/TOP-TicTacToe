const domElementCache = {
  "gridItem": Array.from(document.querySelectorAll("#gridItem")),
  "clearBtn": document.querySelector("button.clear-btn"),
};

// IIFE to listen for clicks to place an X
(() => {
  domElementCache.gridItem.forEach((item) => {
    item.addEventListener("click", () => {
      item.textContent = "X";
    });
  });
})();


const  clear = () => {
  domElementCache.gridItem.forEach((item) => {
    item.textContent = "";
  })
}

domElementCache.clearBtn.addEventListener('click', clear)