'use client';
import type { Message } from 'chat/types';
import { useChatScroll } from 'hooks/useChatScroll';
import { useOptimistic, useState } from 'react';
import { ChatContext } from './ChatContext';

const getDisplayMessages = (messages: Message[]) => {
  const messageMap = new Map<string, Message>();

  messages.forEach((msg) => {
    if (!msg.isSending || !messageMap.has(msg.id)) {
      messageMap.set(msg.id, msg);
    }
  });

  return Array.from(messageMap.values());
};

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  // isSending marks "optimistic" messages
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (curMessages, newMessage: Message) => [
      ...curMessages,
      { ...newMessage, isSending: true },
    ],
  );
  const { scrollableRef } = useChatScroll({ optimisticMessages });

  // Render messages and filter out "optimistic" messages if they have a server-confirmed duplicate
  const displayMessages = getDisplayMessages(optimisticMessages);

  return (
    <ChatContext
      value={{
        scrollableRef,
        addOptimisticMessage,
        setMessages,
        messages,
        optimisticMessages: displayMessages,
      }}
    >
      {children}
    </ChatContext>
  );
}
