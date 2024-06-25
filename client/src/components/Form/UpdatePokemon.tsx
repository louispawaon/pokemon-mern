/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { PokeType, PokemonType } from '../../utils/typePokemon';

interface UpdatePokemonFormProps {
  pokemonId: string;
  onClose: () => void;
  onSave: () => void;
}

const UpdatePokemonForm: React.FC<UpdatePokemonFormProps> = ({ pokemonId, onClose, onSave }) => {
  const { token } = useAuth();

  const [name, setName] = useState('');
  const [availableTypes, setAvailableTypes] = useState<PokeType[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [abilities, setAbilities] = useState<string[]>([]);
  const [baseExperience, setBaseExperience] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [artworkUrl, setArtworkUrl] = useState('');

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await API.get<PokemonType>(`/api/pokemon/${pokemonId}`);
        const pokemon = response.data;
        setName(pokemon.name);
        setTypes(pokemon.types.map((type: any) => type.name));
        setAbilities(pokemon.abilities);
        setBaseExperience(pokemon.exp.toString());
        setHeight(pokemon.height.toString());
        setWeight(pokemon.weight.toString());
        setArtworkUrl(pokemon.artwork_url);
      } catch (error) {
        console.error('Failed to fetch Pokémon details:', error);
      }
    };

    const fetchTypes = async () => {
      try {
        const response = await API.get('/api/pokemon/types', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAvailableTypes(response.data);
      } catch (error) {
        console.error('Failed to fetch types:', error);
      }
    };

    fetchPokemonDetails();
    fetchTypes();
  }, [pokemonId, token]);

  const handleTypeChange = (type: string) => {
    setTypes((prevTypes) =>
      prevTypes.includes(type) ? prevTypes.filter((t) => t !== type) : [...prevTypes, type]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedTypeIds = availableTypes
      .filter((type) => types.includes(type.name))
      .map((type) => type._id);
    const updatedPokemon = {
      name,
      types: selectedTypeIds,
      abilities,
      exp: parseInt(baseExperience),
      height: parseInt(height),
      weight: parseInt(weight),
      artwork_url: artworkUrl,
    };

    try {
      await API.put(`/api/pokemon/${pokemonId}`, updatedPokemon, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onSave();
      onClose();
    } catch (error) {
      console.error('Failed to update Pokémon:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Update Pokémon</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Types</label>
        <div className="mt-1 flex flex-wrap">
          {availableTypes.map((type) => (
            <label key={type._id || type.name} className="mr-2">
              <input
                type="checkbox"
                className="mr-1"
                checked={types.includes(type.name)}
                onChange={() => handleTypeChange(type.name)}
              />
              {type.name}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Abilities</label>
        {abilities.map((ability, index) => (
          <div key={index} className="flex items-center mt-1">
            <input
              type="text"
              className="block w-full border-gray-300 rounded-md shadow-sm"
              value={ability}
              onChange={(e) => {
                const newAbilities = abilities.slice();
                newAbilities[index] = e.target.value;
                setAbilities(newAbilities);
              }}
              required
            />
            {index > 0 && (
              <button
                type="button"
                className="ml-2 text-red-500"
                onClick={() => {
                  const newAbilities = abilities.slice();
                  newAbilities.splice(index, 1);
                  setAbilities(newAbilities);
                }}
              >
                &times;
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="mt-2 text-blue-500"
          onClick={() => setAbilities([...abilities, ''])}
        >
          Add Ability
        </button>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Base Experience</label>
        <input
          type="number"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          value={baseExperience}
          onChange={(e) => setBaseExperience(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Height</label>
        <input
          type="number"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Weight</label>
        <input
          type="number"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Artwork URL</label>
        <input
          type="url"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          value={artworkUrl}
          onChange={(e) => setArtworkUrl(e.target.value)}
          required
        />
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Save
        </button>
        <button
          type="button"
          className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdatePokemonForm;
