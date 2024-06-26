import { useEffect, useState } from 'react';
import API from '../../services/api';
import { Link } from 'react-router-dom';
import PokemonCard from './PokemonCard';
import { useNavigate } from 'react-router-dom';
import Modal from '../Form/Modal';
import CreatePokemonForm from '../Form/CreatePokemon';
import { useAuth } from '../../contexts/AuthContext';
import { IoMdAdd } from "react-icons/io";
import { PokeType, PokemonType } from '../../utils/typePokemon';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const {isLoggedIn} = useAuth();

  const fetchPokemons = async () => {
    try {
      const response = await API.get('/api/pokemon');
      setPokemons(response.data);
      setIsLoading(false); 
    } catch (error) {
      console.error(error);
      setIsLoading(false); 
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

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="text-3xl font-bold text-gray-500">Loading...</span>
      </div>
    );
  }

  if (pokemons.length === 0) {
    return (
      <div className="text-center text-gray-500 text-lg">
        No Pokémon available.
      </div>
    );
  }


  return (
    <>
      <div className="flex justify-end mb-4">
        {isLoggedIn ? (
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <IoMdAdd /> Create Pokémon
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
        {pokemons.map((pokemon: PokemonType) => (
          <Link to={`/pokemon/${pokemon._id}`} key={pokemon._id}>
            <PokemonCard
              name={pokemon.name}
              types={pokemon.types.map((type: PokeType) => type.name)}
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
