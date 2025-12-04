import React, { useState } from 'react';
import { Menu, X, Home, BarChart2, Settings, Users } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: Home, link: '/auth' },
  { name: 'Analytics', icon: BarChart2, link: '/analytics' },
  { name: 'Users', icon: Users, link: '/users' },
  { name: 'Settings', icon: Settings, link: '/settings' },
];

export default function  SideNav({ onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');

  const handleItemClick = (name) => {
    setActiveItem(name);
    setIsOpen(false); // Close sidebar on mobile after selection
    onSelect(name); // Notify parent component (App.jsx)
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="fixed top-4 left-4 z-50 p-2 lg:hidden bg-white rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar Content */}
      <div 
        className={`
          fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white p-5 
          transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:static lg:translate-x-0 lg:shadow-xl
        `}
      >
        <h1 className="text-2xl font-bold mb-8 text-indigo-400">App Admin</h1>
        <nav>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.name;
            return (
              <button
                key={item.name}
                onClick={() => handleItemClick(item.name)}
                className={`
                  flex items-center w-full p-3 mb-2 rounded-lg transition duration-150
                  ${isActive 
                    ? 'bg-indigo-600 font-semibold shadow-md' 
                    : 'hover:bg-gray-700 text-gray-300'
                  }
                `}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden" 
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}