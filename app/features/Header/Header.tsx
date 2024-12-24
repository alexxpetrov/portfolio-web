'use client';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { actions } from '../../store/user/actions';
import Login from '../Auth/Login/Login';

// const headerItems = [
//   { key: "/", label: <Link href="/">Home</Link> },
//   { key: "/dashboard", label: <Link href="/dashboard">Dashboard</Link> },
//   { key: "/chat", label: <Link href="/chat">Chat</Link> },
//   { key: "/search", label: <Link href="/search">Search</Link> },
// ];

function AppHeader() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.init());
  }, [dispatch]);

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-cover bg-center backdrop-blur-lg">
      <div className="grid grid-cols-12 items-center px-4 py-2">
        <div className="col-span-4 text-left text-lg font-bold text-white">
          <ul className="flex flex-wrap gap-4">
            <li>Main</li>
            <li>Chat</li>
          </ul>
        </div>
        <div className="col-span-4 text-left text-lg font-bold text-white"></div>

        <div className="col-span-4 space-x-4 text-right font-medium text-gray-300">
          <Login />
        </div>
      </div>
      <div className="divide-solid"></div>
    </header>
  );
}

export default AppHeader;
