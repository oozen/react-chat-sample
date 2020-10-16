import Types from "./action.types";

let nextMessageId = 1;

export const addMessage = (message: string, author: string) => ({
  type: Types.ADD_MESSAGE,
  id: nextMessageId++,
  message,
  author
});

export const updateMessages = (payload: any) => ({
  type: Types.UPDATE_MESSAGES,
  payload
});

export default Types;
