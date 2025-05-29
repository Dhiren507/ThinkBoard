import React, { useState } from 'react';
import { PlusIcon, FilePlusIcon, SparklesIcon, XIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col-reverse items-end gap-3 z-50">
      {/* Sub-actions that appear when the main FAB is clicked */}
      {isOpen && (
        <>
          <div className="flex flex-col gap-3 mb-2 items-end">
            <Link
              to="/create"
              className="group flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <span className="bg-base-100 py-1 px-3 rounded-lg shadow-md text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                New Note
              </span>
              <button className="btn btn-primary btn-circle shadow-lg">
                <FilePlusIcon size={18} />
              </button>
            </Link>
            
            <Link
              to="/thinkmate"
              className="group flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <span className="bg-base-100 py-1 px-3 rounded-lg shadow-md text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                ThinkMate
              </span>
              <button className="btn btn-secondary btn-circle shadow-lg">
                <SparklesIcon size={18} />
              </button>
            </Link>
          </div>
          
          {/* Backdrop for closing */}
          <div 
            className="fixed inset-0 bg-black/5 backdrop-blur-[1px] -z-10"
            onClick={toggleMenu}
          />
        </>
      )}
      
      {/* Main floating action button */}
      <button
        className={`btn ${isOpen ? 'btn-error' : 'btn-accent'} btn-lg btn-circle shadow-xl transition-all duration-300`}
        onClick={toggleMenu}
      >
        {isOpen ? <XIcon size={24} /> : <PlusIcon size={24} />}
      </button>
    </div>
  );
};

export default FloatingActionButton;