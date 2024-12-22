'use server'

import { cookies } from 'next/headers'

const ACCESS_TOKEN_EXPIRATION = 24 * 7

const currentTime = new Date()
currentTime.setHours(currentTime.getHours() + ACCESS_TOKEN_EXPIRATION)

export async function setAccessTokenCookie(token: string) {
  (await cookies()).set('access_token', token, {
    name: 'access_token',
    value: token,
    expires: currentTime,
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  })
}

export async function deleteAccessTokenCookie() {
  (await cookies()).delete('access_token')
}
