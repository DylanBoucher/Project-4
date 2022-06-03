import React, { useState } from 'react'


const FrontPage = () => {
    const [search, setSearch] = useState()
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(search)
    }
    return (
    <>
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder="City, State" onChange={(e) => setSearch(e.target.value)}/>
            <button type='submit'>Search</button>
        </form>
    </>
    )
}

export default FrontPage