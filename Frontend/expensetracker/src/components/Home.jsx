import React from 'react'
import Navbar from './Navbar'
import Logo from './shared/Logo'
import Createexpense from './Createexpense'

const Home = () => {

  return (
    
    <div>
      <div>
      <Navbar/>
      </div>
      <div className='py-3 mx-5'>
        <Createexpense/>
      </div>
    </div>
  )
}

export default Home