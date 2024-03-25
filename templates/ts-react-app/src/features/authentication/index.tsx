// used as a way to expose a public API for everything that is usable outside the feature folder for that given feature
// if it is only used in the feature, you don't need to export it

//Components
import { Login } from './components/login'
import { Register } from './components/register'

//Utils
import { useAuth } from './hooks/useAuth'

//Providers 
//Firebase
import {
    FirebaseAuthProvider as AuthProvider,
    FirebaseAuthContext as AuthContext,
    refreshFirebaseToken as refreshToken,
    logoutFirebase as logout
} from './clients/firebase/FirebaseAuthProvider'

//Cognito
// import {
//     CognitoAuthProvider as AuthProvider,
//     CognitoAuthContext as AuthContext,
//     refreshCognitoToken as refreshToken,
//     logoutCognito as logout
// } from './clients/cognito/CognitoAuthProvider'


export { Login, Register, AuthProvider, AuthContext, useAuth, refreshToken, logout }