import { initializeApp } from 'firebase/app';
import {
  AuthError,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import React, { createContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'src/hooks/hooks';
import { IUserSlice } from 'src/store/user/userSlice.contracts';
import { AuthContextInterface } from '../../context/AuthContextInterface';
import { persistAuth } from '../../utils/persistAuth';
import { resetUser } from '../../utils/resetUser';
import firebaseConfig from './config/firebaseConfig';
import store from 'src/store/store';
import { fetchAndActivate, getRemoteConfig, getValue, Value } from 'firebase/remote-config';
import remoteConfigDefaults from './remoteConfigDefaults/remote_config_defaults.json';
import { env } from 'src/env';

const app = initializeApp(firebaseConfig.config);

// #region Firebase Remote Config
const remoteConfig = getRemoteConfig(app);

remoteConfig.defaultConfig = remoteConfigDefaults;

remoteConfig.settings.minimumFetchIntervalMillis = parseInt(
  env.REACT_APP_FIREBASE_REMOTE_CONFIG_FETCH_INTERVAL
);

/**
 * Fetches and activates the remote configuration.
 *
 * @remarks
 * This function should be called in the App.tsx file to fetch and activate the remote configuration.
 */
export const fetchAndActivateConfig = async () => {
  try {
    await fetchAndActivate(remoteConfig);
  } catch (error) {
    toast.error('Error fetching remote config');
  }
};

/**
 * Retrieves the configuration value for the specified feature flag key.
 * This function is used in the FeatureFlagGuard component.
 *
 * @param key - The key of the feature flag.
 * @returns The value of the feature flag.
 */
export const getConfigValue = (key: FlagKeys): Value => {
  return getValue(remoteConfig, key);
};

export type FlagKeys = keyof typeof remoteConfigDefaults;

// #region Firebase Auth
export const FirebaseAuthContext = createContext<AuthContextInterface>({
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
  authHook: undefined
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const FirebaseAuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const firebaseUser = await signInWithEmailAndPassword(auth, email, password);
      const user: IUserSlice = {
        user: firebaseUser,
        status: 'authenticated',
        accessToken: await firebaseUser.user.getIdToken(),
        refreshToken: firebaseUser.user.refreshToken,
        error: null,
      };
      dispatch(persistAuth({ userAuth: user }))
    } catch (error: any) {
      handleError(error);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      handleError(error);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      handleError(error);
    }
  };

  const logout = async () => {
    try {
      logoutFirebase()
    } catch (error: any) {
      handleError(error);
    }
  };

  const refreshToken = async () => {
    try {
      const res = await refreshFirebaseToken()
    } catch (error: any) {
      handleError(error);
    }
  };

  const getTokens = async () => {
    const currentUser = auth.currentUser;
    try {
      return {
        accessToken: await currentUser?.getIdToken(true) ?? null,
        refreshToken: currentUser?.refreshToken ?? null
      }
    } catch (error: any) {
      handleError(error);
      return null
    }
  };

  const verifyEmail = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        await sendEmailVerification(currentUser);
      } catch (error: any) {
        handleError(error);
      }
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      handleError(error);
    }
  };

  const handleError = (error: AuthError) => {
    toast.error('Error Authenticating...')
    console.log('Authentication Error:', error);
  };

  const emailVerified = true //auth.currentUser ? auth.currentUser.emailVerified : false;

  const isAuthenticated = user ? true : false

  const authHook = useAuthState

  return (
    <FirebaseAuthContext.Provider
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
        authHook
      }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export const refreshFirebaseToken = async () => {
  try {
    const auth = getAuth()
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('Cannot get new token');
    }
    return {
      accessToken: await currentUser?.getIdToken(true),
      refreshToken: currentUser?.refreshToken,
    };
  } catch (error) {
    return {
      refreshToken: null,
      accessToken: null,
    };
  }
}

export const logoutFirebase = async () => {
  const auth = getAuth()
  await signOut(auth);
  store.dispatch(resetUser())
  window.location.href = '/auth/login'
}
