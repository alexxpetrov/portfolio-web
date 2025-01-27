import { Tooltip } from '@components/Tooltip/Tooltip';
import { useRoomsContext } from 'hooks/useRoomsContext';
import { useState } from 'react';
import { CreateChatModal } from './CreateChatModal';
import { SearchBar } from './SearchBar';

export const ChatRoomList = () => {
  const { selectedChat, switchWebSocket } = useRoomsContext();
  const { rooms, mutate } = useRoomsContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false); // State to toggle modal visibility

  const onSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleCreateChat = (newRoom: { name: string; id: string }) => {
    mutate([...rooms, newRoom]); // Add the new chat room to the list
    switchWebSocket(newRoom);
  };

  const filteredChats = rooms.filter(({ name }) =>
    name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <SearchBar onChange={onSearchChange} />
      <div className="max-h-[calc(100vh-400px)] overflow-hidden overflow-y-auto break-words 2xl:max-h-screen">
        {filteredChats.length > 0
          ? (
              filteredChats.map(({ id, name }) => (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                <div
                  key={id}
                  onClick={() => switchWebSocket({ id, name })}
                  className={`cursor-pointer rounded-md p-4 hover:bg-slate-700 ${
                    selectedChat?.id === id ? 'bg-slate-700' : ''
                  }`}
                >
                  {name}
                </div>
              ))
            )
          : (
              <div className="p-4 text-center text-slate-500">No chats found</div>
            )}
      </div>
      <div className="flex items-center gap-4 p-4">
        <button
          className="rounded-md bg-teal-600 px-4 py-2 font-semibold text-white hover:bg-teal-700 focus:ring-2 focus:ring-teal-300"
          onClick={() => setShowModal(true)}
          type="button"
        >
          Create chat
        </button>
        <Tooltip
          title={(
            <span className="text-slate-400">
              Chat rooms are managed by a Golang-based microservice. Data is
              fetched through a REST API and stored securely in a PostgreSQL
              database.
              <a
                className="font-medium text-white hover:text-teal-300 focus-visible:text-teal-300"
                rel="noreferrer noopener"
                href="https://github.com/alexxpetrov/beef"
                target="_blank"
              >
                {' '}
                GitHub
              </a>
            </span>
          )}
        />
      </div>
      {showModal && (
        <CreateChatModal
          onClose={() => setShowModal(false)}
          onCreateChat={handleCreateChat}
        />
      )}
    </>
  );
};
