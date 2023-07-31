const popOverId = "word-popover";

function showPopover(word: string, x: number, y: number) {
  const popover = document.createElement("div");
  popover.id = popOverId;

  popover.style.position = "absolute";
  popover.style.top = y + "px";
  popover.style.left = x + "px";
  popover.style.backgroundColor = "#fff";
  popover.style.padding = "1.5em";
  popover.style.borderRadius = "0.5em";
  popover.style.maxWidth = "14em";
  popover.style.boxShadow = "0 0 20px rgba(0,0,0,0.5);";
  popover.style.border = "1px solid #ccc";

  popover.textContent = "Loading..." + word; // Placeholder text while fetching the meaning.

  document.body.appendChild(popover);

}

function removePopover() {
  const popover = document.getElementById(popOverId);
  if (popover) {
    popover.remove();
  }
}

// Function to handle double-click event and send the selected word to the background script.
const handleDoubleClick = (event: MouseEvent) => {
  const selectedWord = (window as any).getSelection().toString().trim();
  if (selectedWord) {
    const x = event.clientX;
    const y = event.clientY;
    removePopover();
    showPopover(selectedWord, x, y);
    chrome.runtime.sendMessage({ action: "showPopup", word: selectedWord });
  }
};

// Listen for double-click events on the webpage.
document.addEventListener("dblclick", handleDoubleClick);

const handleClick = () => {
  removePopover();
};

document.addEventListener("click", handleClick);
