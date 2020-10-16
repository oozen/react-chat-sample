import React from "react";

import { Route, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import rootSaga from './store/sagas';
import userReducers from "./store/reducers/user.reducers";
import messageReducers from "./store/reducers/message.reducers";
import { composeWithDevTools } from 'redux-devtools-extension';

import "./style.scss";
import LoginPage from "./pages/Login";
import ChatRoomPage from "./pages/ChatRoom";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(combineReducers({ userReducers, messageReducers }), composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Route path="/" exact component={LoginPage} />
        <Route path="/chat" component={ChatRoomPage} />
      </Router>
    </Provider>
  );
}

export default App;
