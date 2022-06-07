// import React, {useState} from 'react'
// import Modal from './Modal'

// function AddReviewModal(props) {
//     const {location, review, setReview} = props
//     const [isOpen, setIsOpen] = useState(false)

//     const handleAddReview =() => {
//         console.log('add')
//     }

//   return (
//       <div>
//           <Modal open={isOpen}>
//               <div>
//                   <button onClick={() => setIsOpen(false)}>Cancel</button>
//                   <button onClick={handleAddReview}>Add</button>
//               </div>

//               <h1>New Review</h1>

//               <div>
//                   <input placeholder='Rating' value={review.rating} onChange={(e) => setReview({...review, rating: e.target.value})}/>
//                   <input placeholder='Add Review' value={review.content} onChange={(e) => setReview({...review, content: e.target.value})}/>
//               </div>
//           </Modal>
//       </div>
    
//   )
// }

// export default AddReviewModal