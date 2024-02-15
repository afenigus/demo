 import React from 'react'
import { Link } from 'react-router-dom'
 
 function Signup() {
   return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <form action=''>
          <div className='mb-3'>
            <label htmlFor="Email">Name</label>
            <input type='text' placeholder='Enter Name' className='form-control rounded-0'/>
          </div>
          <div className='mb-3'>
            <label htmlFor="Email">Email</label>
            <input type='email' placeholder='Enter Email' className='form-control rounded-0'/>
          </div>
          <div className='mb-3'>
            <label htmlFor="Password">Password</label>
            <input type='Password' placeholder='Enter Password ' className='form-control rounded-0'/>
          </div>
          <button className='btn btn-success w-100 rounded-0'>Signup</button>
          <p >if you have account</p>
            </form>
          <Link to="/"  className='btn btn-defualt border w-100 bg-secondary rounded-0 text-decoration-none'>Login</Link>
            
      </div>
    </div>
   )
 }
 
 export default Signup