// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Tooltip } from "@components/Tooltip/Tooltip";
import dayjs from "dayjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";

export const ChatBody = ({
  selectedChat,
  setSelectedChat,
  messages,
  scrollableRef,
  webSocketRef,
  userId,
}) => {
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    webSocketRef.current!.send(message);
    // setReplyTo(null);

    console.log("Message sent:", message);
    setMessage(""); // Clear the input after sending
  };

  const inputRef = useRef(null);

  const handleBlur = useCallback(() => {
    // Refocus the input if it loses focus
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    handleBlur();
  }, [messages, handleBlur]);

  if (!selectedChat?.id) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-slate-500">Select a chat to start messaging</span>
      </div>
    );
  }

  return (
    <div className="grid grid-rows-[auto,1fr,auto] h-full bg-gray-900 text-gray-200">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-800">
        <div className="flex gap-4 z-10">
          <span className="font-semibold">{selectedChat.name}</span>
          <Tooltip
            title={
              <span className="text-slate-400">
                Chat messages are delivered in real-time using WebSocket
                connections. All messages are efficiently stored and retrieved
                from Redis cache or ScyllaDB database for high performance.
                <a
                  className="font-medium text-white hover:text-teal-300 focus-visible:text-teal-300"
                  rel="noreferrer noopener"
                  href="https://github.com/alexxpetrov"
                  target="_blank"
                >
                  {" "}
                  GitHub
                </a>
              </span>
            }
          />
        </div>

        <button
          onClick={() => setSelectedChat(null)} // Return to no selection
          className="text-gray-400 hover:text-teal-300"
        >
          Back
        </button>
      </div>

      {/* Chat Messages */}
      <div
        className="p-4 overflow-y-auto scroll-smooth space-y-4"
        ref={scrollableRef}
      >
        {messages.length ? (
          messages.reduce((acc, message, index) => {
            const messageDate = dayjs(message.time_created).format(
              "DD/MM/YYYY"
            );

            const isNewDay =
              index === 0 ||
              dayjs(messages[index - 1].time_created).format("DD/MM/YYYY") !==
                messageDate;

            if (isNewDay) {
              acc.push(
                <div
                  key={`date-${messageDate}`}
                  className="text-center text-xs text-gray-500 mb-2"
                >
                  {messageDate}
                </div>
              );
            }

            acc.push(
              <div
                key={message.id}
                className={`flex ${
                  message.user_id === userId ? "justify-end" : "justify-start"
                } mb-4`}
              >
                <div
                  className={`p-3 flex flex-col rounded-lg max-w-xs relative ${
                    message.user_id === userId
                      ? "bg-teal-600 text-white"
                      : "bg-gray-800 text-gray-200"
                  }`}
                >
                  <span className="block text-sm font-semibold mb-1">
                    {message.nickname.replaceAll("_", " ")}
                  </span>
                  <span className="mr-8 overflow-hidden break-words">
                    {message.content}
                  </span>
                  <span
                    className={`text-xs absolute bottom-1 right-2 ${
                      message.user_id === userId
                        ? "text-teal-200"
                        : "text-gray-400"
                    }`}
                  >
                    {dayjs(message.time_created).format("HH:mm")}
                  </span>
                </div>
              </div>
            );

            return acc;
          }, [])
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-slate-500">The message history is empty</span>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-gray-700 bg-gray-800">
        <div className="relative flex items-center">
          {/* Input Field */}
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            autoFocus
            placeholder="Type a message..."
            className="w-full pr-10 p-2 bg-gray-700 text-gray-200 rounded-md outline-none focus:ring-2 focus:ring-teal-300"
          />
          {/* Send Icon */}
          {message.trim() && (
            <button
              onClick={handleSendMessage}
              className="absolute right-2 text-gray-400 hover:text-teal-300"
            >
              <FiSend size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
