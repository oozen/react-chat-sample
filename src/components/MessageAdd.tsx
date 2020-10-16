import React, { useState } from "react";

export interface MessageAddProps {
  addMessage: Function;
}

const MessageAdd: React.FC<MessageAddProps> = ({ addMessage }) => {

  const [message, setMessage] = useState("");

  const onChange = (target: any) => {
    setMessage(target.value);
  };
  
  const onSubmit = () => {
    addMessage(message);
    setMessage("");
  };

  return (
    <div className="message-box">
      <form
        action="."
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
       <div className="message-text"> <input type="text" placeholder={"Enter message..."} value={message} onChange={(e) => onChange(e.target)} /></div>
       <div className="send-button"> <input type="submit" value={"Send"} /></div>
      </form>
    </div>
  );
};

export default MessageAdd;
