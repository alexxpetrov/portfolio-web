import { createConnectTransport } from "@connectrpc/connect-web";
import { UserInfoService } from "@gen/app/user/v1/user_connect";
import { useClient } from "dashboard/hooks/useAuthClient";
import dayjs from "dayjs";

const transport = createConnectTransport({
  baseUrl: "http://localhost:4600",
  credentials: "include",
});

export const CLASSIC_DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm';


export const useUserService = () => {
  const client = useClient(UserInfoService, transport);

  const getUserInfo = async ({ userId }: {userId: string}) => {
    const data = await client.getUserInfo({
      userId
    });

    return {
      loginTimestamp: data.loginTimestamp ? dayjs(data.loginTimestamp).format(CLASSIC_DATE_TIME_FORMAT) : null,
      registerTimestamp: data.registerTimestamp ? dayjs(data.registerTimestamp).format(CLASSIC_DATE_TIME_FORMAT) : null,
      joinedRoomId: data.joinedRoomId,
      leftRoomId: data.leftRoomId,
      lastMessage: data.lastMessage,
      lastMessageRoomId: data.lastMessageRoomId,
    };
  };

  return { getUserInfo, };
};
