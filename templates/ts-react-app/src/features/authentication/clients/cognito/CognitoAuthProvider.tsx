import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'src/hooks/hooks';
import { AuthContextInterface } from '../../context/AuthContextInterface';
import { resetUser } from '../../utils/resetUser';
import { _getCognitoPool } from './actions/_getCognitoPool';
import { _getCurrentUser } from './actions/_getCurrentUser';
import { _getCognitoUserSession } from './actions/_getSession';
import { loginWithEmailAndPasswordCognito } from './actions/loginWithEmailAndPassword';
import store from 'src/store/store';
import refreshAccessToken from './actions/refreshToken';

export const CognitoAuthContext = createContext<AuthContextInterface>({
  user: null,
  loading: false,
  error: undefined,
  isAuthenticated: false,
  getTokens: () => new Promise(resolve => null),
  loginWithEmailAndPassword: (email: string, password: string) => new Promise(resolve => { }),
  loginWithGoogle: () => new Promise(resolve => { }),
  register: (email: string, password: string) => new Promise(resolve => { }),
  logout: () => new Promise(resolve => { }),
  refreshToken: () => new Promise(resolve => { }),
  verifyEmail: () => new Promise(resolve => { }),
  resetPassword: (email: string) => new Promise(resolve => { }),
  emailVerified: false,
});

const userPool = _getCognitoPool();

interface AuthProviderProps {
  children: React.ReactNode;
}

export const CognitoAuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const prep = async () => {
      const currentUser = _getCurrentUser()
      if (currentUser) {
        const session = await _getCognitoUserSession()
        if (session) {
          setUser(session.idToken.payload)
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
    try {
      prep();
    } catch (error) {
      handleError(error)
    }

  }, []);

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const user = await loginWithEmailAndPasswordCognito(email, password)
      setUser(user.user)
    } catch (error) {
      handleError(error);
    }
  };

  const loginWithGoogle = async () => {
    throw new Error('Method not Implemented');
  };

  const logout = async () => {
    logoutCognito()
    setUser(null);

  };

  const register = async (email: string, password: string) => {
    throw new Error('Method not Implemented');
  };

  const refreshToken = async () => {
    throw new Error('Method not Implemented');
  };

  const getTokens = async () => {
    const currentUser = _getCurrentUser()
    if (currentUser) {
      const session = await _getCognitoUserSession()
      return {
        accessToken: session.idToken.jwtToken ?? null,
        refreshToken: session.refreshToken.token ?? null
      }
    } else {
      setLoading(false);
      handleError(error);
      return null;
    }
  };

  const verifyEmail = async () => {
    throw new Error('Method not Implemented');
  };

  const resetPassword = async (email: string) => {
    throw new Error('Method not Implemented');
  };

  const handleError = (error: any) => {
    // Handle and display the error
    toast.error('Error Authenticating...');
    console.log('Authentication Error:', error);
  };

  const isAuthenticated = !!user;

  const emailVerified = true //TODO

  return (
    <CognitoAuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        error,
        getTokens,
        loginWithEmailAndPassword,
        loginWithGoogle,
        register,
        logout,
        refreshToken,
        verifyEmail,
        resetPassword,
        emailVerified,
      }}
    >
      {children}
    </CognitoAuthContext.Provider>
  );
};


export const refreshCognitoToken = async () => {
  return await refreshAccessToken()
}

export const logoutCognito = async () => {
  const currentUser = _getCurrentUser()
  if (currentUser) {
    await currentUser.signOut();
    store.dispatch(resetUser())
  }
  window.location.href = '/auth/login'
}