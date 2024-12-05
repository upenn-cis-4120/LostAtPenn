import React, { useEffect, useState } from 'react';
import Cards from './Cards';
import StatusFilter from './StatusFilter';
import ReportButton from './ReportButton';
import LocationFilter from './LocationFilter';
import TypeFilter from './TypeFilter';
import DateFilter from './DateFilter';
import { database } from './firebase';
import { ref, onValue } from 'firebase/database';

const Hero = () => {
  const [cardsData, setCardsData] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [activeLocations, setActiveLocations] = useState([]);
  const [activeTypes, setActiveTypes] = useState([]);
  const [activeDateRange, setActiveDateRange] = useState({ start: '', end: '' });
  const [activeStatus, setActiveStatus] = useState('');
  useEffect(() => {
    const cardsRef = ref(database, 'cards');
    onValue(cardsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const cardsArray = Object.entries(data)
          .map(([key, value]) => ({
            id: key,
            ...value,
          }))
          .reverse();
        setCardsData(cardsArray);
        setFilteredCards(cardsArray);
      }
    });
  }, []);

  const handleStatusFilter = (status) => {
    if (activeStatus === status) {
      setActiveStatus('');
      applyAllFilters(activeTypes, activeLocations, activeDateRange, '');
    } else {
      setActiveStatus(status);
      applyAllFilters(activeTypes, activeLocations, activeDateRange, status);
    }
  };

  const handleTypeFilter = (selectedTypes) => {
    setActiveTypes(selectedTypes);
    applyAllFilters(selectedTypes, activeLocations, activeDateRange, activeStatus);
  };

  const handleLocationFilter = (selectedLocations) => {
    setActiveLocations(selectedLocations);
    applyAllFilters(activeTypes, selectedLocations, activeDateRange, activeStatus);
  };

  const handleDateFilter = (dateRange) => {
    setActiveDateRange(dateRange);
    applyAllFilters(activeTypes, activeLocations, dateRange, activeStatus);
  };

  const applyAllFilters = (types, locations, dateRange, status) => {
    let filtered = cardsData;
    
    if (types.length > 0) {
      filtered = filtered.filter(card => 
        types.some(type => card.category?.toLowerCase() === type.toLowerCase())
      );
    }
    
    if (locations.length > 0) {
      filtered = filtered.filter(card => 
        locations.some(location => 
          card.where?.toLowerCase().includes(location.toLowerCase())
        )
      );
    }
    
    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter(card => {
        const cardDate = new Date(card.when);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        endDate.setHours(23, 59, 59);
        
        return cardDate >= startDate && cardDate <= endDate;
      });
    }

    if (status) {
      filtered = filtered.filter(card => card.status === status);
    }
    
    setFilteredCards(filtered);
  };


  return (
    <div className="bg-white w-screen h-screen overflow-y-auto p-4">
      <div className="flex flex-col">
        <div className="flex gap-6 mb-6">
          <div className="ml-20 text-4xl text-cblue font-xbold flex justify-center items-center">
            Filters:
          </div>
          <TypeFilter onFilterChange={handleTypeFilter} />
          <DateFilter onFilterChange={handleDateFilter} />
          <LocationFilter onFilterChange={handleLocationFilter} />
          <StatusFilter 
            status="Lost"
            isActive={activeStatus === 'Lost'}
            onFilterChange={handleStatusFilter}
          />
          <StatusFilter 
            status="Found"
            isActive={activeStatus === 'Found'}
            onFilterChange={handleStatusFilter}
          />
        </div>

        <div className="flex flex-wrap gap-16 justify-center">
          {filteredCards.map((card) => (
            <Cards
              key={card.id}
              status={card.status}
              item={card.item}
              when={card.when}
              where={card.where}
              photo={card.photo}
              comments={card.comments}
              category={card.category}
              email={card.email}
            />
          ))}
          {filteredCards.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              No items found for the selected location(s)
            </div>
          )}
        </div>

        <div className="flex justify-center mt-8">
          <ReportButton />
        </div>
      </div>
    </div>
  );
};

export default Hero;