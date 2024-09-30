"use server";
import { jwtDecode } from "jwt-decode";
import { RegisterDtoType, User } from "../types/User";
import { ENDPOINT, IS_DEVELOPMENT } from "../utils/config";
import axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { deleteAccessTokenCookie, setAccessTokenCookie } from "../utils/cookie";

import { ConnectError, createPromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { AuthService } from "@/gen/auth/v1/auth_connect";
import { LoginResponse } from "@/gen/auth/v1/auth_pb";

const transport = createConnectTransport({
  baseUrl: "http://localhost:8080",
});

const client = createPromiseClient(AuthService, transport);

export const serverLogin = async (dto: RegisterDtoType): Promise<User> => {
  const data = (await client
    .login(dto)
    .then((res) => res)
    .catch((err) => {
      if (err instanceof ConnectError) {
        console.log(err.code); // Code.InvalidArgument
        console.log(err.message); // "[invalid_argument] sentence cannot be empty"
      }
      // Alternatively, we can use ConnectError.from()
      // It returns a ConnectError as is, and converts any
      // other error to a ConnectError.
      const connectErr = ConnectError.from(err);
      console.log(connectErr.code); // Code.InvalidArgument
      console.log(connectErr.message); // "[invalid_argument] sentence cannot be empty"
    })) as LoginResponse;

  if (!data.accessToken) {
    return {} as User;
  }

  if (IS_DEVELOPMENT) {
    setAccessTokenCookie(data.accessToken);
  }

  return {
    ...(jwtDecode(data.accessToken) as User),
    accessToken: data.accessToken,
  };
};

export const serverRegister = async (
  dto: RegisterDtoType
): Promise<User & { error?: string }> => {
  const { data } = await axios
    .post(`${ENDPOINT}/api/register`, dto, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .catch((err) => {
      return { data: err.response.data };
    });

  if (!data.access_token) {
    return data;
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

  redirect("/");
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
