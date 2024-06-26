import React, { useState } from 'react';
import RegisterModal from '../Auth/RegisterModal';
import LoginModal from '../Auth/LoginModal';
import { Link } from 'react-router-dom';
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa6";
import { toast } from 'react-toastify';

type Props = {
  isLoggedIn: boolean;
  onLogout: () => void;
};

const Navbar: React.FC<Props> = ({ isLoggedIn, onLogout }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLogout = () => {
    onLogout();
    toast.success('Logged out successfully!');
  };

  return (
    <>
      <header className="bg-pokemonDarkRed-600 p-4 flex items-center justify-between md:flex-row flex-col">
        <div className="text-yellow-400 text-4xl font-semibold font-pokemon py-2">
          <Link to='/'>
            Pokedex
          </Link>
        </div>
        <div className="flex items-center space-x-4 md:space-x-8">
          {!isLoggedIn && (
            <>
              <button
                className="bg-pokemonBlue-700 hover:bg-pokemonBlue-600 text-white py-2 px-3 rounded flex items-center gap-2"
                onClick={() => setShowLoginModal(true)}
              >
                <IoLogIn />Login
              </button>
              <button
                className="bg-pokemonYellow-700 hover:bg-pokemonYellow-600 text-white py-2 px-4 rounded flex items-center gap-2 "
                onClick={() => setShowRegisterModal(true)}
              >
               <FaUserPlus /> Register
              </button>
            </>
          )}
          {isLoggedIn && (
            <button
              className="bg-pokemonRed-900 hover:bg-pokemonRed-700 text-white py-2 px-4 rounded flex items-center gap-2"
              onClick={handleLogout}
            >
              <IoLogOut /> Logout
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
