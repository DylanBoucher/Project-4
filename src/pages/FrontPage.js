import React, { useState } from 'react'
import '../App.css'

const FrontPage = () => {
    const [search, setSearch] = useState()
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(search)
    }
    return (
    <>
        <form onSubmit={handleSubmit} className='front-form'>
            <input type='text' placeholder="Search..." onChange={(e) => setSearch(e.target.value)} className='front-search-bar'/>
            <button type='submit' className='front-submit'>Search</button>
        </form>
    </>
    )
}

export default FrontPage