"use client";
import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { LoginModal } from "../LoginModal/LoginModal";

const Login = () => {
  const { user, logout } = useContext(UserContext);
  const [opened, setOpened] = useState(false);

  return (
    <>
      {user ? (
        <div>
          <button
            className="bg-zinc-600 hover:bg-zinc-700 text-white font-semibold py-2 px-4 rounded-md focus:ring-2 focus:ring-zinc-300"
            onClick={logout}
          >
            Log out
          </button>
        </div>
      ) : (
        <button
          className="bg-zinc-600 hover:bg-zinc-700 text-white font-semibold py-2 px-4 rounded-md focus:ring-2 focus:ring-zinc-300"
          onClick={() => setOpened(true)}
        >
          Log in
        </button>
      )}
      {opened && <LoginModal />}
    </>
  );
};

export default Login;
