import type { Message } from 'chat/types';
import type { FC } from 'react';
import { formatTime } from 'chat/utils/utils';

type ChatMessageProps = {
  message: Message;
  isCurrentUser: boolean;
};

export const ChatMessage: FC<ChatMessageProps> = ({
  message,
  isCurrentUser,
}) => {
  const bubbleClass = isCurrentUser
    ? 'bg-teal-600 text-white'
    : 'bg-gray-800 text-gray-200';
  const timeClass = isCurrentUser ? 'text-teal-200' : 'text-gray-400';

  return (
    <div
      key={message.id}
      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`relative flex max-w-xs flex-col rounded-lg p-3 ${bubbleClass}`}
      >
        <span className="mb-1 block text-sm font-semibold">
          {message.nickname.replaceAll('_', ' ')}
        </span>
        <span className="mr-8 overflow-hidden break-words">
          {message.content}
          {message.isSending && (
            <span className="mr-8 overflow-hidden break-words text-gray-200">
              {' '}
              Sending...
            </span>
          )}
        </span>

        <span className={`absolute bottom-1 right-2 text-xs ${timeClass}`}>
          {formatTime(message.time_created)}
        </span>
      </div>
    </div>
  );
};
