/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { typeColors } from '../../utils/typeColors';
import { useAuth } from '../../contexts/AuthContext';
import Modal from '../Form/Modal';
import UpdatePokemonForm from '../Form/UpdatePokemon';
import { PokemonType } from '../../utils/typePokemon';

const PokemonDetails = () => {
  const { id } = useParams<{ id: string }>();
  const {isLoggedIn, token} = useAuth();
  const [pokemon, setPokemon] = useState<PokemonType | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchPokemon = async () => {
    try {
      const response = await API.get(`api/pokemon/${id}`);
      setPokemon(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchPokemon();
  }, [id]);
  
  console.log(token)

  const handleUpdate = () => {
    navigate(`/pokemon/${id}`)
    fetchPokemon();
    console.log("yey!")
  };

  const handleDelete = async () => {
    try {
      await API.delete(`api/pokemon/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/'); 
    } catch (error) {
      console.error('Failed to delete Pokémon:', error);
    }
  };

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
    <div className="flex flex-col md:flex-row items-center">
      <img
        className="w-[50%] object-cover mb-4 md:mb-0 md:mr-6"
        src={pokemon.artwork_url}
        alt={pokemon.name}
      />
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold text-gray-800 uppercase">{pokemon.name}</h1>
          <div className="bg-gray-200 text-gray-700 font-semibold py-1 px-2 rounded-full">
            EXP {pokemon.exp}
          </div>
        </div>
        <p className="text-gray-700 text-base mb-2">
        <strong>Types:</strong>{' '}
            {pokemon.types.map((type: any) => (
              <span
                key={type}
                className={`mr-2 px-2 py-1 rounded-sm ${typeColors[type.name] || 'bg-gray-400 text-white'}`}
              >
                {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
              </span>
            ))}
        </p>
        <p className="text-gray-700 text-base mb-2">
          <strong>Abilities:</strong>{' '}
          {pokemon.abilities.map((ability: string) => (
            <span key={ability} className="mr-2 capitalize">
              {ability.charAt(0).toUpperCase() + ability.slice(1)}
            </span>
          ))}
        </p>
        <p className="text-gray-700 text-base mb-2">
          <strong>Height:</strong> {pokemon.height}
        </p>
        <p className="text-gray-700 text-base mb-2">
          <strong>Weight:</strong> {pokemon.weight}
        </p>
      </div>
      {isLoggedIn && (
          <div className="flex space-x-2 mt-4">
            <button
              onClick={() => setIsUpdateModalOpen(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-4 rounded"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
            >
              Delete
            </button>
          </div>
        )}
    </div>
    <Modal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)}> {/* Use Modal component */}
        <UpdatePokemonForm
          pokemonId={id!}
          onClose={() => setIsUpdateModalOpen(false)}
          onSave={handleUpdate}
        />
    </Modal>
  </div>
  );
};

export default PokemonDetails;
