'use client';
import { Tooltip } from '@components/Tooltip/Tooltip';
import { UserContext } from 'contexts/user/UserContext';
import { useContext, useState } from 'react';
import { LoginModal } from '../LoginModal/LoginModal';

function Login() {
  const { user, logout } = useContext(UserContext);
  const [opened, setOpened] = useState(false);

  return (
    <>
      {user
        ? (
            <div className="flex items-center gap-4">
              <Tooltip
                title={(
                  <span className="text-slate-400">
                    Authentication is managed by a dedicated Go Auth microservice,
                    utilizing JWT auth strategy, with gRPC API for
                    registration/login and token refresh. It supports both
                    email/password login and biometric WebAuthn, with data securely
                    stored in a standalone PostgreSQL database.
                    <a
                      className="font-medium text-white hover:text-teal-300 focus-visible:text-teal-300"
                      rel="noreferrer noopener"
                      href="https://github.com/alexxpetrov/identia-be"
                      target="_blank"
                    >
                      {' '}
                      GitHub
                    </a>
                  </span>
                )}
              />
              <button
                className="rounded-md bg-zinc-600 px-4 font-semibold text-white hover:bg-zinc-700 focus:ring-2 focus:ring-zinc-300"
                onClick={logout}
                type="button"
              >
                Log out
              </button>
            </div>
          )
        : (
            <button
              className="rounded-md bg-zinc-600 px-4 font-semibold text-white hover:bg-zinc-700 focus:ring-2 focus:ring-zinc-300"
              onClick={() => setOpened(true)}
              type="button"
            >
              Log in
            </button>
          )}
      {opened && <LoginModal />}
    </>
  );
}

export default Login;
