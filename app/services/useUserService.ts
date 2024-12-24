import { createConnectTransport } from '@connectrpc/connect-web';
import { UserInfoService } from '@gen/protobuff/user/v1/user_pb';
import { formatLogDate } from 'chat/utils/utils';
import { useAuthClient } from 'hooks/useAuthClient';
import { useUserContext } from 'hooks/useUserContext';
import { config } from 'utils/config';

const transport = createConnectTransport({
  baseUrl: config.CHAT_GRPC_ENDPOINT,
  fetch: (input, init) => fetch(input, { ...init, credentials: 'include' }),
});

export function useUserService() {
  const { user } = useUserContext();
  const client = useAuthClient(UserInfoService, transport);
  // const { data } = useQuery(UserInfoService.method.getUserInfo, { userId: user!.id }, { refetchInterval: 5000, enabled: !!user, placeholderData: {} as GetInfoResponse });

  const getUserInfo = async () => {
    const data = await client.getUserInfo({
      userId: user?.id,
    });

    return {
      loginTimestamp: data.loginTimestamp ? formatLogDate(data.loginTimestamp) : null,
      registerTimestamp: data.registerTimestamp ? formatLogDate(data.registerTimestamp) : null,
      joinedRoomId: data.joinedRoomId,
      leftRoomId: data.leftRoomId,
      lastMessage: data.lastMessage,
      lastMessageRoomId: data.lastMessageRoomId,
    };
  };

  return { getUserInfo };
}

// export function useUserService() {
//   const { user } = useUserContext();
//   const { data } = useQuery(UserInfoService.method.getUserInfo, { userId: user!.id }, { refetchInterval: 5000, enabled: !!user, placeholderData: {} as GetInfoResponse });

//   if (!data) {
//     return { data: {} as GetInfoResponse };
//   }

//   return {
//     loginTimestamp: data.loginTimestamp ? formatLogDate(data.loginTimestamp) : null,
//     registerTimestamp: data.registerTimestamp ? formatLogDate(data.registerTimestamp) : null,
//     joinedRoomId: data.joinedRoomId,
//     leftRoomId: data.leftRoomId,
//     lastMessage: data.lastMessage,
//     lastMessageRoomId: data.lastMessageRoomId,
//   };
// }
