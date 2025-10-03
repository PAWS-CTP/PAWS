import { useState } from 'react'
import './App.css'

import Navbar from './components/navbar'
import Post from './components/post/post.tsx'

function App() {

  return (
    <>
      <Navbar />
      <Post 
        user="jimmy_chang"
        imageUrl='https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=662&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        caption="Hello, this is my caption"
        timestamp={10032025}
      />
    </>
  )
}

export default App
