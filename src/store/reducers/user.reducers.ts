import Types from "../actions/action.types";

const initialState = {
  user: {},
  users: [],
  authorized: false,
  error: false,
  socket: null
};

export default function userReducers(state = initialState, action: any) {
  switch (action.type) {
    case Types.CONNECT_TO_SOCKET:
      return {
        ...state
      };
    case Types.CONNECT_TO_SOCKET_SUCCESS:
      return {
        ...state,
        socket: action.payload
      };
    case Types.ADD_USER:
      return {
        ...state,
        error: false
      };
    case Types.ADD_USER_SUCCESS:
      const user = {
        name: action.payload.username,
        id: action.payload.id
      };
      return {
        ...state,
        error: false,
        authorized: true,
        user
      };
    case Types.UPDATE_USERS:
      return {
        ...state,
        error: false
      };
    case Types.UPDATE_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.payload
      };
    default:
      return state;
  }
}
