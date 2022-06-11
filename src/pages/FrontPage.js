import React, { useState } from 'react'
import '../App.scss'
import Modal from '../components/Modal'
import InfoModal from '../components/InfoModal'
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.scss'
import Footer from '../components/Footer'

const FrontPage = (props) => {
    const { location, createNewReview, allReviews, deleteReview, updateLocations } = props

    const [search, setSearch] = useState()
    const [searched, setSearched] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [reviews, setReviews] = useState({rating: '', content: '', location: ''})
    const [currentLocationId, setCurrentLocationId] = useState()
    const [errMsg, setErrMsg] = useState('')
    const [numOfReviews, setNumOfReviews] = useState(0)
    const [popUp, setPopUp] = useState(false)
    const [openInfo, setOpenInfo] = useState(false)
    const [info, setInfo] = useState('')

    const handleSubmit = (e) => {
        //only lets you search if the search bar has a value
        e.preventDefault()
        if(search){
            setSearched(true)
            setErrMsg('')
        }else{
            setErrMsg('Invalid Search Terms')
            setInterval(() => {
                setErrMsg('')
            }, 10000)
        }
    }

    const handleAddReview = async (e) => {
        e.preventDefault()
        createNewReview(reviews)
        updateLocations({reviews: (numOfReviews + 1)}, currentLocationId)
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

    const removeReview = (id) => {
        updateLocations({reviews: (numOfReviews - 1)}, currentLocationId)
        deleteReview(id)
    }

    const copyToClipboard = (address) => {
        navigator.clipboard.writeText(address)
        setPopUp(true)
        setInterval(() => {
            setPopUp(false)
        }, 10000)
    }

    const handlePopUp = () => {
        setPopUp(false)
    }

    const handleInfoClick = (e) => {
        setInfo(e)
        setOpenInfo(true)
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
            <div key={e._id} className='locations' onMouseEnter={() => {setCurrentLocationId(e._id); setNumOfReviews(e.reviews)}}>
                <h3 className='location-name'>{e.name}</h3>
                <hr className='reviews-hr'/>
                <div className='location-content'>
                    <div className='location-buttons'>
                        {/* Links the address to google maps */}
                        <button>
                            <a href={`https://www.google.com/maps/dir//${e.address}`} className='address-link' target='noreferrer noopener'>Directions</a>
                        </button>
                        {/* Links to the location website */}
                        <button>
                            <a href={`${e.website}`} 
                            target='noreferrer noopener'>Website</a>
                        </button>
                    </div>
                    <p>{e.address} <button className='copy-address-button' onClick={() => copyToClipboard(e.address)}><img src='https://www.gstatic.com/images/icons/material/system_gm/1x/content_copy_gm_grey_18dp.png' alt='clipboard icon'/></button></p>
                    <p><strong>Phone Number:</strong> {e.number}</p>
                    <p className='clamp location-info'><strong>Info:</strong> {e.about}</p>
                    <button className='more-btn' onClick={() => handleInfoClick(e.about)}>more...</button>
                </div>
                <InfoModal open={openInfo}>
                    <div className='info-modal'>
                        <button onClick={() => setOpenInfo(false)} className='info-modal-x'>X</button>
                        <h1>Info</h1>
                        <p>{info}</p>
                    </div>
                </InfoModal>
                
                <p className='reviews-header'><strong>Reviews:</strong><Rater total={5} rating={2} interactive={false}/>({0}) {e.reviews} Reviews</p>
                <hr className='reviews-hr'/>

               { allReviews.map(event => (
                    e._id === event.location ?
                        <div key={event._id}>
                            {/* Using the react-rater library to make the star icons and functionality */}
                            <p>Rating: <Rater total={5} rating={event.rating} interactive={false}/></p>
                            <p>{event.content}</p>
                            <button className='delete-review-button' onClick={() => removeReview(event._id)} >Delete</button>
                            <hr/>
                        </div>
                    : null
                ))}
                
                {/* Opens a modal so you can add a review and sets the current location id into a state variable */}
                <button className='write-review-button' onMouseEnter={() => setCurrentLocationId(e._id)} onClick={openReviewModal}>Write a Review</button>
            </div>
        ))
    }
    
    return (
    <>
    {/* if you have clicked the search button with a value in the search bar it will show the search bar at the top of the page and the search results below it, else just the search bar with be visible */}
        {searched ? 
            <div className='searched-content'>
                <form onSubmit={handleSubmit} className='unsearch-front-form'>
                    <input type='text' placeholder="Search..." onChange={(e) => setSearch(e.target.value)} className='forum-search'/>
                    <button type='submit' className='forum-submit'>Search</button>
                </form>
                <div className={errMsg ? 'error-msg-container' : 'hide'}>
                    <p className='front-error-msg'>{errMsg}</p>
                </div>
                {loaded()}
            </div>:
            <div>
               <form onSubmit={handleSubmit} className='front-form'>
                    <input type='text' placeholder="Search..." onChange={(e) => setSearch(e.target.value)} className='front-search-bar'/>
                    <button type='submit' className='front-submit'>Search</button>
                </form>

                <div className={errMsg ? 'error-msg-container' : 'hide'}>
                    <p className='front-error-msg'>{errMsg}</p>
                </div>

                <div>
                    <p className='about-info'>Find resources dedicated to people with special needs.</p>
                    <hr className='about-'/>
                    <div className='about-content'>
                        <p>"All kids need is a little help, a little hope, and someone who believes in them."</p>
                        <p>- Magic Johnson.</p>
                    </div>
                </div>
            </div>
            }

            <Footer/>
            
        <div>
        <Modal open={isOpen}>
            <div className='new-review-button-container'>
                {/* closes the modal */}
                <button onClick={() => setIsOpen(false)}>Cancel</button>
                {/* opens the modal */}
                <button type='submit' onClick={handleAddReview} onMouseEnter={() => setReviews({...reviews, location: currentLocationId})}>Post</button>
            </div>

            <h1 className='new-review-header'>New Review</h1>
            <hr/>

            <div className='new-review-input-container'>
                {/* adds the value of each of the inputs to the reviews state */}
                {/* Using the react-rater library to make the star icons and functionality */}
                <Rater total={5} onRate={(e) => setReviews({...reviews, rating: e.rating})} className='new-review-stars'/>
                <textarea placeholder='Add Review ...' onChange={(e) => setReviews({...reviews, content: e.target.value})} className='new-review-textarea'/>
                {/* <input className='review-id' placeholder={currentLocationId} onChange={(e) => setReviews({...reviews, location: e.target.value})}/> */}
            </div>
        </Modal>
      </div>
      <div className={popUp ? 'popup' : 'hide'}>
            
            <p className='popup-message'>Copied to Clipboard<button onClick={handlePopUp} className='popup-x'>X</button> </p>
      </div>
    </>
    )
}

export default FrontPage