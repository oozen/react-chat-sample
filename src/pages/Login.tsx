import React, { useState, useEffect } from "react";
import UserAdd from "../components/UserAdd";
import { connect } from "react-redux";
import { addUser, connectToSocket } from "../store/actions/users.actions";
import { validateText } from "../helpers";
import { RouteComponentProps, withRouter } from "react-router-dom";

export interface LoginPageProps extends RouteComponentProps<any> {
  addUser: Function;
  connectToSocket: Function;
  authorized: boolean;
  socket: any;
}

const LoginPage: React.FC<LoginPageProps> = ({ history, addUser, connectToSocket, authorized, socket }) => {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    //if (authorized) history.push("/chat");
    connectToSocket();
  }, [connectToSocket, authorized, history]);

  const handleAddUser = (value: any) => {
    const isValid: boolean = validateText(value);
    if (!isValid) {
      setErrorMessage("You can only use letters, numbers, space and -=., characters");
      return;
    }
    socket.emit("addUser", value);
    addUser(value);
    history.push("/chat");
  };

  return (
    <div className="content">
      <div className="login">
        <h1>WHAZZUP?</h1>
        <UserAdd addUser={handleAddUser} />
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    authorized: state.userReducers.authorized,
    socket: state.userReducers.socket
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addUser: (payload: any) => {
      dispatch(addUser(payload));
    },
    connectToSocket: () => {
      dispatch(connectToSocket());
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
