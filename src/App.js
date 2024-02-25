import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/home'
import Content from './components/content'
import Navbar from './components/navbar'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/content' element={<Content/>}/>
      </Routes>
    </div>
  )
}

export default App