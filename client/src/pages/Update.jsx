import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Update() {

  const [book, setBook] = useState({
    title : "",
    desc : "",
    price : null,
    
  })

  const navigate = useNavigate()
  const location = useLocation()

  const bookId = location.pathname.split("/")[2]
  console.log(bookId);

  const handleChange = (event) => {
    setBook(prev => ({...prev, [event.target.name] : event.target.value}))
  }

  const handleClick = async event => {
    event.preventDefault()
    try{
      await axios.put("http://localhost:3000/books/"+ bookId, book)
      navigate("/")
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className='form'>
      <h1>Update Book</h1>
      <input type="text" placeholder='title' onChange={handleChange}  name="title"/>
      <input type="text" placeholder='desc' onChange={handleChange} name="desc"/>
      <input type="number" placeholder='price' onChange={handleChange}  name="price"/>
      <button className='formButton' onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update