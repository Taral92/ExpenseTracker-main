import React from 'react'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <div>
        <Link to={'/'}>
        <img className='w-15 rounded-md' src="./src/assets/x.jpg" alt="" />
        </Link>

    </div>
  )
}

export default Logo