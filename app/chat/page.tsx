"use client";
import Login from "dashboard/features/Auth/Login/Login";
import { LoginModal } from "dashboard/features/Auth/LoginModal/LoginModal";
import { useUserService } from "dashboard/services/userUserService";
import { useChatFetchData } from "dashboard/utils/chatFetcher";
import { useEffect, useMemo, useRef, useState } from "react";
import useSWR from "swr";
import { useUserContext } from "../dashboard/hooks/useUserContext";
import { ChatBody } from "./ChatBody";

type Message = {
  id: string;
  content: string;
  user_id: string;
  nickname: string;
  room_id: string;
  time_created: string;
  type: "recv" | "self";
};

export default function ChatLayout() {
  const [messages, setMessages] = useState<Message[]>([]);
  // const [replyTo, setReplyTo] = useState<Message | null>(null);
  const { user } = useUserContext();
  const [selectedChat, setSelectedChat] = useState<{
    id?: string;
    name?: string;
  } | null>({});
  const [showModal, setShowModal] = useState(false); // State to toggle modal visibility
  const [chatRoomName, setChatRoomName] = useState(""); // State for chat room name
  const [forcedRender, setForcedRender] = useState(true);

  const { protectedFetcher } = useChatFetchData();

  const scrollableRef = useRef<HTMLDivElement | null>(null);
  const chatWindowRef = useRef<Element>(null);

  useEffect(() => {
    // Scroll to the bottom on initial load
    const scrollableElement = scrollableRef.current;
    if (scrollableElement) {
      setTimeout(() => {
        scrollableElement.scrollTop = scrollableElement.scrollHeight;
      }, 0);
    }
  }, [messages]);

  const { data: rooms = [], mutate } = useSWR<{ name: string; id: string }[]>(
    user ? "chat/rooms" : null,
    protectedFetcher("chat/rooms", { method: "GET" }),
    {
      fallbackData: [],
    }
  );
  const webSocketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (messages?.[0]?.room_id === selectedChat?.id) {
      // @ts-expect-error ignore
      chatWindowRef.current = (
        <ChatBody
          {...{
            setSelectedChat,
            selectedChat,
            messages,
            userId: user?.id,
            webSocketRef,
            scrollableRef,
          }}
        />
      );
    }
  }, [
    selectedChat?.id,
    messages,
    scrollableRef,
    webSocketRef,
    user?.id,
    selectedChat,
    forcedRender,
  ]);

  const { data: userInfo } = useSWR(
    user || null,
    () => getUserInfo({ userId: user!.id }),
    {
      // @ts-expect-error ignore
      fallbackData: {},
      refreshInterval: 5000,
    }
  );

  const handleCreateChat = async () => {
    if (chatRoomName.trim() === "") return;
    const newRoom = await protectedFetcher(`chat/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { name: chatRoomName },
    })();
    mutate([...rooms, newRoom]); // Add the new chat room to the list
    setChatRoomName(""); // Clear the input field
    setShowModal(false); // Close the modal
  };

  const { getUserInfo } = useUserService();

  // Open WebSocket connection
  const connectToWebSocket = (id: string) => {
    const ws = new WebSocket(
      `ws://localhost:4000/api/chat/rooms/${id}?access_token=${user?.accessToken}&user_id=${user?.id}&nickname=${user?.firstName}_${user?.lastName}`
    );

    if (ws.OPEN) {
      webSocketRef.current = ws;
    }

    ws.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      console.log("Message received from server:", JSON.parse(event.data));
      setMessages((prev) => [
        ...prev,
        ...(Array.isArray(parsedData) ? parsedData : [parsedData]).sort(
          // @ts-expect-error ignore
          (a, b) => new Date(a.time_created) - new Date(b.time_created)
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
      console.log("WebSocket closed:", event.reason);
      setMessages([]);
    };

    // Event: Error occurred
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  };

  // Switch WebSocket connection
  // @ts-expect-error ignore
  const switchWebSocket = ({ id, name }) => {
    if (webSocketRef.current) {
      console.log("Closing WebSocket for chat:", selectedChat?.name);

      // Wait for the WebSocket to close
      webSocketRef.current.onclose = () => {
        setMessages([]);
        setForcedRender(false);

        console.log("WebSocket closed. Opening new connection...");
        connectToWebSocket(id);
      };

      webSocketRef.current.close();
    } else {
      // No existing WebSocket, directly connect
      connectToWebSocket(id);
    }

    setSelectedChat({ id, name });
  };

  const [searchQuery, setSearchQuery] = useState(""); // State to track search query

  // Filter rooms based on search query
  const filteredChats = useMemo(
    () =>
      rooms.filter(({ name }) =>
        name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [rooms, searchQuery]
  );

  const lastMessageRoomName = useMemo(
    () => rooms.find(({ id }) => id == userInfo?.lastMessageRoomId)?.name,
    [rooms, userInfo?.lastMessageRoomId]
  );
  const lastJoinedRoomName = useMemo(
    () => rooms.find(({ id }) => id == userInfo?.joinedRoomId)?.name,
    [rooms, userInfo?.joinedRoomId]
  );

  return (
    <div className="min-h-screen overflow-hidden bg-slate-900 leading-relaxed text-slate-400 selection:bg-teal-300 selection:text-teal-900">
      <div className="grid h-screen lg:h-screen lg:max-h-screen lg:grid-cols-[1fr_3fr_1fr] grid-rows-[4fr_1fr] lg:grid-rows-1">
        {!user && <LoginModal />}
        {/* Chat List */}
        <div
          className={`bg-slate-800 text-slate-200 border-r border-slate-600 ${
            selectedChat?.id ? "hidden lg:flex flex-col" : "flex flex-col"
          }`}
        >
          {/* Search Bar */}
          {user && (
            <div className="p-4 border-b border-slate-600">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 bg-slate-700 text-slate-200 rounded-md outline-none focus:ring-2 focus:ring-teal-300"
              />
            </div>
          )}

          {/* Chat List */}
          <div className="overflow-y-auto max-h-[calc(100vh-400px)]">
            {filteredChats.length > 0 ? (
              filteredChats.map(({ id, name }) => (
                <div
                  key={id}
                  onClick={() => switchWebSocket({ id, name })}
                  className={`p-4 cursor-pointer rounded-md hover:bg-slate-700 ${
                    selectedChat?.id === id ? "bg-slate-700" : ""
                  }`}
                >
                  {name}
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-slate-500">
                No chats found
              </div>
            )}
          </div>

          {user && (
            <div className="p-4">
              <button
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-md focus:ring-2 focus:ring-teal-300"
                onClick={() => setShowModal(true)}
              >
                Create chat
              </button>
            </div>
          )}
          {user && (
            <div className="p-4 mt-auto">
              <Login />
            </div>
          )}
        </div>

        {/* Chat Content */}
        <div
          className={`bg-slate-900 text-slate-200 overflow-y-auto ${
            selectedChat?.id ? "block" : "hidden lg:block"
          }`}
        >
          {/* @ts-expect-error ignore */}
          {messages?.[0]?.room_id !== selectedChat?.id && messages.length ? (
            chatWindowRef.current
          ) : (
            <ChatBody
              {...{
                setSelectedChat,
                selectedChat,
                messages: messages.length ? messages : [],
                userId: user?.id,
                webSocketRef,
                scrollableRef,
              }}
            />
          )}
        </div>

        {/* Logging Panel */}
        <div
          className={`bg-slate-800 text-slate-200 border-t md:border-l border-slate-600`}
        >
          <div className="p-4 border-b border-slate-600">
            <span className="font-bold text-slate-200">Logs</span>
          </div>
          <div className="p-4 overflow-y-auto h-full text-sm text-slate-400 max-w-xl overflow-hidden break-words">
            {userInfo?.loginTimestamp && (
              <div className="mb-2">
                Your login timestamp: {userInfo.loginTimestamp}
              </div>
            )}
            {userInfo?.registerTimestamp && (
              <div className="mb-2">
                Your registration timestamp: {userInfo.registerTimestamp}
              </div>
            )}
            {lastJoinedRoomName && (
              <div className="mb-2">Last joined room: {lastJoinedRoomName}</div>
            )}
            {userInfo?.lastMessage && (
              <div className="mb-2">
                Last message: {userInfo.lastMessage} in {lastMessageRoomName}{" "}
                room
              </div>
            )}
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-slate-900 text-slate-200 rounded-md w-full max-w-md p-6 sm:p-8 md:max-w-lg lg:max-w-xl">
              <h2 className="text-lg font-semibold text-slate-200 mb-4">
                Create Chat Room
              </h2>
              <input
                type="text"
                value={chatRoomName}
                onChange={(e) => setChatRoomName(e.target.value)}
                placeholder="Chat Room Name"
                className="w-full p-2 mb-4 bg-slate-800 text-slate-200 rounded-md outline-none focus:ring-2 focus:ring-teal-300"
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowModal(false)} // Close the modal
                  className="p-2 bg-slate-700 text-white rounded-md hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateChat} // Create the chat room
                  className="p-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
