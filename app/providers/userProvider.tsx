'use client'
import type { ReactNode } from 'react'
import { UserProvider } from '../contexts/user/UserProvider'

function UserProviderWrapper({
  accessToken,
  children,
}: {
  children: ReactNode
  accessToken: string
}) {
  return <UserProvider accessToken={accessToken}>{children}</UserProvider>
}

export default UserProviderWrapper
