"use server";

import { cookies } from "next/headers";

const ACCESS_TOKEN_EXPIRATION = 24 * 7;

const currentTime = new Date(); // Get the current date and time
currentTime.setHours(currentTime.getHours() + ACCESS_TOKEN_EXPIRATION); // Add 50 hours

export const setAccessTokenCookie = async (token: string) => {
  cookies().set("access_token", token, {
    name: "access_token",
    value: token,
    expires: currentTime,
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
};

export const deleteAccessTokenCookie = async () => {
  cookies().delete("access_token");
};
