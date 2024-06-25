import express from 'express';
import { getAllPokemon, getPokemonById, createPokemon, updatePokemon, deletePokemon, getAllTypes } from '../controllers/pokemon.controller';
import authenticateJWT from '../middleware/auth.middleware';

const pokeRouter = express.Router();

pokeRouter.get('/', getAllPokemon);
pokeRouter.get('/types', getAllTypes);
pokeRouter.get('/:id', getPokemonById);
pokeRouter.post('/', authenticateJWT, createPokemon);
pokeRouter.put('/:id', authenticateJWT, updatePokemon);
pokeRouter.delete('/:id', authenticateJWT, deletePokemon);

export default pokeRouter;