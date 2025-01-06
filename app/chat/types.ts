import type { UseMutateFunction } from '@tanstack/react-query';
import type { Dispatch, RefObject, SetStateAction } from 'react';

export type ChatRoom = {
  id: string;
  name: string;
};

export type Message = {
  id: string;
  content: string;
  user_id: string;
  nickname: string;
  room_id: string;
  time_created: string;
  isSending?: boolean;
  type: 'recv' | 'self';
};

export type ChatContextType = {
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
  optimisticMessages: Message[];
  addOptimisticMessage: (newMessage: Message) => void;
  scrollableRef: RefObject<HTMLDivElement | null>;
};

export type RoomsContextType = {
  rooms: ChatRoom[];
  mutate: UseMutateFunction<any, Error, ChatRoom[], unknown>;
  switchWebSocket: ({ id, name }: ChatRoom) => void;
  connectToWebSocket: (id: string) => void;
  selectedChat: ChatRoom | null;
  handleSendMessage: (message: FormData, id?: string) => void;
  setSelectedChat: Dispatch<SetStateAction<ChatRoom | null>>;
};
