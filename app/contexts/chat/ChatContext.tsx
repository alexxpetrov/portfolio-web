import type { ChatContextType } from 'chat/types'
import { createContext, type RefObject } from 'react'

export const ChatContext = createContext<ChatContextType>({
  messages: [],
  setMessages: () => {},
  scrollableRef: {} as RefObject<null>,
})
