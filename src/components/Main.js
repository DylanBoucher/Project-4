import React from 'react'
import About from '../pages/About'
import { Routes, Route } from 'react-router-dom'
import FrontPage from '../pages/FrontPage'
import New from '../pages/New'
import Groups from '../pages/Groups'

const Main = () => {
  return (
    <main>
        <Routes>
            <Route path='/' element={<FrontPage />}/>
            <Route path='about/' element={<About />} />
            <Route path='new/' element={<New />} />
            <Route path='groups/' element={<Groups/>} />
        </Routes>
    </main>
  )
}

export default Main