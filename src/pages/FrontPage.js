import React, { useEffect, useState } from 'react'
import '../App.css'
import Modal from '../components/Modal'

const FrontPage = () => {
    const [location, setLocation] = useState()
    const [search, setSearch] = useState()
    const [searched, setSearched] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const getLocations = () => {
        fetch('https://capstone-backend-project.herokuapp.com/location')
        .then(response => response.json())
        .then(result => setLocation(result))
    }

    useEffect(() => {
        getLocations()
        //eslint-disable-next-line
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(search){
            setSearched(true)
            console.log(location)
        }else{
            alert('invalid')
        }
    }

    const handleAddReview = () => {
        console.log('adding review')
        setIsOpen(true)
    }
    
    const loadReviews = () => {
        review ? 
        review.map(e => {
            <div>
                <p>{e.rating}</p>
                <p>{e.content}</p>
            </div>
        }) : <>Loading...</>
    }

    const loaded = () => {
        return location.filter((val) => {
            if (val.name.toLowerCase().includes(search.toLowerCase())) {
                return val
            } else if (val.tags.toLowerCase().includes(search.toLowerCase())) {
                return val
            }
        }).map((e) => (
            <div key={e._id} className='locations'>
                <h3>{e.name}</h3>
                <p>Address: <a href={`https://www.google.com/maps/place/${e.address}`} className='address-link'>{e.address}</a></p>
                <p>Phone Number: {e.number}</p>
                <p>Website: <a href={`${e.website}`} >{e.website}</a></p>
                <p className='location-info'>Info: {e.about}</p>
                <p>Reviews: </p>
                {loadReviews()}
                <button onClick={handleAddReview}>Add Review</button>
            </div>
        ))
    }
    
    return (
    <>
        {searched ? 
            <div>
                <form onSubmit={handleSubmit} className='forum-form'>
                    <input type='text' placeholder="Search..." onChange={(e) => setSearch(e.target.value)} className='forum-search'/>
                    <button type='submit' className='forum-submit'>Search</button>
                </form>
                {loaded()}
            </div>: 
            <form onSubmit={handleSubmit} className='front-form'>
                <input type='text' placeholder="Search..." onChange={(e) => setSearch(e.target.value)} className='front-search-bar'/>
                <button type='submit' className='front-submit'>Search</button>
            </form>}

        <div>
          <Modal open={isOpen}>
              <div>
                  <button onClick={() => setIsOpen(false)}>Cancel</button>
                  <button onClick={handleAddReview}>Add</button>
              </div>

              <h1>New Review</h1>

              <div>
                  <input placeholder='Rating' />
                  <input placeholder='Add Review'/>
              </div>
          </Modal>
      </div>
    </>
    )
}

export default FrontPage