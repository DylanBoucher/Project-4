import React, { useState, useEffect } from 'react'
import About from '../pages/About'
import { Routes, Route } from 'react-router-dom'
import FrontPage from '../pages/FrontPage'
import New from '../pages/New'
import Groups from '../pages/Groups'
import Login from '../pages/Login'
import Register from '../pages/Register'

const Main = () => {
  const [location, setLocation] = useState()
  const [allReviews, setAllReviews] = useState()
  const getLocations = () => {
    //grabs locations from the database
    fetch('https://capstone-backend-project.herokuapp.com/location')
    .then(response => response.json())
    .then(result => setLocation(result))
  }

  const getReviews = () => {
      //grabs reviews from the database
      fetch('https://capstone-backend-project.herokuapp.com/reviews')
      .then(response => response.json())
      .then(result => setAllReviews(result))
  }

  useEffect(() => {
      //grab the locations and reviews from the database
      getLocations()
      getReviews()
      //eslint-disable-next-line
  }, [])

  const createNewReview = async (event) => {
    // make post request to create reviews
    await fetch('https://capstone-backend-project.herokuapp.com/reviews', {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
    })
    // update list of reviews
    getReviews()
    console.log(allReviews)
  }

  return (
    <main>
        <Routes>
            <Route path='/' element={<FrontPage  location={location} createNewReview={createNewReview} allReviews={allReviews}/>}/>
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