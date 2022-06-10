import React, { useState, useEffect } from 'react'
import About from '../pages/About'
import { Routes, Route } from 'react-router-dom'
import FrontPage from '../pages/FrontPage'
import New from '../pages/New'
import Groups from '../pages/Groups'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ForumShowPage from '../pages/ForumShowPage'

const Main = () => {
  const [location, setLocation] = useState()
  const [allReviews, setAllReviews] = useState()
  const [allForums, setAllForums] = useState()

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

  const getForums = () => {
    fetch('https://capstone-backend-project.herokuapp.com/forums')
    .then(response => response.json())
    .then(result => setAllForums(result))
  }

  useEffect(() => {
      //grab the locations, reviews, and forums from the database
      getForums()
      getLocations()
      getReviews()
      //eslint-disable-next-line
  }, [])

  const createNewReview = async (event) => {
    // make post request to create reviews
    await fetch('https://capstone-backend-project.herokuapp.com/reviews/', {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
    })
    // update list of reviews
    getReviews()
  }

  const deleteReview = async (id) => {
    // make delete request to delete people
    await fetch('https://capstone-backend-project.herokuapp.com/reviews/' + id, {
      method: "delete"
    })
    // update list of reviews
    getReviews()
  }

  const updateForums = async (forum, id) => {
    //make request to create forum
    await fetch('https://capstone-backend-project.herokuapp.com/forums/' + id, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(forum)
    })
    // update list of forums
    getForums()
  }

  return (
    <main>
        <Routes>
            <Route path='/' element={<FrontPage  location={location} createNewReview={createNewReview} allReviews={allReviews} deleteReview={deleteReview}/>}/>
            <Route path='groups/' element={<Groups allForums={allForums} setAllForums={setAllForums} />}/>
            <Route path='about/' element={<About />} />
            <Route path='new/' element={<New />} />
            <Route path='groups/:id' element={<ForumShowPage allForums={allForums} allReviews={allReviews} deleteReview={deleteReview} createNewReview={createNewReview} updateForums={updateForums}/>}/>
            <Route path='login/' element={<Login/>}/>
            <Route path='register/' element={<Register/>}/>
        </Routes>
    </main>
  )
}

export default Main