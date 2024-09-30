import { ServiceType } from "@bufbuild/protobuf";
import { createPromiseClient, PromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";

const transport = createConnectTransport({
  baseUrl: "http://localhost:8080",
});

export const useClient = <T extends ServiceType>(
  service: T
): PromiseClient<T> => {
  const client = createPromiseClient(service, transport);

  return client;
};
