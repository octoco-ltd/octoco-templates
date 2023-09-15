// AuthContext.tsx
import React, { createContext, useContext } from 'react';
import { IAuthProvider, IAuthService } from '../services/authInterface';

interface AuthContextProps {
  authService: IAuthService
  authProvider: IAuthProvider
}

// Create the Auth0Context
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  AuthProvider: any;
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ AuthProvider, children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};

export { AuthProvider, AuthContext };


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider!');
  }
  return context;
};