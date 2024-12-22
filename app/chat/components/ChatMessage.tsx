import type { Message } from 'chat/types'
import type { FC } from 'react'
import { formatTime } from 'chat/utils/utils'

interface ChatMessageProps {
  message: Message
  isCurrentUser: boolean
}

export const ChatMessage: FC<ChatMessageProps> = ({
  message,
  isCurrentUser,
}) => {
  const bubbleClass = isCurrentUser
    ? 'bg-teal-600 text-white'
    : 'bg-gray-800 text-gray-200'
  const timeClass = isCurrentUser ? 'text-teal-200' : 'text-gray-400'

  return (
    <div
      key={message.id}
      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`p-3 flex flex-col rounded-lg max-w-xs relative ${bubbleClass}`}
      >
        <span className="block text-sm font-semibold mb-1">
          {message.nickname.replaceAll('_', ' ')}
        </span>
        <span className="mr-8 overflow-hidden break-words">
          {message.content}
        </span>
        <span className={`text-xs absolute bottom-1 right-2 ${timeClass}`}>
          {formatTime(message.time_created)}
        </span>
      </div>
    </div>
  )
}
