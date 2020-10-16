import Types from "./action.types";

export const addUser = (username: any) => ({
  type: Types.ADD_USER,
  username,
});

export const updateUsers = (payload: any) => ({
  type: Types.UPDATE_USERS,
  payload
});

export const connectToSocket = () => ({
  type: Types.CONNECT_TO_SOCKET
});

export default Types;
