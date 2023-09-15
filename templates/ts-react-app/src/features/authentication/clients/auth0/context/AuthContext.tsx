// AuthContext.tsx
import React, { createContext, useContext } from 'react';
import { AuthService } from 'src/features/authentication/services/AuthenticationService';
// import { AuthService } from '../services/AuthenticationService';

// Create the Auth0Context
const Auth0Context = createContext<AuthService | undefined>(undefined);

// Export the Auth0Context
export const useAuth = () => {
  const context = useContext(Auth0Context);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  authService: AuthService;
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ authService, children }) => {
  return <Auth0Context.Provider value={authService}>{children}</Auth0Context.Provider>;
};

export { AuthProvider, Auth0Context };