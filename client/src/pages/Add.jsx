import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Add() {

  const [book, setBook] = useState({
    title : "",
    desc : "",
    price : null,
    
  })

  const navigate = useNavigate()


  const handleChange = (event) => {
    setBook(prev => ({...prev, [event.target.name] : event.target.value}))
  }

  const handleClick = async event => {
    event.preventDefault()
    try{
      await axios.post("http://localhost:3000/books", book)
      navigate("/")
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className='form'>
      <h1>Add New Book</h1>
      <input type="text" placeholder='title' onChange={handleChange}  name="title"/>
      <input type="text" placeholder='desc' onChange={handleChange} name="desc"/>
      <input type="number" placeholder='price' onChange={handleChange}  name="price"/>
      <button className='formButton' onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add