import Types from "../actions/action.types";

const initialState = {
  user: "",
  message: {},
  loading: false,
  error: false,
  messageId: 0,
  messages: []
};

export default function messageReducers(state = initialState, action: any) {
  switch (action.type) {
    case Types.ADD_MESSAGE:
      return { ...state, loading: true, error: false };
    case Types.ADD_MESSAGE_SUCCESS:
      const message = {
        id: action.payload.id,
        message: action.payload.message,
        author: action.payload.author
      };
      return { ...state, loading: false, message };
    case Types.UPDATE_MESSAGES:
      return { ...state, loading: true, error: false };
    case Types.UPDATE_MESSAGES_SUCCESS:
      const messages: object[] = state.messages;
      messages.push(action.payload.payload);
      return {
        ...state,
        messages
      };
    default:
      return state;
  }
}
