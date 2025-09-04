
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full text-center p-6 mb-6">
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 text-transparent bg-clip-text">
        Nerdy Avatar Generator
      </h1>
      <p className="text-slate-400 mt-2 text-lg">
        Creëer je perfecte nerdy profielfoto met AI
      </p>
    </header>
  );
};

export default Header;
