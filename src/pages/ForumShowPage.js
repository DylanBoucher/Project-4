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
                    <button className='delete-review-button' onClick={() => removeReview(event._id)} >Delete</button>
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