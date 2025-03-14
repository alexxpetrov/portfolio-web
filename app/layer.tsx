'use client';
import type { ReactNode } from 'react';
import { TransportProvider } from '@connectrpc/connect-query';
import { createConnectTransport } from '@connectrpc/connect-web';
import { Provider } from 'react-redux';
import { config } from 'utils/config';
import { store } from './store/store.index';

const transport = createConnectTransport({
  baseUrl: config.CHAT_GRPC_ENDPOINT,
  fetch: (input, init) => fetch(input, { ...init, credentials: 'include' }),
  useHttpGet: true,
});

function AppLayout({ children }: { children: ReactNode }) {
  return (
    <TransportProvider transport={transport}>
      <Provider store={store}>
        <div className="bg-slate-900 leading-relaxed text-slate-400 selection:bg-teal-300 selection:text-teal-900">
          {children}
        </div>
      </Provider>
    </TransportProvider>
  );
}

export default AppLayout;
