import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { PokeType, PokemonAbility } from '../../utils/typePokemon';
import { toast } from 'react-toastify';

interface CreatePokemonFormProps {
  onClose: () => void;
  onSave: () => void;
}

const initialAbility = { name: '' };

const CreatePokemonForm: React.FC<CreatePokemonFormProps> = ({ onClose, onSave }) => {
  const { token } = useAuth();

  const [name, setName] = useState('');
  const [availableTypes, setAvailableTypes] = useState<PokeType[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [abilities, setAbilities] = useState<PokemonAbility[]>([initialAbility]);
  const [baseExperience, setBaseExperience] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [artworkUrl, setArtworkUrl] = useState('');

  const handleAbilityChange = (index: number, value: string) => {
    const newAbilities = abilities.slice();
    newAbilities[index] = { name: value };
    setAbilities(newAbilities);
  };

  const handleAddAbility = () => {
    setAbilities([...abilities, initialAbility]);
  };

  const handleRemoveAbility = (index: number) => {
    const newAbilities = abilities.slice();
    newAbilities.splice(index, 1);
    setAbilities(newAbilities);
  };

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await API.get<PokeType[]>('/api/pokemon/types', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAvailableTypes(response.data);
      } catch (error) {
        console.error('Failed to fetch types:', error);
      }
    };
    fetchTypes();
  }, [token]);

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
    const pokemon = {
      name,
      types: selectedTypeIds,
      abilities: abilities.map((ability) => ability.name),
      exp: parseInt(baseExperience),
      height: parseInt(height),
      weight: parseInt(weight),
      artwork_url: artworkUrl,
    };

    try {
      await API.post('/api/pokemon', pokemon, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onSave();
      onClose();
      toast.success("Pokemon added to Pokedex!")
    } catch (error) {
      console.error('Failed to create Pokémon:', error);
      toast.error("Please re-check Pokemon details.")
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Create Pokémon</h2>
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
              value={ability.name}
              onChange={(e) => handleAbilityChange(index, e.target.value)}
              required
            />
            {index > 0 && (
              <button
                type="button"
                className="ml-2 text-red-500"
                onClick={() => handleRemoveAbility(index)}
              >
                &times;
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="mt-2 text-blue-500"
          onClick={handleAddAbility}
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

export default CreatePokemonForm;
