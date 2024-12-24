import type { User, UserContextType } from 'types/user';
import { createContext } from 'react';

export const UserContext = createContext<UserContextType>({
  user: null,
  login: async () => ({} as User),
  register: () => Promise.resolve({} as User),
  logout: () => {},
  setUser: () => {},
  handleWebAuthRegister: () => Promise.resolve({} as User),
});
