import { ServiceType } from "@bufbuild/protobuf";
import { createPromiseClient, PromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { WEBAUTHN_ENDPOINT } from "../utils/config";

const transport = createConnectTransport({
  baseUrl: WEBAUTHN_ENDPOINT,
});

export const useClient = <T extends ServiceType>(
  service: T
): PromiseClient<T> => {
  const client = createPromiseClient(service, transport);

  return client;
};
