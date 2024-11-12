import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cards from './Cards';
import macbook from '../assets/mbpro.jpg';
import pcase from '../assets/pcase.jpg';
import Filterbutton from './Filterbutton';
import miffy from '../assets/miffy.jpg';

const Hero = ({ showMiffyCard }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/chat');
  };

  return (
    <div className="bg-white w-screen h-screen overflow-y-auto p-4">
      <div className="flex flex-col"> 
        <div className="flex gap-6 mb-6">
          <div className="ml-20 text-4xl text-cblue font-xbold flex justify-center items-center">Filters:</div>
          <Filterbutton name="Type" color="bg-cred" textcolor="white" opt1="Electronics" opt2="Supplies" opt3="Perishable" />
          <Filterbutton name="Date" color="bg-cred" textcolor="white" opt1="To" opt2="From" />
          <Filterbutton name="Location" color="bg-cred" textcolor="white" />
          <Filterbutton name="Lost" color="bg-lightblue" textcolor="cblue" />
          <Filterbutton name="Found" color="bg-lightblue" textcolor="cblue" />
        </div>
        <div className="flex flex-wrap gap-16 justify-center">
          {showMiffyCard && (
            <Cards
              status="Lost"
              item="Miffy Plushie"
              when="November 11 2024"
              where="Harnwell"
              photo={miffy}
              onClick={handleCardClick}
            />
          )}
          <Cards 
              status="Found" 
              item="Credit card" 
              when="May 13 2021" 
              where="Harrison" 
              photo={macbook}
              onClick={handleCardClick}
          />
          <Cards 
              status="Lost" 
              item="Fountain Pen" 
              when="April 13 2020" 
              where="David Rittenhouse" 
              photo={macbook}
              onClick={handleCardClick}
          />
          <Cards 
              status="Found" 
              item="Pencil case" 
              when="April 13 2020" 
              where="David Rittenhouse" 
              photo={pcase}
              onClick={handleCardClick}
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
            item="Mouse Pad"
            when="April 13 2020"
            where="David Rittenhouse"
        />

            <Cards
            status="Lost"
            item=""
            when="April 13 2020"
            where="David Rittenhouse"
            />
        </div>
        </div>
    </div>
  );
};

export default Hero;
