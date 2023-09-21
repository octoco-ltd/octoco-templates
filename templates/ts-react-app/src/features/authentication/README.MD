# Authentication Feature

## Introduction

The authentication feature in our React TypeScript (TS) application is designed to provide flexible authentication solutions for various identity providers. This documentation outlines the available authentication providers and how to use them in your application. Additionally, it introduces the `useAuth` hook and provides information on the exported React components.

All components used externally are to be exported from `index.ts` within the feature, and should only be imported from there. `src/features/authentication`


The Auth Feature folder follows the following format:

```
├── authentication/
│   ├── clients/
│   │   │── firebase
│   │   │   │── actions/
│   │   │   │── config/
│   │   │   │── <Provider>.tsx
│   │   │── ...
│   ├── utils/
│   ├── reducers/
│   ├── hooks/
│   ├── context/
│   ├── components/
│   │   │── Component1/
│   │   │── Component2/
│   ├── ...
│   └── index.ts
```

## Authentication Providers
Providers include:
- Firebase (WIP)
- Cognito (WIP)
- Auth0 (WIP)
- KeyCloak (TODO)

#### Provider Methods and Variables

 - `user`: Client User and details as from firebase etc
 - `loading`: Whether the auth is loading
 - `error`: Error defined in auth process
 - `isAuthenticated`: Whether the current user is authenticated
 - `emailVerified`: Whether the user's email is verified
 - `getTokens()`: Get the access and refresh token for current user
 - `loginWithEmailAndPassword(email, password)`: Login with and email and password with client
 - `loginWithGoogle()`: Login with Google with client
 - `register()`: Register a new user with client
 - `logout()`: Logout from application
 - `refreshToken()`: Refresh the current users access token
 - `verifyEmail()`: send a email verification
 - `resetPassword()`: Reset password flow
 - `authHook()?`: An optional hook if provided by the client

### FirebaseAuthProvider (WIP)

The `FirebaseAuthProvider` allows you to integrate Firebase Authentication into your React TS application. Firebase offers authentication through various methods, such as email/password, social media logins, and more.

### CognitoAuthProvider (WIP)

The `CognitoAuthProvider` enables integration with Amazon Cognito, a robust identity provider service from AWS. You can configure user pools and identity pools for secure user authentication.

### Auth0AuthProvider (WIP)
The `Auth0AuthProvider` facilitates integration with Auth0, a popular identity and access management platform. Auth0 supports various authentication methods, including social logins, multi-factor authentication, and more.

### KeyCloakAuthProvider (TODO)
The `KeyCloakAuthProvider` allows integration with KeyCloak, an open-source identity and access management solution. KeyCloak provides features like single sign-on (SSO), role-based access control, and more.

**Example Usage:**

```tsx
import { FirebaseAuthProvider } from 'src/features/authentication';

// Wrap your application with the FirebaseAuthProvider component in your App.tsx file.
function App() {
  return (
    // FirebaseAuthProvider | CognitoAuthProvider | Auth0AuthProvider | KeyCloakAuthProvider
    <FirebaseAuthProvider> 
      {/* Your app components */}
    </FirebaseAuthProvider>
  );
}
```

## useAuth Hook
The useAuth hook simplifies the process of accessing authentication methods and user data from the selected provider. You can use this hook within your components to interact with the authentication system.

**Example Usage:**

```tsx
import { useAuth } from 'src/features/authentication';

function ProfileComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Please log in to access your profile.</p>
          <button onClick={login}>Login</button>
        </div>
      )}
    </div>
  );
}
```

## Exported Components
### Login and Register Components
Our authentication feature provides pre-built login and register components that you can easily incorporate into your application. These components are designed for a seamless user authentication experience.