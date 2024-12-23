'use server';
import type { LoginResponse, RegisterResponse } from '@gen/protobuff/auth/v1/auth_pb';
import type { AxiosError } from 'axios';
import type { RegisterDtoType, User } from '../types/user';

import { ConnectError, createClient } from '@connectrpc/connect';
import { createConnectTransport } from '@connectrpc/connect-web';
import { AuthService } from '@gen/protobuff/auth/v1/auth_pb';
import { jwtDecode } from 'jwt-decode';
import { redirect } from 'next/navigation';
import { IS_DEVELOPMENT, WEBAUTHN_ENDPOINT } from '../utils/config';
import { deleteAccessTokenCookie, setAccessTokenCookie } from '../utils/cookie';

const transport = createConnectTransport({
  baseUrl: WEBAUTHN_ENDPOINT,
  fetch: (input, init) => fetch(input, { ...init, credentials: 'include' }),
});

const client = createClient(AuthService, transport);

export async function serverLogin(dto: RegisterDtoType): Promise<User> {
  const data = (await client
    .login(dto)
    .then(res => res)
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
}

export async function serverRegister(dto: RegisterDtoType): Promise<User> {
  const data = (await client
    .register(dto)
    .then(res => res)
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
    })) as RegisterResponse;

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
}

export async function serverLogout(dto: { accessToken: string }) {
  const data = (await client
    .logout(dto)
    .then(res => res)
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
    }));

  if (!data?.ok) {
    return;
  }

  if (IS_DEVELOPMENT) {
    deleteAccessTokenCookie();
  }

  redirect('/');
}

export async function serverRefreshToken({
  id,
  accessToken,
}: {
  id: string;
  accessToken: string;
}) {
  try {
    const data = (await client
      .refreshAccessToken({ accessToken, userId: id })
      .then(res => res)
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
      }));

    if (!data) {
      return null;
    }

    return data.accessToken;
  } catch (error) {
    console.log('Error occurred:', (error as AxiosError).message);
    return null;
  }
}
