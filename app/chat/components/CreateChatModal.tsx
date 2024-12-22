import type { ChatRoom } from 'chat/types';
import { useState } from 'react';
import { useChatFetchData } from 'utils/chatFetcher';

export function CreateChatModal({
  onClose,
  onCreateChat,
}: {
  onClose: () => void;
  onCreateChat: (room: ChatRoom) => void;
}) {
  const { protectedFetcher } = useChatFetchData();

  const [chatRoomName, setChatRoomName] = useState(''); // State for chat room name

  const handleCreateChat = async () => {
    if (chatRoomName.trim() === '') {
      return;
    }
    const newRoom = await protectedFetcher(`chat/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { name: chatRoomName },
    })();
    onCreateChat(newRoom);
    setChatRoomName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-md bg-slate-900 p-6 text-slate-200 sm:p-8 md:max-w-lg lg:max-w-xl">
        <h2 className="mb-4 text-lg font-semibold text-slate-200">
          Create Chat Room
        </h2>
        <input
          autoFocus
          type="text"
          value={chatRoomName}
          onChange={e => setChatRoomName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleCreateChat();
            }
          }}
          placeholder="Chat Room Name"
          className="mb-4 w-full rounded-md bg-slate-800 p-2 text-slate-200 outline-none focus:ring-2 focus:ring-teal-300"
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose} // Close the modal
            className="rounded-md bg-slate-700 p-2 text-white hover:bg-slate-800"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateChat} // Create the chat room
            className="rounded-md bg-teal-600 p-2 text-white hover:bg-teal-700"
            type="button"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
