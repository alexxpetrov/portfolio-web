"use client";
import React, { createContext, useState } from "react";
import { authService } from "../services/authService";
import {
  LoginDtoType,
  RegisterDtoType,
  User,
  UserContextType,
} from "../types/User";
import { loginFoo } from "../services/login";

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
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // Stores user info

  const login = async ({ email, password }: LoginDtoType) => {
    const loggedInUser = await loginFoo({ email, password });
    setUser(loggedInUser);

    return loggedInUser;
  };

  const register = async ({
    firstName,
    lastName,
    email,
    password,
  }: RegisterDtoType) => {
    const loggedInUser = await authService.register({
      firstName,
      lastName,
      email,
      password,
    });

    setUser(loggedInUser);

    return loggedInUser;
  };

  const logout = async () => {
    const loggedInUser = await authService.logout();

    setUser(null);

    return loggedInUser;
  };

  return (
    <UserContext.Provider
      value={{
        user: user as User,
        login,
        register,
        logout,
        setUser,
      }}
    >
      {children}
      {/* Render children only after user is loaded */}
    </UserContext.Provider>
  );
};
