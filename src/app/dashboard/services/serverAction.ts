"use server";
import { jwtDecode } from "jwt-decode";
import { RegisterDtoType, User } from "../types/User";
import { ENDPOINT, IS_DEVELOPMENT } from "../utils/config";
import axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { deleteAccessTokenCookie, setAccessTokenCookie } from "../utils/cookie";

export const serverLogin = async (dto: RegisterDtoType): Promise<User> => {
  const { data } = await axios.post(`${ENDPOINT}/api/login`, dto, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  if (!data.access_token) {
    return {} as User;
  }

  if (IS_DEVELOPMENT) {
    setAccessTokenCookie(data.access_token);
  }

  return {
    ...(jwtDecode(data.access_token) as User),
    accessToken: data.access_token,
  };
};
export const serverRegister = async (dto: RegisterDtoType): Promise<User> => {
  const { data } = await axios.post(`${ENDPOINT}/api/register`, dto, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  if (!data.access_token) {
    return {} as User;
  }

  if (IS_DEVELOPMENT) {
    setAccessTokenCookie(data.access_token);
  }

  return {
    ...(jwtDecode(data.access_token) as User),
    accessToken: data.access_token,
  };
};
export const serverLogout = async (dto: RegisterDtoType) => {
  try {
    await axios.post(`${ENDPOINT}/api/logout`, dto, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    deleteAccessTokenCookie();
  } catch (error) {
    console.log(
      "Error occurred while logging out:",
      (error as AxiosError).message
    );
  }

  redirect("/login");
};

export const serverRefreshToken = async ({
  id,
}: {
  id: string;
}): Promise<User | null> => {
  try {
    const { data, status } = await axios.post(
      `${ENDPOINT}/api/refresh-token`,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (status === 200) {
      setAccessTokenCookie(data.access_token);

      return {
        ...(jwtDecode(data.access_token) as User),
        accessToken: data.access_token,
      };
    } else {
      console.log("Token refresh failed");
      return null;
    }
  } catch (error) {
    console.log("Error occurred:", (error as AxiosError).message);
    return null;
  }
};
