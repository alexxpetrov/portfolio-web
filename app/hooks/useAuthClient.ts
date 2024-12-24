import type { GenService } from '@bufbuild/protobuf/codegenv1';
import type { Client, Transport } from '@connectrpc/connect';
import { createClient } from '@connectrpc/connect';
import { createConnectTransport } from '@connectrpc/connect-web';
import { config } from '../utils/config';

const transport = createConnectTransport({
  baseUrl: config.WEBAUTHN_ENDPOINT,
  fetch: (input, init) => fetch(input, { ...init, credentials: 'include' }),
  useBinaryFormat: false,
  useHttpGet: true,
});

export function useAuthClient<T extends GenService<any>>(service: T, trans?: Transport): Client<T> {
  const client = createClient(service, trans ?? transport);

  return client;
}
