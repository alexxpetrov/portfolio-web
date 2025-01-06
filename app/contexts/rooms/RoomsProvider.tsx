'use client';
import type { ChatRoom, Message } from 'chat/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useChatContext } from 'hooks/useChatContext';
import { useUserContext } from 'hooks/useUserContext';
import omit from 'lodash/omit';
import { useReducer, useRef, useState } from 'react';
import { useChatFetchData } from 'utils/chatFetcher';
import { config } from 'utils/config';
import { v4 as uuidv4 } from 'uuid';
import { RoomsContext } from './RoomsContext';

function reducer(state: Record<string, { resolve: () => void; reject: () => void }>, action: { id: string; type: 'add' | 'resolve' | 'exit'; resolve?: (value: unknown) => void; reject?: () => void }) {
  switch (action.type) {
    case 'add':
      return { ...state, [action.id]: { ...omit(action, 'id', 'type') } };
    case 'resolve':
      if (!state?.[action?.id]) {
        return state;
      }
      state?.[action.id]?.resolve();
      return omit(state, action.id);
    case 'exit':
      Object.values(state).forEach(({ resolve }) => {
        resolve();
      });
      return {};
    default:
      return state;
  }
}

export function RoomsProvider({ children }: { children: React.ReactNode }) {
  const { protectedFetcher } = useChatFetchData();
  const { user } = useUserContext();
  const { scrollableRef, setMessages } = useChatContext();
  const [, dispatch] = useReducer(reducer, {});

  // Access the client
  const queryClient = useQueryClient();
  // Queries
  const { data: rooms } = useQuery({ queryKey: ['chat/rooms'], queryFn: protectedFetcher('chat/rooms', { method: 'GET' }), enabled: !!user?.id, initialData: [] });
  // Mutations
  const mutation = useMutation<any, Error, ChatRoom[], unknown>({
    mutationFn: protectedFetcher('chat/rooms', { method: 'GET' }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['chat/rooms'] });
    },
  });

  const webSocketRef = useRef<WebSocket | null>(null);

  const [selectedChat, setSelectedChat] = useState<ChatRoom | null>(
    {} as ChatRoom,
  );

  const handleSendMessage = async (message: FormData, messageId?: string) => {
    // I had to create message IDs on the client to have unique ID for the promise map reducer
    const id = messageId || uuidv4();
    const { promise, resolve, reject } = Promise.withResolvers();

    // Force state update via queueMicrotask to prevent deadlock
    queueMicrotask(() => dispatch({ type: 'add', id, resolve, reject }));

    // Send the message to WS
    webSocketRef.current!.send(JSON.stringify({ content: message.get('content')!, id }));

    // Wait for the promise to resolve and remove the hanging optimistic promise from the map.
    await promise;
  };

  // Open WebSocket connection
  const connectToWebSocket = (id: string) => {
    const ws = new WebSocket(
      `${config.CHAT_WEBSOCKET_ENDPOINT}/api/chat/rooms/${id}?access_token=${user?.accessToken}&user_id=${user?.id}&nickname=${user?.firstName}_${user?.lastName}`,
    );

    if (ws.OPEN) {
      webSocketRef.current = ws;
    }
    ws.onmessage = function (event) {
      const parsedData = JSON.parse(event.data);
      const newMessages = (Array.isArray(parsedData) ? parsedData : [parsedData]) as Message[];

      setTimeout(() => {
        newMessages.forEach((message) => {
          if (message.user_id === user?.id) {
            dispatch({ type: 'resolve', id: message.id });
          }
        });

        setMessages(prev => [
          ...prev,
          ...newMessages.sort(
            (a, b) => {
              // @ts-expect-error ignore
              return new Date(a.time_created) - new Date(b.time_created);
            },
          ),
        ]);
        const scrollableElement = scrollableRef.current;
        if (scrollableElement) {
          const previousHeight = scrollableElement.scrollHeight;
          setTimeout(() => {
            const newHeight = scrollableElement.scrollHeight;
            scrollableElement.scrollTop += newHeight - previousHeight;
          }, 0);
        }
      }, 3000);
    };

    // Event: Connection closed
    ws.onclose = (event) => {
      console.log('WebSocket closed:', event.reason);
      setMessages([]);
    };

    // Event: Error occurred
    ws.onerror = (error) => {
      // promiseReducer.reject();
      console.error('WebSocket error:', error);
    };
  };

  // Switch WebSocket connection
  const switchWebSocket = ({ id, name }: ChatRoom) => {
    if (webSocketRef.current) {
      console.log('Closing WebSocket for chat:', selectedChat?.name);

      // Wait for the WebSocket to close
      webSocketRef.current.onclose = () => {
        setMessages([]);

        console.log('WebSocket closed. Opening new connection...');
        connectToWebSocket(id);
      };

      webSocketRef.current.close();
    } else {
      // No existing WebSocket, directly connect
      connectToWebSocket(id);
    }

    setSelectedChat({ id, name });
  };

  // const [roomChatState, submitMessageAction, isPending] = useActionState(submitMessage, { success: false });

  return (
    <RoomsContext
      value={{
        rooms,
        mutate: mutation.mutate,
        selectedChat,
        switchWebSocket,
        connectToWebSocket,
        handleSendMessage,
        setSelectedChat,
        // roomChatState,
        // submitMessageAction,
        // isPending,
      }}
    >
      {children}
    </RoomsContext>
  );
}
