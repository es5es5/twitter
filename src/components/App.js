import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase'

function App()
{
  const [init, setinit] = useState(false);
  const [userObj, setuserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setuserObj(user)
      } else {
        setuserObj(null)
      }
      setinit(true)
    })
  }, []);
  return (
    init ? <AppRouter isLoggedIn={userObj} userObj={userObj} /> : 'Initializing...'
  );
}

export default App;
