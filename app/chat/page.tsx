import { Suspense } from 'react';
import { SuspendedChat } from './SuspendedChat';

export default async function ChatPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuspendedChat />
    </Suspense>
  );
}
