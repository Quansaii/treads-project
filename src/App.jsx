import { useState } from 'react'
import { Posts } from './Components/Posts'
import { AddPostButton } from './Components/AddPostButton'

import './App.css'

function App() {

  return (
    <>
      <div className="container">
          <Posts/>
      </div>

      <AddPostButton/>
    </>
  )
}

export default App
