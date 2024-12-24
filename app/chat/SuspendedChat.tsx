import { RoomsProvider } from 'contexts/rooms/RoomsProvider';
import InterceptorHoc from 'hocs/interceptorHoc';
import UserProviderWrapper from 'providers/userProvider';
import { getAccessTokenCookie } from 'utils/cookie';
import { ChatWrapper } from './components/ChatWrapper';

export const SuspendedChat = async () => {
  const accessToken = await getAccessTokenCookie();

  return (
    <UserProviderWrapper accessToken={accessToken}>
      <RoomsProvider>
        <InterceptorHoc>
          <ChatWrapper />
        </InterceptorHoc>
      </RoomsProvider>
    </UserProviderWrapper>
  );
};
