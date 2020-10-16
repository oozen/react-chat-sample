import { put, takeLatest, select } from "redux-saga/effects";
import io from "socket.io-client";
import Types from "../actions/action.types";

function* connectToSocket() {
  const socket = io("localhost:4001", {
    transports: ["websocket", "polling"]
  });
  yield put({ type: Types.CONNECT_TO_SOCKET_SUCCESS, payload: socket });
}

function* addUser(data: any) {
  const getUserStore = (state: any) => state.userReducers;
  const {
    socket: { id }
  } = yield select(getUserStore);
  const user = { username: data.username, id };
  yield put({ type: Types.ADD_USER_SUCCESS, payload: user });
}

function* updateUsers(payload: any) {
  yield put({ type: Types.UPDATE_USERS_SUCCESS, payload });
}

function* addMessage(payload: any) {
  yield put({ type: Types.ADD_MESSAGE_SUCCESS, payload });
}

function* updateMessages(payload: any) {
  yield put({ type: Types.UPDATE_MESSAGES_SUCCESS, payload });
}

export default function* rootSaga() {
  yield takeLatest(Types.CONNECT_TO_SOCKET, connectToSocket);
  yield takeLatest(Types.ADD_USER, addUser);
  yield takeLatest(Types.UPDATE_USERS, updateUsers);
  yield takeLatest(Types.ADD_MESSAGE, addMessage);
  yield takeLatest(Types.UPDATE_MESSAGES, updateMessages);
}
