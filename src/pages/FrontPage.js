import React, { useEffect, useState } from 'react'
import '../App.css'

const FrontPage = () => {
    // const [location, setLocation] = useState()
    const [search, setSearch] = useState()
    const [searched, setSearched] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        setSearched(true)
        console.log(search)
        console.log(searched)
    }

    // const getLocations = () => {
    //     fetch('https://capstone-backend-project.herokuapp.com/locations')
    //     .then(response => response.json())
    //     .then(result => setLocation(result))
    // }

    // useEffect(() => {
    //     getLocations()
    //     //eslint-disable-next-line
    // }, [])

    // console.log(setLocation)
    
    return (
    <>
    {searched ? <p>Hello world</p> : 
        <form onSubmit={handleSubmit} className='front-form'>
            <input type='text' placeholder="Search..." onChange={(e) => setSearch(e.target.value)} className='front-search-bar'/>
            <button type='submit' className='front-submit'>Search</button>
        </form>}
    </>
    )
}

export default FrontPage