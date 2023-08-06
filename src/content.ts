import { Action, ResponseError, Word, Phonetic } from "./types";

const popOverId = "word-popover";
const containerWidth = 300;

async function showPopover(word: string, x: number, y: number) {
  const popover = document.createElement("div");
  popover.id = popOverId;
  popover.setAttribute("data-position", "bottom");

  popover.style.position = "absolute";
  popover.style.top = y + "px";
  popover.style.left = x + "px";
  popover.textContent = "Loading...";

  document.body.appendChild(popover);

  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  const data: Word[] | ResponseError = await response.json();
  console.log(data);
  if (data.constructor !== Array) {
    popover.innerHTML = "No meaning found.";
    return;
  }
  const words = mapData(data);
  popover.innerHTML = displayMeaning(words);
}

const mapData = (data: any): Word[] => {
  if (!data) {
    return [];
  }
  return data.map((items: any) => {
    const meanings = items.meanings?.map((meaning: any) => {
      const definitions =
        meaning.definitions?.map((definition: any) => {
          return {
            definition: definition?.definition,
            example: definition?.example,
            synonyms: definition?.synonyms,
            antonyms: definition?.antonyms,
          };
        }) || [];

      return {
        partOfSpeech: meaning?.partOfSpeech,
        definitions,
      };
    });

    return {
      word: items?.word,
      phonetic: items?.phonetic,
      meanings,
    };
  });
};

const displayMeaning = (data: Word[]) => {
  if (data.length === 0) {
    return "No meaning found.";
  }
  const firstWord = (data as Word[])[0];

  const meaning = firstWord.meanings[0]?.definitions[0]?.definition;
  const partOfSpeech = firstWord.meanings[0]?.partOfSpeech;
  const example = firstWord.meanings[0]?.definitions[0]?.example;

  const html = `
    <div class="fce-main-container">
      <div class="fce-word-container">
        <h3>${firstWord.word} </h3> <b>${partOfSpeech}</b>
        <i>${firstWord.phonetic}</i>
      </div>
      <div id="fce-meanings">
          ${meaning} <br />
          ${example ? `Example: ${example}` : ""}
      </div>
    </div>`;
  return html;
};

function removePopover() {
  const popover = document.getElementById(popOverId);
  if (popover) {
    popover.remove();
  }
}

const handleDoubleClick = (event: MouseEvent) => {
  const selectedWord = (window as any).getSelection().toString().trim();
  if (selectedWord) {
    console.log(event);
    const x = event.clientX - containerWidth / 2;
    const y = event.clientY + containerWidth / 2;
    removePopover();
    showPopover(selectedWord, x, y);
    chrome.runtime.sendMessage({ action: "showPopup", word: selectedWord });
  }
};

document.addEventListener("dblclick", handleDoubleClick);

const handleClick = () => {
  removePopover();
};

document.addEventListener("click", handleClick);

(() => {
  const styles = `
  <style>
    #${popOverId} {
      position: absolute;
      color: #333;
      top: 0;
      left: 0;
      width: ${containerWidth}px;
      max-width: ${containerWidth}px;
      padding: 1.5em;
      border-radius: 0.5em;
      background-color: #fff;
      box-shadow: 0 0 20px rgba(0,0,0,0.5);
      border: 1px solid #ccc;
    }
      
    #${popOverId}[data-position]::after {
      content: "";
      position: absolute;
      height: 0;
      width: 0;
      margin: auto;
    }
      
    #${popOverId}[data-position="top"]::after {
      left: 0;
      right: 0;
      bottom: -0.75em;
      border-top: 0.75em solid #fff;
      border-left: 1em solid transparent;
      border-right: 1em solid transparent;
    }
      
    #${popOverId}[data-position="right"]::after {
      top: 0;
      left: -0.75em;
      bottom: 0;
      border-top: 1em solid transparent;
      border-right: 0.75em solid #fff;
      border-bottom: 1em solid transparent;
    }
      
    #${popOverId}[data-position="bottom"]::after {
      top: -0.75em;
      left: 0;
      right: 0;
      border-left: 1em solid transparent;
      border-right: 1em solid transparent;
      border-bottom: 0.75em solid #fff;
    }
      
    #${popOverId}[data-position="left"]::after {
      top: 0;
      right: -0.75em;
      bottom: 0;
      border-top: 1em solid transparent;
      border-left: 0.75em solid #fff;
      border-bottom: 1em solid transparent;
    }
  </style>`;

  document.head.insertAdjacentHTML("beforeend", styles);
})();
