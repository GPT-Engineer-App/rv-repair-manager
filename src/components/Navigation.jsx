import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <Button variant="ghost" onClick={() => navigate('/')}>Home</Button>
        <Button variant="ghost" onClick={() => navigate('/users')}>Users</Button>
        <Button variant="ghost" onClick={() => navigate('/estimates')}>Estimates</Button>
      </div>
    </nav>
  );
};

export default Navigation;