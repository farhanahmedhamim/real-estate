import React, { useState, useEffect, createContext } from 'react';

//import data
import { housesData } from '../data'

//import context
export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {

  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState('Location (any)');
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState('Property type (any)');
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState('Price range (any)');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    // Extract all country names from houses
    const allCountries = houses.map((house) => {
      return house.country;
    });

    // Remove duplicates using Set
    const uniqueCountries = ['Location (any)', ...new Set(allCountries)];

    // Set countries array using useState hook
    setCountries(uniqueCountries);
  }, []);




  useEffect(() => {
    // Extract all country names from houses
    const allProperties = houses.map((house) => {
      return house.type;
    });

    // Remove duplicates using Set
    const uniqueProperties = ['Property type (any)', ...new Set(allProperties)];

    // Set countries array using useState hook
    setProperties(uniqueProperties);
  }, []);


  const handleClick = () => {

    //set loading 
    setLoading(true);

    //create a function that checks if the starting includes '(any)'
    const isDefault = (str) => {
      return str.split(' ').includes('(any)');
    };

    //get first value of price and parse it first
    const minPrice = parseInt(price.split(' ')[0]);

    //get second value of price whice is the maximum price & parse it to number
    const maxPrice = parseInt(price.split(' ')[2]);

    const newHouse = housesData.filter((house) => {
      const housePrice = parseInt(house.price);

      //if all value are selected
      if (house.country === country && house.type === property && housePrice >= minPrice && housePrice <= maxPrice) {
        return house;
      }

      //if all values are default
      if (isDefault(country) && isDefault(property) && isDefault(price)) {
        return house;
      }

      //is country is not default
      if (!isDefault(country) && isDefault(property) && isDefault(price)) {
        return house.country === country;
      }

      //if property is not default
      if (!isDefault(property) && isDefault(country) && isDefault(price)) {
        return house.type === property;
      }

      //if price is not default
      if (!isDefault(price) && isDefault(country) && isDefault(property)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house;
        }
      }

      //if country & property is not default
      if (!isDefault(country) && !isDefault(property) && isDefault(price)) {
        return house.country === country && house.type === property;
      }

      //if countrt and price is not defaunt
      if (!isDefault(country) && !isDefault(price) && isDefault(property)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country;
        }
      }

      //if property and price is not default
      if (!isDefault(property) && !isDefault(price) && !isDefault(country)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property;
        }
      }

    });

    setTimeout(() => {
      return (
        newHouse.length < 1 ? setHouses([]) : setHouses(newHouse), setLoading(false)
      );
    }, 1000);

  }



  return (
    <HouseContext.Provider value={{ country, setCountry, countries, property, setProperty, properties, price, setPrice, houses, loading, handleClick }}>
      {children}
    </HouseContext.Provider>
  )
};

export default HouseContextProvider;
