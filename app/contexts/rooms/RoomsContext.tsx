import type { ChatRoom, RoomsContextType } from 'chat/types';
import { createContext } from 'react';

export const RoomsContext = createContext<RoomsContextType>({
  rooms: [],
  mutate: () => new Promise(() => null),
  switchWebSocket: () => {},
  connectToWebSocket: () => {},
  selectedChat: {} as ChatRoom,
  handleSendMessage: () => {},
  setSelectedChat: () => {},
});
