import React, { useEffect, useState } from 'react'
import '../App.css'
import Modal from '../components/Modal'

const FrontPage = (props) => {
    const [search, setSearch] = useState()
    const [searched, setSearched] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [reviews, setReviews] = useState({rating: '', content: '', location: ''})
    const { location, createNewReview } = props

    const handleSubmit = (e) => {
        //only lets you search if the search bar has a value
        e.preventDefault()
        if(search){
            setSearched(true)
            console.log(location)
        }else{
            alert('invalid')
        }
    }

    const handleAddReview = async (event) => {
       event.preventDefault()
       console.log(reviews)
       createNewReview(reviews)
       setReviews({
           rating: '',
           content: '',
           location: ''
       })
       //close the modal
       setIsOpen(false)
    }

    const openReviewModal =() => {
        //opens the modal
        setIsOpen(true)
    }

    const loaded = () => {
        //filters the location state to only map the data that matches the search results
        return location.filter((val) => {
            //Checks to see if the words in the search bar match the name of a location
            if (val.name.toLowerCase().includes(search.toLowerCase())) {
                return val
            //Checks to see if the words in the search bar match any of the tags on a location
            } else if (val.tags.toLowerCase().includes(search.toLowerCase())) {
                return val
            }
        }).map((e) => (
            <div key={e._id} className='locations'>
                <h3>{e.name}</h3>
                {/* Links the address to google maps */}
                <p>Address: <a href={`https://www.google.com/maps/place/${e.address}`} className='address-link'>{e.address}</a></p>
                <p>Phone Number: {e.number}</p>
                {/* Links to the location website */}
                <p>Website: <a href={`${e.website}`} >{e.website}</a></p>
                <p className='location-info'>Info: {e.about}</p>
                <p>Reviews: </p>
                {/* Opens a modal so you can add a review */}
                <button onClick={openReviewModal}>Add Review</button>
            </div>
        ))
    }
    
    return (
    <>
    {/* if you have clicked the search button with a value in the search bar it will show the search bar at the top of the page and the search results below it, else just the search bar with be visible */}
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
                {/* closes the modal */}
                <button onClick={() => setIsOpen(false)}>Cancel</button>
                {/* opens the modal */}
                <button onClick={handleAddReview}>Add</button>
            </div>

            <h1>New Review</h1>

            <div>
                {/* adds the value of each of the inputs to the reviews state */}
                <input type='number' min='1' max='5' placeholder='Rating' onChange={(e) => setReviews({...reviews, rating: e.target.value})}/>
                <input placeholder='Add Review' onChange={(e) => setReviews({...reviews, content: e.target.value})}/>
                <input placeholder='location id' onChange={(e) => setReviews({...reviews, location: e.target.value})}/>
            </div>
        </Modal>
      </div>
    </>
    )
}

export default FrontPage