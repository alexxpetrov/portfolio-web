"use client";
import React, { createContext, useEffect, useState } from "react";
import {
  LoginDtoType,
  RegisterDtoType,
  User,
  UserContextType,
} from "../types/User";
import { jwtDecode } from "jwt-decode";
import { authService } from "../services/authService";
import {
  serverLogin,
  serverLogout,
  serverRegister,
} from "../services/serverAction";
import { IS_DEVELOPMENT } from "../utils/config";
import { useRouter } from "next/navigation";
import { notification } from "antd";
import { useAuthService } from "../services/useAuthService";

// Create the user context
export const UserContext = createContext<UserContextType>({
  user: null,
  login: async () => ({} as User),
  register: () => Promise.resolve({} as User),
  logout: () => {},
  setUser: () => {},
  handleWebAuthRegister: () => Promise.resolve({} as User),
});

// Provider component
export const UserProvider = ({
  accessToken,
  children,
}: {
  accessToken: string;
  children: React.ReactNode;
}) => {
  const { push } = useRouter();
  const [user, setUser] = useState<User | null>(
    accessToken ? jwtDecode(accessToken) : null
  ); // Stores user info
  const client = useAuthService();

  const handleWebAuthRegister = async () => {
    const loggedInUser = await client.webAuthRegister();

    setUser(loggedInUser);
    push("/dashboard");

    return loggedInUser;
  };

  const handleLogin = async ({ email, password }: LoginDtoType) => {
    let loggedInUser;
    if (IS_DEVELOPMENT) {
      loggedInUser = await serverLogin({ email, password } as RegisterDtoType);
    } else {
      loggedInUser = await client.login({ email, password });
    }

    setUser(loggedInUser);
    push("/dashboard");

    return loggedInUser;
  };

  const handleRegister = async ({
    firstName,
    lastName,
    email,
    password,
  }: RegisterDtoType) => {
    let response;
    if (IS_DEVELOPMENT) {
      response = await serverRegister({
        firstName,
        lastName,
        email,
        password,
      });
    } else {
      response = await client.register({
        firstName,
        lastName,
        email,
        password,
      });
    }
    // if (response.error) {
    //   notification.error({
    //     message: "Error",
    //     description: response.error,
    //     icon: "cross",
    //   });
    //   throw new Error(response.error);
    // }

    setUser(response);
    push("/dashboard");

    return response;
  };

  const handleLogout = async () => {
    if (IS_DEVELOPMENT) {
      await serverLogout({
        id: user!.id,
      } as RegisterDtoType);
    } else {
      await authService.logout({ id: user!.id });
    }

    setUser(null);
    push("/");
  };

  useEffect(() => {
    if (accessToken) {
      setUser({ ...jwtDecode(accessToken ?? ""), accessToken } as User);
    }
  }, [accessToken]);

  return (
    <UserContext.Provider
      value={{
        user: user as User,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        handleWebAuthRegister,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
