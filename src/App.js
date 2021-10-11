import './App.css';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from "firebase/auth";

import initializeAuthentication from './Firebase/Firebase.initalize';
import { useState } from 'react';

initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();


function App() {
  const [user, setUser] = useState({})
  const auth = getAuth();

  const handleGoogleSingIN = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(loggedInUser);
      })
  }

  const handleGitHubSingIn = () => {
    signInWithPopup(auth, gitHubProvider)
      .then(result => {
        const { displayName, photoURL, email } = result.user;
        const loggedInUser = {
          name: displayName,
          photo: photoURL,
          email: email
        }
        setUser(loggedInUser);
      })
  }

  const handleSingOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
  }
  return (
    <div className="App">
      {!user.name ?
        <div>
          <button onClick={handleGoogleSingIN}>Google Sing In</button>
          <button onClick={handleGitHubSingIn}>Github Sing In</button>
        </div> :
        <button onClick={handleSingOut}>Sing Out</button>
      }
      <br />
      {
        user.name && <div>
          <h2>Welcome {user.name}</h2>
          <p>I know your emali address {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
