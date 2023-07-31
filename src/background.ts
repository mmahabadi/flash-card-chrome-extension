import { Action, Message } from "./types";

// Listener for incoming messages from the content script.
chrome.runtime.onMessage.addListener(
  (message: Message, sender: any, sendResponse: unknown) => {
    if (message.action === Action.SHOW_POPUP) {
      const word = message.payload;
      // Pass the selected word to the popup.
      chrome.action.setPopup({ tabId: sender.tab.id, popup: "../popup.html" });

      // Send the word to the popup.
      chrome.runtime.sendMessage({
        action: Action.SEND_WORD_TO_POPUP,
        word: word,
      });
    }
  }
);
