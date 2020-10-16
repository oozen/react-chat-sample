import React from "react";

export interface MessageListProps {
  messages: [];
  user: { id: string };
}

const MessageList: React.FC<MessageListProps> = ({ messages, user }) => {
  let owner = "";
  return (
    <div className="message-list">
      {messages.map((item: { id: number; date: string; text: string; user: { id: string, name: string } }) => {
        if (user.id === item.user.id) owner = "owner"; else owner = "";
        return (
          <div className={`message ${owner}`} key={item.id}>
            { owner.length === 0 && <div><strong>{item.user.name}</strong></div>}
            {item.text}
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
