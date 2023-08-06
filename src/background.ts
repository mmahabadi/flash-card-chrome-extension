import { Action, Message } from "./types";

// Listener for incoming messages from the content script.
chrome.runtime.onMessage.addListener(
  async (message: Message, sender: any, sendResponse: unknown) => {
    const word = message.payload;
    if (message.action === Action.SHOW_POPUP) {
    } else if (message.action == Action.GET_MEANING) {
      const response = await fetch(
        "https://api.dictionaryapi.dev/api/v2/entries/en/"
      );
      const data = await response.json();

      // Pass the selected word to the popup.
      chrome.action.setPopup({ tabId: sender.tab.id, popup: "popup.html" });

      // Send the word to the popup.
      chrome.runtime.sendMessage({
        action: Action.SEND_WORD_TO_POPUP,
        word: word,
      });
    }
  }
);
