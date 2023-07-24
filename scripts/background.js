// Listener for incoming messages from the content script.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "showPopup") {
    const word = message.word;
    // Pass the selected word to the popup.
    chrome.action.setPopup({ tabId: sender.tab.id, popup: "../popup.html" });

    // Send the word to the popup.
    chrome.runtime.sendMessage({ action: "sendWordToPopup", word: word });
  }
});
