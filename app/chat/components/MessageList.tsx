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

  const processedMessages = messages.map((message, index, arr) => {
    const messageDate = formatDate(message.time_created);
    const prevMessageDate
      = index > 0 ? formatDate(arr[index - 1].time_created) : null;
    const isNewDay = messageDate !== prevMessageDate;

    return {
      ...message,
      messageDate,
      isNewDay,
    };
  });

  return (
    <div>
      {processedMessages.map(message => (
        <React.Fragment key={message.id}>
          {message.isNewDay && (
            <div
              className="mb-2 text-center text-xs text-gray-500"
              key={`date-${message.messageDate}`}
            >
              {message.messageDate}
            </div>
          )}
          <ChatMessage
            message={message}
            isCurrentUser={message.user_id === user?.id}
          />
        </React.Fragment>
      ))}
    </div>
  );
}
