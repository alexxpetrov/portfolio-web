'use client';

import type { ReactNode } from 'react';
import { TransportProvider } from '@connectrpc/connect-query';
import { createConnectTransport } from '@connectrpc/connect-web';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { CHAT_GRPC_ENDPOINT } from 'utils/config';
import { store } from './store/store.index';

const queryClient = new QueryClient();

function AppLayout({ children }: { children: ReactNode }) {
  const transport = createConnectTransport({
    baseUrl: CHAT_GRPC_ENDPOINT,
    fetch: (input, init) => fetch(input, { ...init, credentials: 'include' }),
  });

  return (
    <TransportProvider transport={transport}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <div className="bg-slate-900 leading-relaxed text-slate-400 selection:bg-teal-300 selection:text-teal-900">
            {children}
          </div>
        </Provider>
      </QueryClientProvider>
    </TransportProvider>
  );
}

export default AppLayout;
