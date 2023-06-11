import React from "react";

type ButtonProps = {
  text: string;
  onClickFunction: any;
};

const Button: React.FC<ButtonProps> = ({ text, onClickFunction }) => {
  return (
    <button onClick={onClickFunction} className="button">
      {text}
    </button>
  );
};

export default Button;
