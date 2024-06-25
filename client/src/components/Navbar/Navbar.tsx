import React, { useState } from 'react';
import RegisterModal from '../Auth/RegisterModal';
import LoginModal from '../Auth/LoginModal';
import { Link } from 'react-router-dom';
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa6";

type Props = {
  isLoggedIn: boolean;
  onLogout: () => void;
};

const Navbar: React.FC<Props> = ({ isLoggedIn, onLogout }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <>
      <header className="bg-gray-800 p-4 flex items-center justify-between md:flex-row flex-col">
        <div className="text-yellow-400 stroke-blue-700 text-2xl font-semibold font-pokemon">
          <Link to='/'>
            Pokedex
          </Link>
        </div>
        <div className="flex items-center space-x-4 md:space-x-8">
          {!isLoggedIn && (
            <>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded flex items-center gap-2"
                onClick={() => setShowLoginModal(true)}
              >
                <IoLogIn />Login
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center gap-2 "
                onClick={() => setShowRegisterModal(true)}
              >
               <FaUserPlus /> Register
              </button>
            </>
          )}
          {isLoggedIn && (
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center gap-2"
              onClick={onLogout}
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
