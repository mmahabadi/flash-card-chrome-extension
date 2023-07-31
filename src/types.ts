export enum Action {
  SEND_WORD_TO_SERVER = "SEND_WORD_TO_SERVER",
  SEND_WORD_TO_POPUP = "sendWordToPopup",
  SHOW_POPUP = "showPopup",
}
export type Message = {
  action: Action;
  payload: string;
};
