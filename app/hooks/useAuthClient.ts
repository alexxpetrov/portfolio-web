import type { ServiceType } from '@bufbuild/protobuf'
import type { Client, Transport } from '@connectrpc/connect'
import { createClient } from '@connectrpc/connect'
import { createConnectTransport } from '@connectrpc/connect-web'
import { WEBAUTHN_ENDPOINT } from '../utils/config'

const transport = createConnectTransport({
  baseUrl: WEBAUTHN_ENDPOINT,
  credentials: 'include',
})

export function useAuthClient<T extends ServiceType>(service: T, trans?: Transport): Client<T> {
  const client = createClient(service, trans ?? transport)

  return client
}
