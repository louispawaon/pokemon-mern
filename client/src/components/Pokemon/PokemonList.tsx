/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import API from '../../services/api';
import { Link } from 'react-router-dom';
import PokemonCard from '../Card';
import { useNavigate } from 'react-router-dom';
import Modal from '../Form/Modal';
import CreatePokemonForm from '../Form/CreatePokemon';
import { useAuth } from '../../contexts/AuthContext';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const {isLoggedIn} = useAuth();

  const fetchPokemons = async () => {
    try {
      const response = await API.get('/api/pokemon');
      setPokemons(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const handleSavePokemon = () => {
    fetchPokemons();
    setIsModalOpen(false);
    navigate('/');
  };

  if (!pokemons) return <div>Loading...</div>;

  return (
    <>
      <div className="flex justify-end mb-4">
        {isLoggedIn ? (
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            onClick={() => setIsModalOpen(true)}
          >
            <i className="fas fa-plus mr-2" /> Create Pokémon
          </button>
        ) : (
          <p className="text-gray-500 text-sm">
            Please log in to create a Pokémon.
          </p>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreatePokemonForm onClose={() => setIsModalOpen(false)} onSave={handleSavePokemon} />
      </Modal>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center items-center">
        {pokemons.map((pokemon: any) => (
          <Link to={`/pokemon/${pokemon._id}`} key={pokemon._id}>
            <PokemonCard
              name={pokemon.name}
              types={pokemon.types.map((type: any) => type.name)}
              base_exp={pokemon.exp}
              artwork_url={pokemon.artwork_url}
            />
          </Link>
        ))}
      </div>
    </>
  );
};

export default PokemonList;
