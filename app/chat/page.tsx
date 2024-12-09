"use client";
import { useChatFetchData } from "dashboard/utils/chatFetcher";
import { useEffect, useMemo, useState } from "react";
import { FiSend } from "react-icons/fi"; // Importing a paper plane icon from react-icons
import useSWR from "swr";
import { useUserContext } from "../dashboard/hooks/useUserContext";

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
  const [message, setMessage] = useState<string>("");
  // const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const { user } = useUserContext();
  const [selectedChat, setSelectedChat] = useState<{
    id?: string;
    name?: string;
  } | null>({});
  const [showModal, setShowModal] = useState(false); // State to toggle modal visibility
  const [chatRoomName, setChatRoomName] = useState(""); // State for chat room name

  const { protectedFetcher } = useChatFetchData();

  const { data: chats = [], mutate } = useSWR<{ name: string; id: string }[]>(
    "chat/rooms",
    protectedFetcher("chat/rooms", { method: "GET" }),
    {
      fallbackData: [],
    }
  );

  const handleCreateChat = async () => {
    if (chatRoomName.trim() === "") return;
    const { data: newRoom } = await protectedFetcher(`chat/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { name: chatRoomName },
    })();
    mutate([...chats, newRoom]); // Add the new chat room to the list
    setChatRoomName(""); // Clear the input field
    setShowModal(false); // Close the modal
  };

  useEffect(() => {
    if (user?.accessToken && selectedChat?.id) {
      const ws = new WebSocket(
        `ws://localhost:4000/api/chat/rooms/97d36095-0ab7-4511-8288-f4ce9b962c5d?access_token=${user?.accessToken}&user_id=${user.id}&nickname=test`
      );
      console.log(ws);
      if (ws.OPEN) {
        setWs(ws);
      }

      ws.onopen = () => {
        console.log("WebSocket connected");
        // setIsConnected(true);

        // Optionally send a message to the server
        // ws.send(
        //   JSON.stringify({ type: "greeting", message: "Hello, Server!" })
        // );
      };

      // Event: Message received
      ws.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        console.log("Message received from server:", JSON.parse(event.data));
        setMessages((prev) => [
          ...prev,
          ...(parsedData.length ? parsedData : [parsedData]),
        ]); // Append the message to the state
      };

      // Event: Connection closed
      ws.onclose = (event) => {
        console.log("WebSocket closed:", event.reason);
      };

      // Event: Error occurred
      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      return () => ws.close();
    }
  }, [user, selectedChat?.id]);

  const [searchQuery, setSearchQuery] = useState(""); // State to track search query

  // Filter chats based on search query
  const filteredChats = useMemo(
    () =>
      chats.filter(({ name }) =>
        name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [chats, searchQuery]
  );

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    ws!.send(message);
    // setReplyTo(null);

    console.log("Message sent:", message);
    setMessage(""); // Clear the input after sending
  };
  console.log(messages, user);
  return (
    <div className="grid h-[calc(100vh-3rem)] md:grid-cols-3 lg:grid-cols-[1fr_2fr_1fr] grid-rows-[3fr_1fr] md:grid-rows-1 mt-12">
      {/* Chat List */}
      <div
        className={`bg-gray-900 text-gray-200 border-r border-gray-700 ${
          selectedChat?.id ? "hidden md:block" : "block"
        }`}
      >
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-700">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded-md outline-none"
          />
        </div>

        {/* Chat List */}
        <div className="overflow-y-auto">
          {filteredChats.length > 0 ? (
            filteredChats.map(({ id, name }) => (
              <div
                key={id}
                onClick={() => setSelectedChat({ id, name })}
                className={`p-4 cursor-pointer hover:bg-gray-800 ${
                  selectedChat?.id === id ? "bg-gray-800" : ""
                }`}
              >
                {name}
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-400">No chats found</div>
          )}
        </div>

        <div className={`p-4`}>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            Create chat
          </button>
        </div>
      </div>

      {/* Chat Content */}
      <div
        className={`bg-gray-800 text-gray-200 ${
          selectedChat?.id ? "block" : "hidden md:block"
        }`}
      >
        {selectedChat?.id ? (
          <div className="grid grid-rows-[auto,1fr,auto] h-full">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <span>{selectedChat.name}</span>
              <button
                onClick={() => setSelectedChat(null)} // Return to no selection
                className="text-gray-400 hover:text-gray-200"
              >
                Back
              </button>
            </div>
            {/* Chat Messages */}
            <div className="p-4 overflow-y-auto">
              {messages.map((message) =>
                message.user_id === user?.id ? (
                  <div className="mb-4 flex justify-end" key={message.id}>
                    <div className="p-3 bg-blue-600  rounded-lg max-w-xs">
                      {message.nickname}

                      {message.content}
                    </div>
                  </div>
                ) : (
                  <div className="mb-4 text-right" key={message.id}>
                    <div className="p-3 bg-gray-700 rounded-lg max-w-xs">
                      {message.nickname}

                      {message.content}
                    </div>
                  </div>
                )
              )}
            </div>
            {/* Chat Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="relative flex items-center">
                {/* Input Field */}
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full pr-10 p-2 bg-gray-700 rounded-md outline-none"
                />
                {/* Send Icon */}
                {message.trim() && (
                  <button
                    onClick={handleSendMessage}
                    className="absolute right-2 text-gray-400 hover:text-gray-200"
                  >
                    <FiSend size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <span>Select a chat to start messaging</span>
          </div>
        )}
      </div>

      {/* Logging Panel */}
      <div
        className={`bg-gray-700 text-gray-200 border-t md:border-l border-gray-600`}
      >
        <div className="p-4 border-b border-gray-600">
          <span className="font-bold">Logs</span>
        </div>
        <div className="p-4 overflow-y-auto h-full">
          {["Action 1", "Action 2", "Action 3"].map((log, index) => (
            <div key={index} className="mb-2 text-sm">
              {log}
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-gray-200 rounded-md w-1/3 p-6">
            <h2 className="text-lg font-bold mb-4">Create Chat Room</h2>
            <input
              type="text"
              value={chatRoomName}
              onChange={(e) => setChatRoomName(e.target.value)}
              placeholder="Chat Room Name"
              className="w-full p-2 mb-4 bg-gray-700 rounded-md outline-none"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)} // Close the modal
                className="p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateChat} // Create the chat room
                className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// interface MessageProps {
//   message: Message;
//   onReply: () => void;
//   onDelete: () => void;
// }

// function MessageComponent({ message, onReply, onDelete }: MessageProps) {
//   return (
//     <div
//       className={
//         message.user_id !== 1
//           ? "flex items-start mb-4 text-right"
//           : "p-3 bg-blue-600 rounded-lg max-w-xs ml-auto"
//       }
//     >
//       <IconUserBitcoin
//         // src={message.user.avatar}
//         // alt={message.user.name}
//         className="w-8 h-8 rounded-full mr-3"
//       />
//       <div className="flex-1">
//         <div className="flex items-center justify-between">
//           <span className="font-semibold">{message.user.name}</span>
//           <div className="flex space-x-1">
//             <button
//               onClick={onReply}
//               className="text-gray-400 hover:text-gray-600 focus:outline-none"
//             >
//               <IconMessageReply size={12} />
//             </button>
//             <button
//               onClick={onDelete}
//               className="text-red-400 hover:text-red-600 focus:outline-none"
//             >
//               <IconTrash size={12} />
//             </button>
//           </div>
//         </div>
//         {message.replyTo && (
//           <div className="text-xs text-gray-500 mt-1">
//             Replying to: {message.replyTo.text}
//           </div>
//         )}
//         <p className="mt-1">{message.text}</p>
//       </div>
//     </div>
//   );
// }
