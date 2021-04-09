import React from 'react';
import Logo from '../../assets/Logo';

const GlobalHeader = () => {
  return (
    <header className="bg-tdl-blue text-white px-6 md:px-0 py-3 mb-12">
      <div className="container mx-auto flex items-center">
        <Logo />
      </div>
    </header>
  );
};

export default GlobalHeader;
