import { useRouter } from "next/router";
import React, { SetStateAction } from "react";
import AuthButton from "./authButtons";
import Input from "./input";
import { Url } from "url";

type FormProps = {
  onSubmit: (e: any) => Promise<void>;
  setEmail: React.Dispatch<SetStateAction<string>>;
  setPassword: React.Dispatch<SetStateAction<string>>;
  error: string;
  emailError: boolean;
  passwordError: boolean;
  route: string;
  text: {
    currentMode: string;
    otherMode: string;
  };
};

const Form: React.FC<FormProps> = ({
  onSubmit,
  setEmail,
  setPassword,
  error,
  emailError,
  passwordError,
  route,
  text,
}) => {
  const router = useRouter();

  return (
    <div className="formContainer">
      <form onSubmit={onSubmit} className="form">
        <Input text="Name" setField={setEmail} />
        {emailError && <div className="text-red-500">Email is invalid</div>}
        <Input text="Password" setField={setPassword} />
        {passwordError && (
          <div className="text-red-500">Password is invalid</div>
        )}
        <div className="authButtonContainer">
          <AuthButton text={text.currentMode} />
          <AuthButton
            onClickFunction={() => router.push(route)}
            text={text.otherMode}
          />
        </div>
        <div className="grid place-items-center">
          {error && (
            <div className="bg-red-500 text-center text-xl font-bold w-28 p-2 rounded-lg">
              {error}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
