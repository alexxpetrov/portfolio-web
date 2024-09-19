"use server";

import axios from "axios";
import { ENDPOINT } from "../utils/config";
import { LoginDtoType, User } from "../types/User";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const loginFoo = async ({
  email,
  password,
}: LoginDtoType): Promise<User> => {
  const { data } = await axios.post(
    `${ENDPOINT}/api/login`,
    {
      email,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  console.log(data);
  cookies().set("access_token", data.access_token, {
    name: "access_token",
    value: data.access_token,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  cookies().set("refresh_jti", data.access_token, {
    name: "refresh_jti",
    value: data.access_token,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  return {
    ...(jwtDecode(data.access_token) as User),
    accessToken: data.access_token,
  };
};
