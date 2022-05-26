import { getAuthorize } from 'fbase'
import { signOut } from 'firebase/auth'

import React from 'react'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const navigate = useNavigate();

  const onLogOutClick = () => {
    signOut(getAuthorize)
    navigate('/')
  } 

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  )
}

export default Profile