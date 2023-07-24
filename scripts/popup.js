// Function to receive the word from the background script and display it in the popup.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "sendWordToPopup") {
    const selectedWord = message.word;
    const selectedWordElement = document.getElementById("selected-word");
    selectedWordElement.textContent = selectedWord;
  }
});
