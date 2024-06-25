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
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full" src={artwork_url} alt={name} />
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-2">
          <div className="font-bold text-2xl text-gray-800 uppercase">{name}</div>
          <div className="bg-gray-200 text-gray-700 font-semibold py-1 px-2 rounded-full">
            EXP {base_exp}
          </div>
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
