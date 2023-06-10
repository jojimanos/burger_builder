import React from "react";

type AuthButtonProps = {
  text: string;
  onClickFunction?: any;
};

const AuthButton: React.FC<AuthButtonProps> = ({ text, onClickFunction }) => {
  return (
    <button onClick={onClickFunction} className="authButton">
      {text}
    </button>
  );
};

export default AuthButton;
