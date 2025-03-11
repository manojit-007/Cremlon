import { Home, Image, Phone, User } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <nav className="bg-gray-800 z-[1000] p-4 fixed w-full shadow-lg">
      <ul className="flex justify-center space-x-8 items-center">
        <li>
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-white hover:text-gray-400 transition duration-300"
          >
            {isMobile ? <Home className="w-6 h-6" /> : 'Home'}
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate('/about')}
            className="flex items-center text-white hover:text-gray-400 transition duration-300"
          >
            {isMobile ? <User className="w-6 h-6" /> : 'About'}
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate('/work')}
            className="flex items-center text-white hover:text-gray-400 transition duration-300"
          >
            {isMobile ? <Image className="w-6 h-6" /> : 'Work'}
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate('/contact')}
            className="flex items-center text-white hover:text-gray-400 transition duration-300"
          >
            {isMobile ? <Phone className="w-6 h-6" /> : 'Contact'}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
