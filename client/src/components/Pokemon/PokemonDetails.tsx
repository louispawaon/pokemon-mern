import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { typeColors } from '../../utils/typeColors';
import { useAuth } from '../../hooks/useAuth';
import Modal from '../Form/Modal';
import UpdatePokemonForm from '../Form/UpdatePokemon';
import { PokeType, PokemonType } from '../../utils/typePokemon';
import { toast } from 'react-toastify';
import { IoMdArrowRoundBack } from "react-icons/io";

const PokemonDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoggedIn, token } = useAuth();
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

  const handleUpdate = () => {
    navigate(`/pokemon/${id}`);
    fetchPokemon();
  };

  const handleDelete = async () => {
    try {
      await API.delete(`api/pokemon/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/');
      toast.success("Pokemon successfully deleted!")
    } catch (error) {
      console.error('Failed to delete Pokémon:', error);
      toast.error("Failed to delete Pokémon!")
    }
  };

  if (!pokemon) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="text-3xl font-bold text-gray-500">Loading...</span>
      </div>
    );
  }


  return (
    <div className="flex justify-center items-center h-screen bg-slate-200">
      <div className="max-w-4xl mx-auto p-4 bg-pokemonBlue-700 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-pokemonGold-500 hover:bg-pokemonGold-600 text-white py-1 px-4 rounded flex items-center gap-2"
          >
            <IoMdArrowRoundBack /> Back
          </button>
        </div>
        <div className="flex flex-col md:flex-row items-center">
          <img
            className="w-full md:w-[50%] object-cover mb-4 md:mb-0 md:mr-6 border-pokemonGold-500 bg-pokemonYellow-400"
            src={pokemon.artwork_url}
            alt={pokemon.name}
          />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-3xl font-bold uppercase font-gillSans text-white">{pokemon.name}</h1>
              <div className="bg-gray-200 text-pokemonGold-800 font-semibold py-1 px-2 rounded-full">
                EXP {pokemon.exp}
              </div>
            </div>
            <p className="text-white text-base mb-2">
              <strong>Types:</strong>{' '}
              {pokemon.types.map((type: PokeType) => (
                <span
                  key={type._id}
                  className={`mr-2 px-2 py-1 rounded-sm ${typeColors[type.name] || 'bg-gray-400 text-white'}`}
                >
                  {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                </span>
              ))}
            </p>
            <p className="text-white text-base mb-2">
              <strong>Abilities:</strong>{' '}
              {pokemon.abilities.map((ability: string) => ability.charAt(0).toUpperCase() + ability.slice(1)).join(', ')}
            </p>
            <p className="text-white text-base mb-2">
              <strong>Height:</strong> {pokemon.height}
            </p>
            <p className="text-white text-base mb-2">
              <strong>Weight:</strong> {pokemon.weight}
            </p>
            {isLoggedIn && (
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => setIsUpdateModalOpen(true)}
                  className="bg-pokemonYellow-700 hover:bg-pokemonYellow-600 text-white py-1 px-4 rounded"
                >
                  Update
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-pokemonRed-900 hover:bg-pokemonRed-700 text-white py-1 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)}>
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