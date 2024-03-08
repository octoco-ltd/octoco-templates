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
import store from 'src/store/store';
import { IUserSlice } from 'src/store/user/userSlice.contracts';
import { AuthContextInterface } from '../../context/AuthContextInterface';
import { persistAuth } from '../../utils/persistAuth';
import { resetUser } from '../../utils/resetUser';
import firebaseConfig from './config/firebaseConfig';

const app = initializeApp(firebaseConfig.config);

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

/**
 * Firebase Authentication Provider component.
 * Provides authentication functionality using Firebase.
 */
export const FirebaseAuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  /**
   * Logs in a user with email and password.
   * @param email - The user's email.
   * @param password - The user's password.
   */
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

  /**
   * Logs in a user with Google.
   */
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      handleError(error);
    }
  };

  /**
   * Registers a new user with email and password.
   * @param email - The user's email.
   * @param password - The user's password.
   */
  const register = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      handleError(error);
    }
  };

  /**
   * Logs out the current user.
   */
  const logout = async () => {
    try {
      logoutFirebase()
    } catch (error: any) {
      handleError(error);
    }
  };

  /**
   * Refreshes the Firebase token.
   */
  const refreshToken = async () => {
    try {
      const res = await refreshFirebaseToken()
    } catch (error: any) {
      handleError(error);
    }
  };

  /**
   * Gets the access token and refresh token of the current user.
   * @returns An object containing the access token and refresh token.
   */
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

  /**
   * Sends a verification email to the current user.
   */
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

  /**
   * Sends a password reset email to the specified email address.
   * @param email - The email address to send the password reset email to.
   */
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      handleError(error);
    }
  };

  /**
   * Handles authentication errors.
   * @param error - The authentication error.
   */
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
