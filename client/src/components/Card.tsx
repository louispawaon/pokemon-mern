import React from 'react';
import { typeColors } from '../utils/typeColors';

interface PokemonCardProps {
  name: string;
  types: string[];
  artwork_url: string;
  base_exp: number;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  types,
  base_exp,
  artwork_url,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:shadow-2xl transition duration-300 ease-in-out">
      <img
        className="w-full object-cover"
        src={artwork_url}
        alt={name}
      />
      <div className="px-6 py-4 h-40">
        <div className="mb-2">
          <div className="font-bold text-2xl text-gray-800 uppercase">{name}</div>
          <div className="text-gray-700 font-semibold">{`EXP ${base_exp}`}</div>
        </div>
        <div className="flex flex-wrap mb-2">
          {types.map((type) => (
            <span
              key={type}
              className={`py-1 px-2 mr-4 mb-2 rounded-sm text-sm font-semibold capitalize ${typeColors[type] || 'bg-gray-300 text-black'}`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
export default PokemonCard;
