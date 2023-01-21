"use client";

import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import { useContext, useState } from "react";
import { MyContext } from "./context-provider";
import { useRouter } from "next/navigation";

export default function Home() {
  const { darkMode, auth } = useContext(MyContext);
  const router = useRouter();

  const provider = {
    google: new GoogleAuthProvider(),
    github: new GithubAuthProvider(),
  };
  console.log(auth);

  const [userCredential, setUserCredential] = useState({
    email: "",
    password: "",
  });
  const [userCredentialLogin, setUserCredentialLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserCredential({
      ...userCredential,
      [e.target.type]: e.target.value,
    });
  };

  const handleChangeLogin = (e) => {
    setUserCredentialLogin({
      ...userCredentialLogin,
      [e.target.type]: e.target.value,
    });
  };

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        userCredential.email,
        userCredential.password
      );
      console.log(res);
      alert("User created succesfully :D");
      setUserCredential({ email: "", password: "" });
    } catch (error) {
      throw new Error("Error: ", error);
    }
  };

  const loginUserWithEmailAndPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        userCredentialLogin.email,
        userCredentialLogin.password
      );
      alert("User loged in succesfully ;)");
      router.push(`/user/${res.user.accessToken}`);
      setUserCredentialLogin({
        email: "",
        password: "",
      });
    } catch (error) {
      throw new Error("Error: ", error);
    }
  };

  const loginGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider.google);
      alert("User loged in succesfully ;)");
      console.log(res);
      router.push(`/user/${res.user.accessToken}`);
    } catch (error) {
      throw new Error("Error: ", error);
    }
  };

  const loginGithub = async () => {
    try {
      const res = await signInWithPopup(auth, provider.github);
      alert("User loged in succesfully ;)");
      router.push(`/user/${res.user.accessToken}`);
    } catch (error) {
      throw new Error("Error: ", error);
    }
  };

  return (
    <main className={`${darkMode && "dark"} h-full`}>
      <div className="dark:bg-gray-800 dark:text-slate-200 text-center h-full flex flex-col justify-center">
        <h1 className="text-3xl py-8">WELCOME</h1>
        <div className="flex flex-col items-center gap-10">
          <form
            onSubmit={createUser}
            className="flex flex-col w-64 items-center justify-center gap-4 bg-slate-300 dark:bg-gray-700 rounded-lg p-4"
          >
            <p>Create user here 👇</p>
            <input
              type="email"
              placeholder="email"
              value={userCredential.email}
              onChange={handleChange}
              className="text-gray-800"
            />
            <input
              type="password"
              placeholder="password"
              value={userCredential.password}
              onChange={handleChange}
              className="text-gray-800"
            />
            <button className="rounded-full px-3 py-1 bg-lime-300 text-gray-700">
              Sign Up
            </button>
          </form>
          <div className="flex flex-col w-64 items-center justify-center gap-4 bg-slate-300 dark:bg-gray-700 rounded-lg p-4">
            <p>Login here 👇</p>
            <form
              onSubmit={loginUserWithEmailAndPassword}
              className="flex flex-col items-center justify-center gap-4"
            >
              <input
                type="email"
                placeholder="email"
                value={userCredentialLogin.email}
                onChange={handleChangeLogin}
                className="text-gray-800"
              />
              <input
                type="password"
                placeholder="password"
                value={userCredentialLogin.password}
                onChange={handleChangeLogin}
                className="text-gray-800"
              />
              <button className="rounded-full px-3 py-1 bg-lime-300 text-gray-700">
                Email & Password
              </button>
            </form>
            <button
              onClick={loginGoogle}
              className="rounded-full px-3 py-1 bg-lime-300 text-gray-700"
            >
              Google
            </button>
            <button
              onClick={loginGithub}
              className="rounded-full px-3 py-1 bg-lime-300 text-gray-700"
            >
              Github
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
