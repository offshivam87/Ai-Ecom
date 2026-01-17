import React from 'react'
import { Route } from 'react-router-dom'
import Nav from './Routes/Nav'
import NavigationBar from './NavigationBar/NavigationBar'

const App = () => {
  return (
    <div>
      <NavigationBar />
      <div>
        <Nav />
      </div>    
    </div>
  )
}

export default App
