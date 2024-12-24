import type { ChatRoom } from 'chat/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useChatContext } from 'hooks/useChatContext';
import { useUserContext } from 'hooks/useUserContext';
import { useRef, useState } from 'react';
import { useChatFetchData } from 'utils/chatFetcher';
import { RoomsContext } from './RoomsContext';

export function RoomsProvider({ children }: { children: React.ReactNode }) {
  const { protectedFetcher } = useChatFetchData();
  const { user } = useUserContext();
  const { setMessages, scrollableRef } = useChatContext();

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

  // Open WebSocket connection
  const connectToWebSocket = (id: string) => {
    const ws = new WebSocket(
      `wss://beef.alexspetrov.com/api/chat/rooms/${id}?access_token=${user?.accessToken}&user_id=${user?.id}&nickname=${user?.firstName}_${user?.lastName}`,
    );

    if (ws.OPEN) {
      webSocketRef.current = ws;
    }

    ws.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      console.log('Message received from server:', JSON.parse(event.data));
      setMessages(prev => [
        ...prev,
        ...(Array.isArray(parsedData) ? parsedData : [parsedData]).sort(
          // @ts-expect-error ignore
          (a, b) => new Date(a.time_created) - new Date(b.time_created),
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
    };

    // Event: Connection closed
    ws.onclose = (event) => {
      console.log('WebSocket closed:', event.reason);
      setMessages([]);
    };

    // Event: Error occurred
    ws.onerror = (error) => {
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

  return (
    <RoomsContext
      value={{
        rooms,
        mutate: mutation.mutate,
        selectedChat,
        switchWebSocket,
        connectToWebSocket,
        webSocketRef,
        setSelectedChat,
      }}
    >
      {children}
    </RoomsContext>
  );
}
