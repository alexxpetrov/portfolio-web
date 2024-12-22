import { formatDate } from 'chat/utils/utils';
import { useChatContext } from 'hooks/useChatContext';
import { useUserContext } from 'hooks/useUserContext';
import React from 'react';
import { ChatMessage } from './ChatMessage';

export function MessageList() {
  const { user } = useUserContext();
  const { messages } = useChatContext();

  if (!messages.length) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-slate-500">The message history is empty</span>
      </div>
    );
  }

  let lastDate = '';

  return messages.map((message) => {
    const messageDate = formatDate(message.time_created);
    const isNewDay = lastDate !== messageDate;
    lastDate = messageDate;

    return (
      <React.Fragment key={message.id}>
        {isNewDay && (
          <div
            className="mb-2 text-center text-xs text-gray-500"
            key={`date-${messageDate}`}
          >
            {messageDate}
          </div>
        )}
        <ChatMessage
          message={message}
          isCurrentUser={message.user_id === user?.id}
        />
      </React.Fragment>
    );
  });
}
