import React, { useState } from 'react';
import RegisterModal from '../Auth/RegisterModal';
import LoginModal from '../Auth/LoginModal';
import { Link } from 'react-router-dom';

type Props = {
  isLoggedIn: boolean;
  onLogout: () => void;
};

const Navbar: React.FC<Props> = ({ isLoggedIn, onLogout }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <>
      <header className="bg-gray-800 p-4 flex items-center justify-between">
        
          <div className="text-white text-2xl font-semibold">
            <Link to='/'>
              Pokedex
            </Link>
          </div>
        
        <div className="flex items-center space-x-4">
          {!isLoggedIn && (
            <>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                onClick={() => setShowLoginModal(true)}
              >
                Login
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                onClick={() => setShowRegisterModal(true)}
              >
                Register
              </button>
            </>
          )}
          {isLoggedIn && (
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              onClick={onLogout}
            >
              Logout
            </button>
          )}
        </div>
      </header>
      <LoginModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onShowRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />
      <RegisterModal
        show={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onShowLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
    </>
  );
};

export default Navbar;
