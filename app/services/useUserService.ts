import type { GetInfoResponse } from '@gen/protobuff/user/v1/user_pb';
import { useQuery } from '@connectrpc/connect-query';
import { UserInfoService } from '@gen/protobuff/user/v1/user_pb';
import { formatLogDate } from 'chat/utils/utils';
import { useUserContext } from 'hooks/useUserContext';

export function useUserService() {
  const { user } = useUserContext();
  const { data } = useQuery(UserInfoService.method.getUserInfo, { userId: user!.id }, { enabled: !!user, placeholderData: {} as GetInfoResponse, refetchInterval: 5000 });

  if (!data) {
    return {} as GetInfoResponse;
  }

  return {
    loginTimestamp: data.loginTimestamp ? formatLogDate(data.loginTimestamp) : null,
    registerTimestamp: data.registerTimestamp ? formatLogDate(data.registerTimestamp) : null,
    joinedRoomId: data.joinedRoomId,
    leftRoomId: data.leftRoomId,
    lastMessage: data.lastMessage,
    lastMessageRoomId: data.lastMessageRoomId,
  };
}
