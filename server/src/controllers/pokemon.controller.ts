import { Request, Response } from "express";
import Pokemon from "../models/Pokemon";
import Types from "../models/Types";

// Get All Pokemon including their types and abilities
export const getAllPokemon = async (req: Request, res: Response) => {
    try{
        const pokemons = await Pokemon.find().populate('types').populate('abilities');
        res.json(pokemons);
    }
    catch(error){
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        } 
          else {
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

// Get All Types in the Database
export const getAllTypes = async (req: Request, res: Response) => {
    try{
        const types = await Types.find();
        res.json(types);
    }
    catch(error){
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        } 
          else {
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

// Get a specific Pokemon by ID
export const getPokemonById = async (req: Request, res: Response) => {
    try{
        const pokemon = await Pokemon.findById(req.params.id).populate('types').populate('abilities');
        if (!pokemon){
            return res.status(404).json({ message: 'Pokemon not found' });
        }
        res.json(pokemon)
    }
    catch(error){
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        } 
          else {
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

// Create Pokemon
export const createPokemon = async (req: Request, res: Response) => {
    const {name, types, abilities, exp, height, weight, artwork_url} = req.body;

    try{
        const newPokemon = new Pokemon({
            name,
            types,
            abilities,
            exp,
            height,
            weight,
            artwork_url
        })

        console.log(newPokemon)

        const createdPokemon = await newPokemon.save();
        res.status(201).json(createdPokemon);
    }
    catch(error){
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        } 
          else {
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

// Update Pokemon
export const updatePokemon = async (req: Request, res: Response) => {
    const {name, types, abilities, exp, height, weight, artwork_url} = req.body;

    try {
        const pokemon = await Pokemon.findById(req.params.id);
        if (!pokemon) {
          return res.status(404).json({ message: 'Pokemon not found' });
        }
        
        pokemon.name = name || pokemon.name;
        pokemon.types = types || pokemon.types;
        pokemon.abilities = abilities || pokemon.abilities;
        pokemon.exp = exp || pokemon.exp;
        pokemon.height = height || pokemon.height;
        pokemon.weight = weight || pokemon.weight;
        pokemon.artwork_url = artwork_url || pokemon.artwork_url;
        
        const updatedPokemon = await pokemon.save();
        res.json(updatedPokemon);
      }
      catch(error){
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        } 
          else {
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

//Delete Pokemon
export const deletePokemon = async (req: Request, res: Response) => {
    try {
        const pokemon = await Pokemon.findById(req.params.id);
        console.log("the pokemon", pokemon)
        if (!pokemon) {
          return res.status(404).json({ message: 'Pokemon not found' });
        }
        
        await Pokemon.deleteOne({ _id: req.params.id });
        res.json({ message: 'Pokemon removed' });
    } 
    catch(error){
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        } 
          else {
            return res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}
