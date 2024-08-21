import React from 'react';
import { Link } from 'react-router-dom';
import { navItems } from '../nav-items';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Estimate Builder</h1>
        </div>
        <ul className="space-y-2 p-4">
          {navItems.map(({ to, title, icon }) => (
            <li key={to}>
              <Link to={to} className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded">
                {icon}
                <span>{title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;