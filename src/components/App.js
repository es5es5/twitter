import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase'

function App()
{
  const [init, setinit] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false)
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setisLoggedIn(true)
      } else {
        setisLoggedIn(false)
      }
      setinit(true)
    })
  }, []);
  return (
    init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'Initializing...'
  );
}

export default App;
