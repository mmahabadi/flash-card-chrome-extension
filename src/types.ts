export enum Action {
  SEND_WORD_TO_SERVER = "SEND_WORD_TO_SERVER",
  SEND_WORD_TO_POPUP = "sendWordToPopup",
  SHOW_POPUP = "showPopup",
  GET_MEANING = "getMeaning",
}
export type Message = {
  action: Action;
  payload: string;
};

export type Definition = {
  definition: string;
  example: string;
  synonyms?: string[];
  antonyms?: string[];
};

export type Phonetic = {
  text: string;
  audio: string;
};

export type Meaning = {
  partOfSpeech: string;
  definitions: Definition[];
};

export type Word = {
  word: string;
  phonetic: string;
  audioEn?: Phonetic;
  audioUs?: Phonetic;
  audio?: Phonetic;
  phonetics: Phonetic[];
  meanings: Meaning[];
  synonyms?: string[];
  antonyms?: string[];
};

export type ResponseError = {
  message: string;
  resolution: string;
  title: string;
};
