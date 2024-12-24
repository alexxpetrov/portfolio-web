'use client';
import { LoginModal } from 'features/Auth/LoginModal/LoginModal';
import { useRoomsContext } from 'hooks/useRoomsContext';
import { useUserContext } from 'hooks/useUserContext';
import { ChatBody } from './ChatBody';
import { ChatRoomList } from './ChatRoomList';
import { LogPanel } from './LogPanel';

export const ChatWrapper = () => {
  const { selectedChat } = useRoomsContext();

  const { user } = useUserContext();

  if (!user) {
    return <LoginModal />;
  }

  return (
    <div className="min-h-screen overflow-hidden bg-slate-900 leading-relaxed text-slate-400 selection:bg-teal-300 selection:text-teal-900">
      <div className="grid h-screen grid-rows-[4fr_1fr] xl:max-h-screen 2xl:grid-cols-[1fr_3fr_1fr] 2xl:grid-rows-1">
        <div
          className={`border-r border-slate-600 bg-slate-800 text-slate-200 ${
            selectedChat?.id ? 'hidden flex-col 2xl:flex' : 'flex flex-col'
          }`}
        >
          <ChatRoomList />
        </div>

        <div
          className={`overflow-y-auto bg-slate-900 text-slate-200 ${
            selectedChat?.id ? 'block' : 'hidden 2xl:block'
          }`}
        >
          <ChatBody />
        </div>

        <LogPanel />
      </div>
    </div>
  );
};
