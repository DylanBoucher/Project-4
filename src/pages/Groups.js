import React, {useState} from 'react'
import '../App.css'

function Groups() {
  const [forumSearch, setForumSearch] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(forumSearch)
  }
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className='forum-form'>
          <input type='text' placeholder='Search...' onChange={(e) => setForumSearch(e.target.value)} className='forum-search'/>
          <button type='submit' className='forum-submit'>Search</button>
        </form>
      </div>
      <div>
        <h3>Forum Name</h3>
        <p>Some info about the forum</p>
        <hr/>
        <h3>Forum Name</h3>
        <p>Some info about the forum</p>
        <hr/>
        <h3>Forum Name</h3>
        <p>Some info about the forum</p>
        <hr/>
        <h3>Forum Name</h3>
        <p>Some info about the forum</p>
        <hr/>
        
        <h3>Forum Name</h3>
        <p>Some info about the forum</p>
        <hr/>
        <h3>Forum Name</h3>
        <p>Some info about the forum</p>
        <hr/>
        <h3>Forum Name</h3>
        <p>Some info about the forum</p>
        <hr/>
        <h3>Forum Name</h3>
        <p>Some info about the forum</p>
        <hr/>
      </div>
    </div>
  )
}

export default Groups