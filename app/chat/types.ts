import type { Dispatch, RefObject, SetStateAction } from 'react'
import type { KeyedMutator } from 'swr'

export interface ChatRoom { id: string, name: string }

export interface Message {
  id: string
  content: string
  user_id: string
  nickname: string
  room_id: string
  time_created: string
  type: 'recv' | 'self'
}

export interface ChatContextType {
  messages: Message[]
  setMessages: Dispatch<SetStateAction<Message[]>>
  scrollableRef: RefObject<HTMLDivElement | null>
}

export interface RoomsContextType {
  rooms: ChatRoom[]
  mutate: KeyedMutator<ChatRoom[]>
  switchWebSocket: ({ id, name }: ChatRoom) => void
  connectToWebSocket: (id: string) => void
  selectedChat: ChatRoom | null
  webSocketRef: RefObject<WebSocket | null>
  setSelectedChat: Dispatch<SetStateAction<ChatRoom | null>>
}
