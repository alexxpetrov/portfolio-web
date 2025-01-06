import type { ChatContextType } from 'chat/types';
import { createContext, type RefObject } from 'react';

export const ChatContext = createContext<ChatContextType>({
  optimisticMessages: [],
  setMessages: () => {},
  messages: [],
  addOptimisticMessage: () => {},
  scrollableRef: {} as RefObject<null | null>,
});
