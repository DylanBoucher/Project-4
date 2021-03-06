import React, { useState } from 'react'
import { send } from 'emailjs-com'
import '../App.scss'
import Footer from '../components/Footer'

function New() {
  const [toSend, setToSend] = useState({
    name: '',
    address: '',
    about: '',
    reply_to: '',
  })

  const onSubmit = (e) => {
    e.preventDefault()
    send(
      'service_jkzvj1e',
      'template_afgn72p',
      toSend,
      'mB83yE9tPQpeOaavU'
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
        <label htmlFor='name'>Name:</label>
        <input
          id='name'
          type='text'
          name='name'
          placeholder='Location Name'
          value={toSend.from_name}
          onChange={handleChange}
          className='request-input'
        />
        <label htmlFor='address'>Address:</label>
        <input
          type='text'
          id='address'
          name='address'
          placeholder='Address'
          value={toSend.to_name}
          onChange={handleChange}
          className='request-input'
        />
        <label htmlFor='about'>About:</label>
        <textarea
          id='about'
          type='text'
          name='about'
          placeholder='About Location'
          value={toSend.message}
          onChange={handleChange}
          className='request-input'
          style={{height: '60px'}}
        />
        <label htmlFor='email'>Email:</label>
        <input
          id='email'
          type='text'
          name='reply_to'
          placeholder='Your email'
          value={toSend.reply_to}
          onChange={handleChange}
          className='request-input'
        />
        <button type='submit' className='request-submit'>Submit</button>
      </form>
      <Footer/>
    </div>
  )
}

export default New