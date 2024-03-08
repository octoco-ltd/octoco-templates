// used as a way to expose a public API for everything that is usable outside the feature folder for that given feature
// if it is only used in the feature, you don't need to export it

//Components
import { Login } from './components/login'
import { Register } from './components/register'

//Utils
import { useAuth } from './hooks/useAuth'
import { persistAuth } from './utils/persistAuth'

//Providers 
//Firebase
import {
    FirebaseAuthProvider as AuthProvider,
    FirebaseAuthContext as AuthContext,
    refreshFirebaseToken as refreshToken,
    logoutFirebase as logout
} from './clients/firebase/FirebaseAuthProvider'

//Cognito uncomment when cognito is implemented
// import {
//     CognitoAuthProvider as AuthProvider,
//     CognitoAuthContext as AuthContext,
//     refreshCognitoToken as refreshToken,
//     logoutCognito as logout
// } from './clients/cognito/CognitoAuthProvider'


/**
 * @module authentication
 * This module exports the following components and functions related to authentication:
 */

/**
 * The Login component.
 * Renders the login form.
 */
export { Login };

/**
 * The Register component.
 * Renders the registration form.
 */
export { Register };

/**
 * The AuthProvider component.
 * Provides authentication context to its children.
 */
export { AuthProvider };

/**
 * The AuthContext object.
 * Contains the authentication state and methods.
 */
export { AuthContext };

/**
 * The useAuth hook.
 * A custom hook that provides access to the authentication context.
 */
export { useAuth };

/**
 * The persistAuth function.
 * Persists the authentication state to local storage.
 */
export { persistAuth };

/**
 * The refreshToken function.
 * Refreshes the authentication token.
 */
export { refreshToken };

/**
 * The logout function.
 * Logs the user out and clears the authentication state.
 */
export { logout };