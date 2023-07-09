import React, { SetStateAction } from "react";

type InputProps = {
  text: string;
  setField: React.Dispatch<SetStateAction<string>>;
};

const Input: React.FC<InputProps> = ({ text, setField }) => {
  return (
    <div className="inputContainer">
      <label className="inputText">{text}</label>
      <input
        className="input"
        type={text}
        onChange={(e) => setField(e.target.value)}
      />
    </div>
  );
};

export default Input;
