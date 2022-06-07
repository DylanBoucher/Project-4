import React, { useState, useEffect } from 'react'
import '../App.css'

function Groups() {
  const [forumSearch, setForumSearch] = useState()
  const [allForums, setAllForums] = useState()
  const getForums = () => {
    fetch('https://capstone-backend-project.herokuapp.com/forums')
    .then(response => response.json())
    .then(result => setAllForums(result))
}

useEffect(() => {
  getForums()
  //eslint-disable-next-line
}, [])

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
        <div key={element._id}>
            <h3>{element.name}</h3>
            <p>{element.about}</p>
        </div>
      )) 
      : allForums ? allForums.map(e => (
            <div key={e._id}>
                <h3>{e.name}</h3>
                <p>{e.about}</p>
            </div>
          )): <>Loading...</>
    )
  }

  return (
      <div>
        <div>
          <form onSubmit={handleSubmit} className='forum-form'>
            <input type='text' placeholder='Search...' onChange={(e) => setForumSearch(e.target.value)} className='forum-search'/>
            <button type='submit' className='forum-submit'>Search</button>
          </form>
        </div>
        {loaded()}
    </div>
  )
}

export default Groups