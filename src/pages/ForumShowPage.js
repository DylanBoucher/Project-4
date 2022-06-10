import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import Rater from 'react-rater'

function ForumShowPage(props) {
    const { id } = useParams()
    const { allForums, allReviews, deleteReview, createNewReview }  = props
    const forum = allForums ? allForums.find(f => f._id === id) : null
    const [reviews, setReviews] = useState({rating: '', content: '', location: ''})
    const [write, setWrite] = useState(false)
    const [count, setCount] = useState(0)

    const removeReview = (id) => {
        setCount(count - 1)
        deleteReview(id)
    }

    const handleAddReview = async (e) => {
        e.preventDefault()
        createNewReview(reviews)
        setCount(count + 1)
        setReviews({
            rating: '',
            content: '',
            location: ''
        })
    }
    
  return (
    <>
    {forum ? 
    <div className='forum-show-container'>
        <h1 className='forum-show-header'>{forum.name}</h1>
        <p className='forum-show-about'>{forum.about}</p>
        <button className='forum-show-website'>
            <a href={`${forum.website}`} 
                target='noreferrer noopener'>Website</a>
        </button>
    </div>: <p>Loading...</p>}

    <p className='reviews-header'><strong>Reviews:</strong><Rater total={5} rating={2} interactive={false}/>({0}) {count} Reviews</p>
    <hr/>

    {!write ? <button className='write-review-button forum-write-btn' onClick={() => setWrite(true)}>Write a Review</button> : null}

    <div className={write ? 'new-review-input-container' : 'hide'}>
        {/* Using the react-rater library to make the star icons and functionality */}
        <Rater total={5} onRate={(e) => setReviews({...reviews, rating: e.rating})} className='new-review-stars'/>
        <textarea placeholder='Add Review ...' value={reviews.content} onChange={(e) => setReviews({...reviews, content: e.target.value})} className='forum-show-textarea'/>
        
        <div className='new-review-button-container'>
            <button onClick={() => setWrite(false)}>Close</button>
            <button type='submit' onClick={handleAddReview} onMouseEnter={() => setReviews({...reviews, location: forum._id})}>Post</button>
        </div>
    </div>

    { allReviews ? allReviews.map(event => (
        forum._id === event.location ?
            <div key={event._id}>
                {/* Using the react-rater library to make the star icons and functionality */}
                <p>Rating: <Rater total={5} rating={event.rating} interactive={false}/></p>
                <p>{event.content}</p>
                <button className='delete-review-button' onClick={() => removeReview(event._id)} >Delete</button>
                <hr/>
            </div>
        : null
    )) : null}

     {!count ? <p className='forum-show-p'>No Reviews</p>: null}
    </>
  )
}

export default ForumShowPage