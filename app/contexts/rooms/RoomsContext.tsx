import type { ChatRoom, RoomsContextType } from 'chat/types'
import { createContext, type RefObject } from 'react'

export const RoomsContext = createContext<RoomsContextType>({
  rooms: [],
  mutate: () => new Promise(() => null),
  switchWebSocket: () => {},
  connectToWebSocket: () => {},
  selectedChat: {} as ChatRoom,
  webSocketRef: {} as RefObject<WebSocket | null>,
  setSelectedChat: () => {},
})
