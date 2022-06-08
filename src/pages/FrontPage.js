import React, { useState } from 'react'
import '../App.css'
import Modal from '../components/Modal'
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'

const FrontPage = (props) => {
    const [search, setSearch] = useState()
    const [searched, setSearched] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [reviews, setReviews] = useState({rating: '', content: '', location: ''})
    const { location, createNewReview, allReviews, deleteReview } = props
    const [currentLocationId, setCurrentLocationId] = useState()

    const handleSubmit = (e) => {
        //only lets you search if the search bar has a value
        e.preventDefault()
        if(search){
            setSearched(true)
        }else{
            alert('invalid')
        }
    }

    const handleAddReview = async (e) => {
        e.preventDefault()
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
        // console.log(currentLocationId)
    }

    const removeReview = (id) => {
        deleteReview(id)
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
                <p>Website: <a href={`${e.website}`}>{e.website}</a></p>
                <p className='location-info'>Info: {e.about}</p>
                <p>Reviews: <Rater total={5} rating={2} interactive={false}/>({0}) [] Reviews</p>

               { allReviews.map(event => (
                    e._id === event.location ?
                        <div key={event._id}>
                            {/* Using the react-rater library to make the star icons and functionality */}
                            <p>Rating: <Rater total={5} rating={event.rating} interactive={false}/></p>
                            <p>{event.content}</p>
                            <button onClick={() => removeReview(event._id)} >Delete Review</button>
                            <hr/>
                        </div>
                    : null
                ))}
                
                {/* Opens a modal so you can add a review and sets the current location id into a state variable */}
                <button onMouseEnter={() => setCurrentLocationId(e._id)} onClick={openReviewModal}>Add Review</button>
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
                <button type='submit' onClick={handleAddReview} onMouseEnter={() => setReviews({...reviews, location: currentLocationId})}>Add</button>
            </div>

            <h1>New Review</h1>

            <div>
                {/* adds the value of each of the inputs to the reviews state */}
                {/* Using the react-rater library to make the star icons and functionality */}
                <Rater total={5} onRate={(e) => setReviews({...reviews, rating: e.rating})}/>
                <input placeholder='Add Review' onChange={(e) => setReviews({...reviews, content: e.target.value})}/>
                {/* <input className='review-id' placeholder={currentLocationId} onChange={(e) => setReviews({...reviews, location: e.target.value})}/> */}
            </div>
        </Modal>
      </div>
    </>
    )
}

export default FrontPage