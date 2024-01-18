import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { FirebaseAppProvider } from 'reactfire';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const firebaseConfig = {
  apiKey: "AIzaSyCh3R39SGN418tR6qP92aWwnTV3pqyqtjI",
  authDomain: "testing-platform-f7204.firebaseapp.com",
  projectId: "testing-platform-f7204",
  storageBucket: "testing-platform-f7204.appspot.com",
  messagingSenderId: "304758276724",
  appId: "1:304758276724:web:3bd77ad5759ff6c2ea0721",
  measurementId: "G-3JE3V5B41V"
};

root.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
