import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { updateUsers } from "../store/actions/users.actions";
import { addMessage, updateMessages } from "../store/actions/message.actions";
import { validateText, generateRandomId } from "../helpers";
import UserList from "../components/UserList";
import MessageAdd from "../components/MessageAdd";
import MessageList from "../components/MessageList";

export interface UserAddProps extends RouteComponentProps<any> {
  users: [];
  messages: [];
  user: {
    id: string;
    name: string;
  };
  authorized: boolean;
  socket: any;
  updateUsers: Function;
  addMessage: Function;
  updateMessages: Function;
}

const ChatRoomPage: React.FC<UserAddProps> = ({ history, user, users, messages, authorized, socket, updateUsers, addMessage, updateMessages }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    if (!socket || socket === null || !authorized) {
      history.push("/");
      return;
    }
  }, [history, authorized, socket, updateUsers]);

  useEffect(() => {
    socket.on("users", (resp: any) => {
      updateUsers(resp);
    });
  }, [socket, updateUsers]);

  useEffect(() => {
    socket.on("message", (resp: any) => {
      updateMessages(resp);
      setUpdate(resp.id);
      setErrorMessage("");
    });
  }, [socket, updateMessages]);


  const handleSendMessage = (message: string) => {
    setErrorMessage("");
    const isValid: boolean = validateText(message);
    if (!isValid) {
      setErrorMessage("You can only use letters, numbers, space and -=., characters");
      return;
    }
    const id = generateRandomId(1000000);
    socket.emit("addMessage", { id, message });
    addMessage(message);
  };

  return (
    <div className="content">
      <div className="chat">
        <UserList users={users} user={user} />
        <MessageList user={user} messages={messages} />
        <MessageAdd addMessage={handleSendMessage} />
        {errorMessage && <div className="error fixed">{errorMessage}</div>}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.userReducers.user,
    users: state.userReducers.users,
    authorized: state.userReducers.authorized,
    socket: state.userReducers.socket,
    messages: state.messageReducers.messages
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateUsers: (payload: any) => {
      dispatch(updateUsers(payload));
    },
    addMessage: (message: string, author: string) => {
      dispatch(addMessage(message, author));
    },
    updateMessages: (payload: any) => {
      dispatch(updateMessages(payload));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatRoomPage));
