/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  token: string|null;
  login: (token:string) => void;
  logout: () => void;
  register: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const login = (token:string) => {
    setIsLoggedIn(true);
    setToken(token)
    console.log(token)
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
