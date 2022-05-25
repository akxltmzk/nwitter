import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";


function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    onAuthStateChanged(getAuth(),(user)=>{
      user ? setIsLoggedIn(true) : setIsLoggedIn(false)
      setInit(true)
    })
  },[])

  
  return(
    <>
      {init ? <AppRouter isLoggedIn = {isLoggedIn}/> : "Initializing..."} 
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  )
}

export default App;
