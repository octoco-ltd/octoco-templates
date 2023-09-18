// AuthContext.tsx
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import React, { createContext, useContext } from 'react';
import { IAuthProvider, IAuthService } from 'src/features/authentication/services/authInterface';
import { Auth0AuthService } from '../Auth0AuthService';
import { auth0Config } from '../config/authConfig';

// Create the Auth0Context
const Auth0Context = createContext<{ service: IAuthService, provider: IAuthProvider } | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

const Auth0ContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user: clientUser, isAuthenticated, loginWithRedirect: login, logout, isLoading, error, } = useAuth0()
  const auth0Service = new Auth0AuthService()

  const getUser = () => {
    // Implement
  }

  const isEmailVerified = clientUser?.email_verified ?? false

  const test = {
    clientUser,
    isAuthenticated,
    login,
    logout,
    isLoading,
    getUser,
    error,
    isEmailVerified
  }

  return (
    <Auth0Provider {...auth0Config}>
      <Auth0Context.Provider value={{ service: auth0Service, provider: test }}>
        {children}
      </Auth0Context.Provider>
    </Auth0Provider >
  );
};

export { Auth0Context, Auth0ContextProvider };
