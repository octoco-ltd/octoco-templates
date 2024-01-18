import React from 'react';
import logo from './logo.svg';
import './App.css';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { FirestoreProvider, useFirebaseApp, useFirestore, useFirestoreDocData } from 'reactfire';

function BurritoTaste() {
  // access the Firestore library
  const burritoRef = doc(useFirestore(), 'tryreactfire', 'burrito');

  // subscribe to a document for realtime updates. just one line!
  const { status, data } = useFirestoreDocData(burritoRef);


  const toggleYummy = async () => {
    // Update the document with the new value of yummy
    await updateDoc(burritoRef, {
      yummy: !data.yummy,
    });
  };

  // check the loading status
  if (status === 'loading') {
    return <p>Fetching burrito flavor...</p>;
  }

  return (
    <div>
      <p>The burrito is {data.yummy ? 'good' : 'bad'}!</p>
      <button onClick={toggleYummy}>Toggle Yummy</button>
    </div>
  );
}

function App() {
  const firestoreInstance = getFirestore(useFirebaseApp());

  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <h1>🌯</h1>
      <BurritoTaste />
      {/* <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div> */}
    </FirestoreProvider>

  );
}

export default App;
