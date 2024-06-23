import axios from "axios";
import mongoose from "mongoose";
import connectDatabase from "../config/db";
import dotenv from 'dotenv';

import Pokemon from "../models/Pokemon";
import Types from "../models/Types";
import Abilities from "../models/Abilities";

dotenv.config();

const fetchSavePokemonData = async (): Promise<void> => {
    try{
        await connectDatabase();
        const pokemonRequest = [];
        for (let x = 1; x <= 151; x++){
            pokemonRequest.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${x}`))
        }

        const pokemonResponse = await Promise.all(pokemonRequest)

        for (const [index, res] of pokemonResponse.entries()){
            const {name, types, abilities, base_experience, height, weight, sprites} = res.data;

            console.log(`Fetching Pokémon number ${index + 1}`);

            // Type
            const typeId = [];
            for (const typeInfo of types){
                let type = await Types.findOne({name: typeInfo.type.name});
                if(!type){
                    type = new Types({name: typeInfo.type.name});
                    await type.save();
                }
                typeId.push(type._id);
            }

            // Ability
            const abilityId = [];
            for (const abilityInfo of abilities) {
                let ability = await Abilities.findOne({ name: abilityInfo.ability.name });
                if (!ability) {
                    ability = new Abilities({ name: abilityInfo.ability.name });
                    await ability.save();
                }
                abilityId.push(ability._id);
            }

            // Pokemon
            const pokemon = new Pokemon({
                name,
                types: typeId,
                abilities: abilityId,
                exp: base_experience,
                height,
                weight,
                artwork_url: sprites.other['official-artwork'].front_default
              });

            await pokemon.save()
        }

        console.log('Generation 1 Pokémon data saved successfully');
        process.exit(0); 
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error connecting to MongoDB:', error.message);
            process.exit(1);
        }
        else{
            console.error(error)
            process.exit(1);
        }
    }finally{
        mongoose.connection.close();
    }
}

fetchSavePokemonData();