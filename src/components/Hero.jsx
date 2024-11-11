import React from 'react';
import Cards from './Cards';
import macbook from '../assets/mbpro.jpg';

const Hero = () => {
  return (
    <div className="bg-white w-screen h-screen overflow-y-auto p-4 flex flex-wrap gap-16 justify-center">
      <Cards 
        status="Found" 
        item="Macbook Pro 13'" 
        when="April 13 2020" 
        where="David Rittenhouse" 
        photo={macbook}
      />
      <Cards 
        status="Found" 
        item="Macbook Pro 13'" 
        when="April 13 2020" 
        where="David Rittenhouse" 
        photo={macbook}
      />
      <Cards 
        status="Found" 
        item="Macbook Pro 13'" 
        when="April 13 2020" 
        where="David Rittenhouse" 
        photo={macbook}
      />
      <Cards 
        status="Found" 
        item="Macbook Pro 13'" 
        when="April 13 2020" 
        where="David Rittenhouse" 
        photo={macbook}
      />
      <Cards 
        status="Found" 
        item="Macbook Pro 13'" 
        when="April 13 2020" 
        where="David Rittenhouse"
      />
      <Cards 
        status="Found" 
        item="Macbook Pro 13'" 
        when="April 13 2020" 
        where="David Rittenhouse" 
        photo={macbook}
      />
      <Cards
        status="Lost"
        item=""
        when="April 13 2020"
        where="David Rittenhouse"
      />
    </div>
  );
};

export default Hero;
