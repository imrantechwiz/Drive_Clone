import './App.css';
import Header from './components/header'
import Sidebar from './components/sidebar'
import FilesView from './components/filesView/FilesView'
import SideIcons from './components/sideIcons'

import DriveLogo from './media/ok.png'

import { auth, provider } from "./firebase";
import { useState } from 'react';

function App() {
  // const [user, setUser] = useState()
  const [user, setUser] = useState({
    displayName: "Imran Khan",
    email: "imran.techwiz@gmail.com",
    emailVerified: true,
    phoneNumber: null,
    photoURL: "https://img-premium.flaticon.com/png/512/5192/premium/5192938.png?token=exp=1628276657~hmac=4da11371ab64fd940bc4cbddb1e8fde1"
  })

  const handleLogin = () => {
    if (!user) {
      auth.signInWithPopup(provider).then((result) => {
        setUser(result.user)
        console.log(result.user)
      }).catch((error) => {
        alert(error.message);
      });
    } else if (user) {
      auth.signOut().then(() => {
        setUser(null)
      }).catch((err) => alert(err.message))
    }
  }

  return (
    <div className="app">
      {
        user ? (
          <>
            <Header userPhoto={user.photoURL} />
            <div className="app__main">
              <Sidebar />
              <FilesView />
              {/* <SideIcons /> */}
            </div>
          </>
        ) : (
            <div className='app__login'>
              <img src={DriveLogo} alt="Google Drive" />
              <button onClick={handleLogin}>Log in to Google Drive</button>
            </div>
          )
      }
    </div>
  );
}

export default App;
