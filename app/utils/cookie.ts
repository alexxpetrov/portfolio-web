'use server';

import { cookies } from 'next/headers';
import { connection } from 'next/server';

const ACCESS_TOKEN_EXPIRATION = 24 * 7;

export async function setAccessTokenCookie(token: string) {
  await connection();
  const currentTime = new Date();
  currentTime.setHours(currentTime.getHours() + ACCESS_TOKEN_EXPIRATION);

  (await cookies()).set('access_token', token, {
    name: 'access_token',
    value: token,
    expires: currentTime,
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
}

export async function deleteAccessTokenCookie() {
  (await cookies()).delete('access_token');
}

export async function getAccessTokenCookie() {
  return (await cookies()).get('access_token')?.value;
}
