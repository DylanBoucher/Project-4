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
        //creates a review
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
        //deletes review
        updateLocations({reviews: (numOfReviews - 1)}, currentLocationId)
        deleteReview(id)
    }

    const copyToClipboard = (address) => {
        //copies address to clipboard and opens popup div
        navigator.clipboard.writeText(address)
        setPopUp(true)
        setInterval(() => {
            setPopUp(false)
        }, 10000)
    }

    const handlePopUp = () => {
        //closes popup div
        setPopUp(false)
    }

    const handleInfoClick = (e) => {
        //opens location info modal
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
            }else {
                return null
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
                
                <p className='reviews-header'><strong>Reviews:</strong>{/*<Rater total={5} rating={2} interactive={false}/>({0})*/} {e.reviews} Reviews</p>
                <hr className='reviews-hr'/>

               { allReviews.map(event => (
                    e._id === event.location ?
                        <div key={event._id}>
                            {/* Using the react-rater library to make the star icons and functionality */}
                            <p>Rating: <Rater total={5} rating={event.rating} interactive={false}/></p>
                            <p>{event.content}</p>
                            <button className='delete-review-button' onClick={() => removeReview(event._id)}><img className='trash-icon' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEX///8AAADBwcFKSkro6OjV1dVgYGCzs7P09PTb29sXFxe6urqkpKQxMTHq6ur8/PxDQ0N6enrJycmtra07Ozvh4eFSUlKBgYFvb2+bm5tfX18KCgp0dHRoaGgiIiIbGxsnJyeXl5eMjIw2NjbP/7YoAAAElklEQVR4nO2d60LiMBBGC8pNECg3L1xc5f3fcWFBU9pJ26QzncH9zl9jyNGamEymkyQAAACADqNJujl0Qjhs0slIe9h16aXbIDnHNu1pD74G4+dIvQt/xtoCFfSOjfzOPJv+Pb409jvzqq3hZdrsAXUcHrVVaEZMfmdMTqucgiYVH1kFO52ptlCeGbNgZ6ttlGfPbWhtRh2zC3Y6ttZ+AcFOR1sqy6eI4Zu2loN9mrmi7eVYChkutcV+mAsZzrXFvpkKCdpZ9gdihgNttSs7McOdttqVlZjhSlvtCj26fm9Yn9473Ym22oUhObbQfytfyV6GIiMOhd43hY6N/jnZmEzJrW/45oc0tLERJg2fgrt5gqEeMKwJDBWBYU1gqMjvN1xTQ/sI7uaD6mYtMN4c0+Vu81AOfYZR9V15NmQv86rv2i2b/ev66NnUmOK9QSxO4iRbgujT8Yn2yGsziRNcaI87gEWUofaog4gRvJ9n9EzMc8p17aAdnsMF5Q6yZQhfFnvaQw4k/J7RvayF34Svife0VpwJXy94r8fIE7EL0R5yIOGCnmN2q8REqchtn1miNpKp9qgDSGMEk6T5bdi2OMYJJkO50Ccvq/gg3H08qJGP6IW1fce08WnVcNTrjcit1Pz0lVYYkYddk/PA2ILEXeojHrh6r+SB+vgu60fAUBgYMgBDYWDIAAyFgSEDMBQGhgzAUBgYMhBlWD8cVNXSouH4kpCYVocTFpeDkn1ZaMWeYde9MmJeHlDIHFAc/EM2Z/h506zsl3Mbw/v0NbNm+JZr539S8yE8X8ahMcNi5NE3kRQj6Z4fhjHD4hWHvafXYnq058KBLUOqKX3zjEpFoYdty5CKO9J/X/m/1zN0MpEtQ6rlhmxJXrgkW5oyJLOe6egXeSdpRrU0ZUjmedFZUFRLet61b0g/e2RLclKCIQMwdMAwAwwdMGQAhg4YZoChA4YMwNABwwwwdMCQARg6YJgBhg4YMgBDBwwzwNABQwZg6IBhBhg6YMgADB0wzABDBwwZgKEDhhlg6IAhAzB0wDADDB0wZACGDhhmgKEDhgzA0AHDDL/JkM63IItb2zckc2bolLQ7zZn5/XlPZM3V+rlrdKqiLUPq9bz0S+Oot2vSScO2DJNDoeG7p9diXYID3dCYYTEP2Fe8oDjv3kcecPKVa+dPV88/0V+edtYMc4plhShva7T6BO0ZJl23mB8r3qngFsXtHb1T4cTyMqh+9YvEx/1LZ2WlcS0anpiu677cpLKlUUNGYMgADIWBIQMwFAaGDMBQGBgyAENhYMgADIWBIQMwFEbLkI63SEDGcFow/Nj322FP1ntuwVAZGMLwFosVLeOqHPuwWNEyomplCRZr5zYrG19AW6cIfYMlnmJAWps+s+FAW6hAWeA1BvIikCrk1aImvGgb5XjhFkyG2ko52AofOpbVn9oiZTHxaKjrXFr43mPfEDulZVcygsnMSoHgI/s8+gO5124d0bMFsqZsy0wkBU+LhnaB4FRgmcg7TsjqvK0wn8j7/WO2XowHbTNerOUmGAAAAAAAAAAAAAAAAPgP+AuvZmTtJsUQ8QAAAABJRU5ErkJggg==' alt='trash icon'/></button>
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
                    <p className='front-info'>Find resources dedicated to people with special needs.</p>
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