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

// Create the user context
export const UserContext = createContext<UserContextType>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: async (_: LoginDtoType) => {
    return {} as User;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register: async (_: RegisterDtoType) => {
    return Promise.resolve({} as User);
  },
  logout: () => {},
  setUser: () => {},
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

  const handleLogin = async ({ email, password }: LoginDtoType) => {
    let loggedInUser;
    if (IS_DEVELOPMENT) {
      loggedInUser = await serverLogin({ email, password } as RegisterDtoType);
    } else {
      loggedInUser = await authService.login({ email, password });
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
    try {
      let loggedInUser;
      if (IS_DEVELOPMENT) {
        loggedInUser = await serverRegister({
          firstName,
          lastName,
          email,
          password,
        });
      } else {
        loggedInUser = await authService.register({
          firstName,
          lastName,
          email,
          password,
        });
      }

      setUser(loggedInUser);
      push("/dashboard");

      return loggedInUser;
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to register. User already exists",
        icon: "cross",
      });
    }
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
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
