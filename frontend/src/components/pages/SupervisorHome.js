import React from 'react'
import useAuth from '../../hooks/useAuth'

const SupervisorHome = () => {

  const { loading}=useAuth();

  return (
    <div>
      {
        loading && <h1>LOADING .....</h1>
      }
      <h1>This is the home page of supervisor ☎️</h1>
      </div>
  )
}

export default SupervisorHome