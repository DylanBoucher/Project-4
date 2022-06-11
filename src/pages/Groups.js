import React, { useState, useEffect } from 'react'
import '../App.scss'
import Footer from '../components/Footer'

function Groups(props) {
  const [forumSearch, setForumSearch] = useState()
  const { allForums, setAllForums } = props

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const loaded = () => {
    return(
      forumSearch ? 
      allForums.filter((value) => {
        if (value.name.toLowerCase().includes(forumSearch.toLowerCase())) {
          return value
        }else if (value.tags.toLowerCase().includes(forumSearch.toLowerCase())) {
          return value
        }
      }).map((element) => (
        <div key={element._id} className='forums-content-container'>
          <a href={`/groups/${element._id}`}>
            <h3>{element.name}</h3>
            <p>{element.about}</p>
          </a>
            
        </div>
      )) 
      : allForums ? allForums.map(e => (
        <div key={e._id} className='forums-content-container'>
          <a href={`/groups/${e._id}`}>
            <h3>{e.name}</h3>
            <p>{e.about}</p>
          </a>
        </div>
          )): <>Loading...</>
    )
  }

  return (
    <>
      <div className='forums-content'>
      <div className='forums-content-sub'>
        <form onSubmit={handleSubmit} className='forum-form'>
          <input type='text' placeholder='Search...' onChange={(e) => setForumSearch(e.target.value)} className='forum-search'/>
          <button type='submit' className='forum-submit'>Search</button>
        </form>
      </div>
      {loaded()}
    </div>
    <Footer/>
    </>
   
  )
}

export default Groups