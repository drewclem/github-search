import React from 'react';
import Logo from '../../assets/Logo';

const GlobalHeader = () => {
  const clearSearch = () => {
    console.log('Search cleared');
  };

  return (
    <header className="bg-tdl-blue text-white py-3 mb-12">
      <div className="container mx-auto flex justify-between">
        <Logo />

        <button className="bg-tdl-red px-3 py-1" type="button" onClick={clearSearch}>
          Clear Search
        </button>
      </div>
    </header>
  );
};

export default GlobalHeader;
