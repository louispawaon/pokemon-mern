import { createContext, useState, ReactNode } from 'react';

export interface AuthContextType {
  isLoggedIn: boolean;
  token: string|null;
  login: (token:string) => void;
  logout: () => void;
  register: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const login = (token:string) => {
    setIsLoggedIn(true);
    setToken(token)
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(null)
  };

  const register = () => {
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, register, token }}>
      {children}
    </AuthContext.Provider>
  );
};