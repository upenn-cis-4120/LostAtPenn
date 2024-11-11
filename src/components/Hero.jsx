import React from 'react'
import Cards from './Cards'
import macbook from '../assets/mbpro.jpg'


const Hero = () => {
  return (
    <div className="bg-red-100 w-screen h-screen">
        <Cards status="Found" item="Macbook Pro 13'" when="April 13 2020" where="David Rittenhouse" photo={macbook}/>
    </div>
  )
}

export default Hero