import { Message } from "chat/types";
import React, { FC } from "react";
import { ChatMessage } from "./ChatMessage";
import { formatDate } from "chat/utils/utils";

type MessageListProps = {
  messages: Message[];
  userId: string;
};
export const MessageList: FC<MessageListProps> = ({ messages, userId }) => {
  if (!messages.length) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-slate-500">The message history is empty</span>
      </div>
    );
  }

  let lastDate = "";

  return messages.map((message) => {
    const messageDate = formatDate(message.time_created);
    const isNewDay = lastDate !== messageDate;
    lastDate = messageDate;

    return (
      <React.Fragment key={message.id}>
        {isNewDay && (
          <div
            className="text-center text-xs text-gray-500 mb-2"
            key={`date-${messageDate}`}
          >
            {messageDate}
          </div>
        )}
        <ChatMessage
          message={message}
          isCurrentUser={message.user_id === userId}
        />
      </React.Fragment>
    );
  });
};
