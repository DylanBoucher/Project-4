import React from 'react'
import About from '../pages/About'
import { Routes, Route } from 'react-router-dom'
import FrontPage from '../pages/FrontPage'
import New from '../pages/New'
import Groups from '../pages/Groups'
import Login from '../pages/Login'
import Register from '../pages/Register'

const Main = () => {
  return (
    <main>
        <Routes>
            <Route path='/' element={<FrontPage />}/>
            <Route path='about/' element={<About />} />
            <Route path='new/' element={<New />} />
            <Route path='groups/' element={<Groups/>} />
            <Route path='login/' element={<Login/>}/>
            <Route path='register/' element={<Register/>}/>
        </Routes>
    </main>
  )
}

export default Main