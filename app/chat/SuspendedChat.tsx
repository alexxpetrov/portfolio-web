import InterceptorHoc from 'hocs/interceptorHoc';
import UserProviderWrapper from 'providers/userProvider';
import { getAccessTokenCookie } from 'utils/cookie';
import { ChatWrapper } from './components/ChatWrapper';

export const SuspendedChat = async () => {
  const accessToken = await getAccessTokenCookie();

  return (
    <UserProviderWrapper accessToken={accessToken}>
      <InterceptorHoc>
        <ChatWrapper />
      </InterceptorHoc>
    </UserProviderWrapper>
  );
};
