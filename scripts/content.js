const popOverId = "word-popover";

function showPopover(word, x, y) {
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

  popover.after.position = "absolute";
  popover.after.height = "0";
  popover.after.width = "0";
  popover.after.margin = "auto";
  //top
  popover.after.left = "0";
  popover.after.right = "0";
  popover.after.bottom = "-0.75em";
  popover.after.borderTop = "0.75em solid #fff";
  popover.after.borderLeft = "1em solid transparent";
  popover.after.borderRight = "1em solid transparent";

  popover.textContent = "Loading..." + word; // Placeholder text while fetching the meaning.

  document.body.appendChild(popover);

  // Fetch the meaning of the word from an API or service.
  // Replace 'https://api.example.com/' with the actual API endpoint.
  // fetch(`https://api.example.com/meaning?word=${word}`)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     const meaning = data.meaning;
  //     popover.textContent = `Word: ${word}\n\nMeaning: ${meaning}`;
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching word meaning:", error);
  //     popover.textContent = "Failed to fetch the meaning.";
  //   });
}

function removePopover() {
  const popover = document.getElementById(popOverId);
  if (popover) {
    popover.remove();
  }
}

// Function to handle double-click event and send the selected word to the background script.
function handleDoubleClick(event) {
  const selectedWord = window.getSelection().toString().trim();
  if (selectedWord) {
    const x = event.clientX;
    const y = event.clientY;
    removePopover();
    showPopover(selectedWord, x, y);
    chrome.runtime.sendMessage({ action: "showPopup", word: selectedWord });
  }
}

// Listen for double-click events on the webpage.
document.addEventListener("dblclick", handleDoubleClick);
