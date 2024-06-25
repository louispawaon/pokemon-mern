export type PokeType = {
    _id: string;
    name: string;
  }
  
export type PokemonType =  {
    _id: string;
    name: string;
    types: PokeType[];
    abilities: string[];
    exp: number;
    height: number;
    weight: number;
    artwork_url: string;
}
  
export type PokemonAbility = {
    name: string;
}