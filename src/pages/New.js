import React, { useState } from 'react'
import { send } from 'emailjs-com'
import '../App.css'

function New() {
  const [toSend, setToSend] = useState({
    name: '',
    image: '',
    about: '',
    reply_to: '',
  })

  const onSubmit = (e) => {
    e.preventDefault()
    send(
      process.env.REACT_APP_SERVICE_ID,
      process.env.REACT_APP_TEMPLATE_ID,
      toSend,
      process.env.REACT_APP_PUBLIC_KEY
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text)
    })
    .catch((err) => {
      console.log('FAILED...', err)
    })
    
  }

  const handleChange = (e) => {
    setToSend({...toSend, [e.target.name]: e.target.value})
  }

  return (
    <div>
      <form onSubmit={onSubmit} className='request-form'>
        <div className='new-location-message-container'>
          <p className='new-location-message'>New Location</p>
          <hr className='message-hr'/>
        </div>
        <input
          type='text'
          name='name'
          placeholder='Location Name'
          value={toSend.from_name}
          onChange={handleChange}
          className='request-input'
        />
        <input
          type='text'
          name='image'
          placeholder='Image(s)'
          value={toSend.to_name}
          onChange={handleChange}
          className='request-input'
        />
        <textarea
          type='text'
          name='about'
          placeholder='About Location'
          value={toSend.message}
          onChange={handleChange}
          className='request-input'
          style={{height: '60px'}}
        />
        <input
          type='text'
          name='reply_to'
          placeholder='Your email'
          value={toSend.reply_to}
          onChange={handleChange}
          className='request-input'
        />
        <button type='submit' className='request-submit'>Submit</button>
      </form>
    </div>
  )
}

export default New