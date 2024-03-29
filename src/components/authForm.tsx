import { useRouter } from "next/router";
import React, { SetStateAction } from "react";
import AuthButton from "./authButtons";
import Input from "./input";

type FormProps = {
  onSubmit: (e: any) => Promise<void>;
  setEmail: React.Dispatch<SetStateAction<string>>;
  setPassword: React.Dispatch<SetStateAction<string>>;
  setSignInType: React.Dispatch<SetStateAction<string | undefined>>;
  error: string;
  emailError: boolean;
  passwordError: boolean;
  route: string;
  text: {
    currentMode: string;
    otherMode: string;
    googleMode: string;
  };
  // signInType: string | undefined
};

const Form: React.FC<FormProps> = ({
  onSubmit,
  setEmail,
  setPassword,
  setSignInType,
  error,
  emailError,
  passwordError,
  route,
  text,
  // signInType
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
        {router.pathname === "/signup" ? (
          <div className="googleAuthContainer">
            <div>OR</div>
            <AuthButton
              onClickFunction={setSignInType}
              text={text.googleMode}
            />
          </div>
        ) : null}
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
