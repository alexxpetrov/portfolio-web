import type { Message } from 'chat/types';
import { useChatScroll } from 'hooks/useChatScroll';
import { useState } from 'react';
import { ChatContext } from './ChatContext';

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);

  const { scrollableRef } = useChatScroll({ messages });

  return (
    <ChatContext
      value={{
        messages,
        setMessages,
        scrollableRef,
      }}
    >
      {children}
    </ChatContext>
  );
}
