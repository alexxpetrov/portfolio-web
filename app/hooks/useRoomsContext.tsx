import { RoomsContext } from 'contexts/rooms/RoomsContext';
import { useContext } from 'react';

// Custom hook to use the UserContext
export function useRoomsContext() {
  const context = useContext(RoomsContext);
  if (!context) {
    throw new Error('useRoomsContext must be used within a UserProvider');
  }
  return context;
}
