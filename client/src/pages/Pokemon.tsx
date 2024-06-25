import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Modal from '../components/Form/Modal';
import CreatePokemonForm from '../components/Form/CreatePokemon';
import { useNavigate } from 'react-router-dom';

const MainComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSavePokemon = () => {
    navigate("/")
    console.log('Pokemon saved');
    // Here you can handle the API call to save the Pokémon to the database
  };

  return (
    <div>
      {isLoggedIn ? (
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Create Pokémon
        </button>
      ) : (
        <p>Please log in to create a Pokémon.</p>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreatePokemonForm onClose={() => setIsModalOpen(false)} onSave={handleSavePokemon} />
      </Modal>
    </div>
  );
};

export default MainComponent;
