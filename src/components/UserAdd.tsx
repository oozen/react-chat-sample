import React from "react";

export interface UserAddProps {
  addUser: Function;
}

const UserAdd: React.FC<UserAddProps> = ({addUser }) => {

  const onEnter = (target: any) => {
    const { value } = target;
    addUser(value);
  };

  return (
    <div>
      <h3>Please type your name and then hit "ENTER"</h3>
      <input
        className="text-center"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onEnter(e.target);
          }
        }}
      />
    </div>
  );
};

export default UserAdd;
