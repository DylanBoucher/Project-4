import React, { useEffect, useState } from 'react'
import '../App.css'

const FrontPage = () => {
    const [location, setLocation] = useState()
    const [search, setSearch] = useState()
    const [searched, setSearched] = useState(false)

    const getLocations = () => {
        fetch('https://capstone-backend-project.herokuapp.com/location')
        .then(response => response.json())
        .then(result => setLocation(result))
    }

    useEffect(() => {
        getLocations()
        //eslint-disable-next-line
    }, [])

    const handleSubmit = (e) => {
            e.preventDefault()
            console.log(search)
            console.log(location)
            setSearched(true)
    }

    const loaded = () => {
        return location.filter((val) => {
            if (val.name.toLowerCase().includes(search.toLowerCase())) {
                return val
            } else if (val.tags.toLowerCase().includes(search.toLowerCase())) {
                return val
            }
        }).map((e) => (
            <div key={e._id} className='locations'>
                <h3>{e.name}</h3>
                <p>Address: <a href={`https://www.google.com/maps/place/${e.address}`} className='address-link'>{e.address}</a></p>
                <p>Phone Number: {e.number}</p>
                <p>Info: {e.about}</p>
            </div>
        ))
    }
    
    return (
    <>
        {searched ? 
            <div>
                <form onSubmit={handleSubmit} className='forum-form'>
                    <input type='text' placeholder="Search..." onChange={(e) => setSearch(e.target.value)} className='forum-search'/>
                    <button type='submit' className='forum-submit'>Search</button>
                </form>
                {loaded()}
            </div>: 
            <form onSubmit={handleSubmit} className='front-form'>
                <input type='text' placeholder="Search..." onChange={(e) => setSearch(e.target.value)} className='front-search-bar'/>
                <button type='submit' className='front-submit'>Search</button>
            </form>}
    </>
    )
}

export default FrontPage