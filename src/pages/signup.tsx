import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import MediaQuery from "react-responsive";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";
import Link from "next/link";
import AuthForm from "../components/authForm";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [signInType, setSignInType] = useState<string>();
  const [signInWithGoogle, userCred, loading, googleError] =
    useSignInWithGoogle(auth);

  // Show consoles error on top of the screen
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Error disappears after 5 secs
  setTimeout(() => {
    setError("");
  }, 5000);

  const router = useRouter();

  // Rules for form validation
  const validationSchema = () => {
    let emailValid = true;
    let passworValid = true;
    let ValidSchema = true;
    setEmailError(false);
    setPasswordError(false);

    if (email === "") {
      emailValid = false;
      ValidSchema = false;
      setEmailError(true);
    }
    if (password.length < 6) {
      passworValid = false;
      ValidSchema = false;
      setPasswordError(true);
    }
    return ValidSchema;
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    let isValid = validationSchema();

    if (signInType == "email and password") {
      if (isValid) {
        try {
          const user = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          console.log(user);
          setUser(JSON.stringify(user));
        } catch {
          setError("Failed to create an account");
        }
        router.push("/login");
      }
    } else {
      try {
        await signInWithGoogle();
      } catch (error: any) {
        console.log("Sign in with google error.", error.message);
      }
    }
  };

  return (
    <div>
      <div className="bg-stone-200 min-h-screen max-h-max">
        <h1 className="text-center p-2 text-3xl bg-amber-700">
          Burger Builder App
        </h1>
        <MediaQuery maxWidth={640}>
          <div className="formContainer">
            <AuthForm
              onSubmit={onSubmit}
              setEmail={setEmail}
              setPassword={setPassword}
              setSignInType={setSignInType}
              error={error}
              passwordError={passwordError}
              emailError={emailError}
              route={"./login"}
              text={{
                currentMode: "Signup",
                otherMode: "Already a member?",
                googleMode: "SignUp with Google",
              }}
              signInType={signInType}
            />
            <div className="flex justify-center">
              <Image
                alt=""
                src={"/cheeseBurger.png"}
                height={300}
                width={300}
              />
            </div>
          </div>
        </MediaQuery>
        <div className="grid place-items-center">
          {error && (
            <div className="bg-red-500 text-center text-xl font-bold w-28 p-2 rounded-lg">
              {error}
            </div>
          )}
        </div>
        <MediaQuery minWidth={641}>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex self-end justify-end">
              <Image
                alt=""
                src={"/cheeseBurger.png"}
                height={300}
                width={300}
              />
            </div>
            <div className="formContainer">
              <AuthForm
                onSubmit={onSubmit}
                setEmail={setEmail}
                setPassword={setPassword}
                setSignInType={setSignInType}
                error={error}
                passwordError={passwordError}
                emailError={emailError}
                route={"./login"}
                text={{
                  currentMode: "Signup",
                  otherMode: "Already a member?",
                  googleMode: "SignUp with Google",
                }}
                signInType={signInType}
              />
            </div>
            <div className="flex self-end justify-start">
              <Image
                alt=""
                src={"/cheeseBurger.png"}
                height={300}
                width={300}
              />
            </div>
          </div>
        </MediaQuery>
      </div>
    </div>
  );
}
