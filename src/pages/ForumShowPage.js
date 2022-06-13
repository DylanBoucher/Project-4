import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import Rater from 'react-rater'
import Footer from '../components/Footer'

function ForumShowPage(props) {
    const { id } = useParams()
    const { allForums, allReviews, deleteReview, createNewReview, updateForums }  = props
    const forum = allForums ? allForums.find(f => f._id === id) : null
    const [reviews, setReviews] = useState({rating: '', content: '', location: ''})
    const [write, setWrite] = useState(false)

    const removeReview = (_id) => {
        updateForums({reviews: (forum.reviews - 1)}, id)
        deleteReview(_id)
    }

    const handleAddReview = async (e) => {
        e.preventDefault()
        updateForums({reviews: (forum.reviews + 1)}, id)
        createNewReview(reviews)
        setReviews({
            rating: '',
            content: '',
            location: ''
        })
    }
    
  return (
    <>
    <img className='show-page-image' src='https://www.westonct.gov/home/showpublishedimage/906/637281481834430000' alt='people holding hands'/>
    <div className='forum-show-page-container'>
        {forum ? 
        <div className='forum-show-container'>
            <h1 className='forum-show-header'>{forum.name}</h1>
            <p className='forum-show-about'>{forum.about}</p>
            <button className='forum-show-website'>
                <a href={`${forum.website}`} 
                    target='noreferrer noopener'>Website</a>
            </button>
        
        <p className='reviews-header forum-show-reviews-head'><strong>Reviews:</strong>{/*<Rater total={5} rating={2} interactive={false}/>({0})*/} {forum.reviews} Reviews</p>
        <hr/>
        </div>: <p>Loading...</p>}

        {!write ? <button className='write-review-button forum-write-btn' onClick={() => setWrite(true)}>Write a Review</button> : null}
        
        <div className={write ? 'new-review-input-container forum-show-input-container' : 'hide'}>
            {/* Using the react-rater library to make the star icons and functionality */}
            <Rater total={5} onRate={(e) => setReviews({...reviews, rating: e.rating})} className='new-review-stars'/>
            <textarea placeholder='Add Review ...' value={reviews.content} onChange={(e) => setReviews({...reviews, content: e.target.value})} className='forum-show-textarea'/>
            
            <div className='forum-show-new-btn'>
                <button onClick={() => setWrite(false)} className='forum-show-close'>Close</button>
                <button type='submit' onClick={handleAddReview} onMouseEnter={() => setReviews({...reviews, location: forum._id})}>Post</button>
            </div>
            <hr/>
        </div>

        {/* {!forum.reviews ? <p className='no-reviews'>No Reviews</p> : null} */}

        { allReviews ? allReviews.map(event => (
            forum._id === event.location ?
                <div key={event._id} className='forum-show-reviews'>
                    {/* Using the react-rater library to make the star icons and functionality */}
                    <p>Rating: <Rater total={5} rating={event.rating} interactive={false}/></p>
                    <p>{event.content}</p>
                    <button className='delete-review-button' onClick={() => removeReview(event._id)}><img className='trash-icon' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEX///8AAADBwcFKSkro6OjV1dVgYGCzs7P09PTb29sXFxe6urqkpKQxMTHq6ur8/PxDQ0N6enrJycmtra07Ozvh4eFSUlKBgYFvb2+bm5tfX18KCgp0dHRoaGgiIiIbGxsnJyeXl5eMjIw2NjbP/7YoAAAElklEQVR4nO2d60LiMBBGC8pNECg3L1xc5f3fcWFBU9pJ26QzncH9zl9jyNGamEymkyQAAACADqNJujl0Qjhs0slIe9h16aXbIDnHNu1pD74G4+dIvQt/xtoCFfSOjfzOPJv+Pb409jvzqq3hZdrsAXUcHrVVaEZMfmdMTqucgiYVH1kFO52ptlCeGbNgZ6ttlGfPbWhtRh2zC3Y6ttZ+AcFOR1sqy6eI4Zu2loN9mrmi7eVYChkutcV+mAsZzrXFvpkKCdpZ9gdihgNttSs7McOdttqVlZjhSlvtCj26fm9Yn9473Ym22oUhObbQfytfyV6GIiMOhd43hY6N/jnZmEzJrW/45oc0tLERJg2fgrt5gqEeMKwJDBWBYU1gqMjvN1xTQ/sI7uaD6mYtMN4c0+Vu81AOfYZR9V15NmQv86rv2i2b/ev66NnUmOK9QSxO4iRbgujT8Yn2yGsziRNcaI87gEWUofaog4gRvJ9n9EzMc8p17aAdnsMF5Q6yZQhfFnvaQw4k/J7RvayF34Svife0VpwJXy94r8fIE7EL0R5yIOGCnmN2q8REqchtn1miNpKp9qgDSGMEk6T5bdi2OMYJJkO50Ccvq/gg3H08qJGP6IW1fce08WnVcNTrjcit1Pz0lVYYkYddk/PA2ILEXeojHrh6r+SB+vgu60fAUBgYMgBDYWDIAAyFgSEDMBQGhgzAUBgYMhBlWD8cVNXSouH4kpCYVocTFpeDkn1ZaMWeYde9MmJeHlDIHFAc/EM2Z/h506zsl3Mbw/v0NbNm+JZr539S8yE8X8ahMcNi5NE3kRQj6Z4fhjHD4hWHvafXYnq058KBLUOqKX3zjEpFoYdty5CKO9J/X/m/1zN0MpEtQ6rlhmxJXrgkW5oyJLOe6egXeSdpRrU0ZUjmedFZUFRLet61b0g/e2RLclKCIQMwdMAwAwwdMGQAhg4YZoChA4YMwNABwwwwdMCQARg6YJgBhg4YMgBDBwwzwNABQwZg6IBhBhg6YMgADB0wzABDBwwZgKEDhhlg6IAhAzB0wDADDB0wZACGDhhmgKEDhgzA0AHDDL/JkM63IItb2zckc2bolLQ7zZn5/XlPZM3V+rlrdKqiLUPq9bz0S+Oot2vSScO2DJNDoeG7p9diXYID3dCYYTEP2Fe8oDjv3kcecPKVa+dPV88/0V+edtYMc4plhShva7T6BO0ZJl23mB8r3qngFsXtHb1T4cTyMqh+9YvEx/1LZ2WlcS0anpiu677cpLKlUUNGYMgADIWBIQMwFAaGDMBQGBgyAENhYMgADIWBIQMwFEbLkI63SEDGcFow/Nj322FP1ntuwVAZGMLwFosVLeOqHPuwWNEyomplCRZr5zYrG19AW6cIfYMlnmJAWps+s+FAW6hAWeA1BvIikCrk1aImvGgb5XjhFkyG2ko52AofOpbVn9oiZTHxaKjrXFr43mPfEDulZVcygsnMSoHgI/s8+gO5124d0bMFsqZsy0wkBU+LhnaB4FRgmcg7TsjqvK0wn8j7/WO2XowHbTNerOUmGAAAAAAAAAAAAAAAAPgP+AuvZmTtJsUQ8QAAAABJRU5ErkJggg==' alt='trash icon'/></button>
                    <hr/>
                </div>
            : null
        )) : null}
    </div>
    <Footer/>
    </>
  )
}

export default ForumShowPage