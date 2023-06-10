import { useRouter } from "next/router";
import React, { SetStateAction } from "react";
import AuthButton from "./authButtons";
import Input from "./input";

type FormProps = {
  onSubmit: (e: any) => Promise<void>;
  setEmail: React.Dispatch<SetStateAction<string>>;
  setPassword: React.Dispatch<SetStateAction<string>>;
  error: string;
  emailError: boolean;
  passwordError: boolean;
};

const Form: React.FC<FormProps> = ({
  onSubmit,
  setEmail,
  setPassword,
  error,
  emailError,
  passwordError,
}) => {
  const router = useRouter();

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <Input text="Name" setField={setEmail} />
        {emailError && <div className="text-red-500">Email is invalid</div>}
        <Input text="Password" setField={setPassword} />
        {passwordError && (
          <div className="text-red-500">Password is invalid</div>
        )}
        <div className="authButtonContainer">
          <AuthButton text={"Login"} />
          <AuthButton
            // onClickFunction={router.push("/signup")}
            text={"Not a member"}
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
