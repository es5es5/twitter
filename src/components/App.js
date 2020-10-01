import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase'

function App()
{
  const [init, setinit] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const [userObj, setuserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setisLoggedIn(true)
        setuserObj(user)
      } else {
        setisLoggedIn(false)
      }
      setinit(true)
    })
  }, []);
  return (
    init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : 'Initializing...'
  );
}

export default App;
