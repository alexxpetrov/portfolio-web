'use client'
import type {
  LoginDtoType,
  RegisterDtoType,
  User,
} from '../../types/user'
import { UserContext } from 'contexts/user/UserContext'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  serverLogin,
  serverLogout,
  serverRegister,
} from '../../services/serverAction'
import { useAuthService } from '../../services/useAuthService'
import { IS_DEVELOPMENT } from '../../utils/config'

export function UserProvider({
  accessToken,
  children,
}: {
  accessToken: string
  children: React.ReactNode
}) {
  const { push } = useRouter()
  const [user, setUser] = useState(
    accessToken ? { ...jwtDecode(accessToken), accessToken } : null,
  )
  const client = useAuthService()

  const handleWebAuthRegister = async () => {
    const loggedInUser = await client.webAuthRegister()

    setUser(loggedInUser)

    return loggedInUser
  }

  const handleLogin = async ({ email, password }: LoginDtoType) => {
    let loggedInUser
    if (IS_DEVELOPMENT) {
      loggedInUser = await serverLogin({ email, password } as RegisterDtoType)
    }
    else {
      loggedInUser = await client.login({ email, password })
    }

    setUser(loggedInUser)

    return loggedInUser
  }

  const handleRegister = async ({
    firstName,
    lastName,
    email,
    password,
  }: RegisterDtoType) => {
    let response
    if (IS_DEVELOPMENT) {
      response = await serverRegister({
        firstName,
        lastName,
        email,
        password,
      })
    }
    else {
      response = await client.register({
        firstName,
        lastName,
        email,
        password,
      })
    }

    setUser(response)

    return response
  }

  const handleLogout = async () => {
    if (IS_DEVELOPMENT) {
      await serverLogout({
        accessToken: user!.accessToken,
      })
    }
    else {
      await client.logout({
        accessToken: user!.accessToken,
      })
    }

    push('/')
    setUser(null)
  }

  useEffect(() => {
    if (accessToken) {
      setUser({ ...jwtDecode(accessToken ?? ''), accessToken } as User)
    }
  }, [accessToken])

  return (
    <UserContext
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
    </UserContext>
  )
}
