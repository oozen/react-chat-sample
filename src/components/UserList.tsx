import React from "react";

export interface UserListProps {
  users: [];
  user: {
    id: string;
    name: string;
  };
}

const UserList: React.FC<UserListProps> = ({ users, user }) => {

  const participants = users.filter((item: { id: string }) => item.id !== user.id);
  
  return (
    <div className="user-list">
      {participants.map((item: { id: string, name: string }) => {
        return item !== user && <span key={item.id}>{item.name},</span>;
      })}
      <span>You</span>
    </div>
  );
};

export default UserList;
