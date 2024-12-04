import React, { useEffect, useState } from 'react';
import Cards from './Cards';
import Filterbutton from './Filterbutton';
import ReportButton from './ReportButton';
import { database } from './firebase';
import { ref, onValue } from 'firebase/database'
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

const Hero = () => {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    const cardsRef = ref(database, 'cards');

    onValue(cardsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const cardsArray = Object.values(data);
        setCardsData(cardsArray);
      }
    });
  }, []);

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
          {/* Render cards from Firebase */}
          {cardsData.map((card, index) => (
            <Cards
              key={index}
              status={card.status}
              item={card.item}
              when={card.when}
              where={card.where}
              photo={card.photo}
              comments={card.comments}
              category={card.category}
            />
          ))}
        </div>
        {/* Add the ReportButton here */}
        <div className="flex justify-center mt-8">
          <ReportButton />
        </div>
      </div>
    </div>
  );
};

export default Hero;