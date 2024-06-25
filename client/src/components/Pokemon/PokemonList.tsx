/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import API from '../../services/api';
import { Link } from 'react-router-dom';
import PokemonCard from '../Card';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);

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

  fetchPokemons()

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center capitalize">
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
