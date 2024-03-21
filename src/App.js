import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Importing necessary modules from react-router-dom

// Importing components
import Header from './components/Header'; // Importing Header component
import Footer from './components/Footer'; // Importing Footer component

// Importing pages
import Home from './pages/Home'; // Importing Home page component
import PropertyDetails from './pages/PropertyDetails'; // Importing PropertyDetails page component

// App component definition
const App = () => {
  return (
    <div className='max-w-[1440px] mx-auto bg-white'>
      {/* Header component */}
      <Header />

      {/* Router setup using Routes component */}
      <Routes>
        {/* Route for the home page */}
        <Route path='/' element={<Home />} />

        {/* Route for displaying property details, using a dynamic route parameter :id */}
        <Route path='/property/:id' element={<PropertyDetails />} />
      </Routes>

      {/* Footer component */}
      <Footer />
    </div>
  );
};

export default App; // Exporting the App component as the default export
