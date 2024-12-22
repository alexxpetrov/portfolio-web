import { UserContext } from 'contexts/user/UserContext'
import { useContext } from 'react'

// Custom hook to use the UserContext
export function useUserContext() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider')
  }
  return context
}
