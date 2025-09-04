
import React from 'react';
import AvatarGenerator from './components/AvatarGenerator';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center p-4">
      <Header />
      <main className="w-full max-w-4xl mx-auto flex-grow">
        <AvatarGenerator />
      </main>
      <footer className="w-full text-center p-4 mt-8 text-slate-500">
        <p>Powered by Google Gemini</p>
      </footer>
    </div>
  );
};

export default App;
