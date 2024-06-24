import mongoose, {Schema, Document} from "mongoose";
import Types from "./Types";
import Abilities from "./Abilities";

interface Pokemon extends Document {
    name: string,
    types: Schema.Types.ObjectId[];
    abilities: Schema.Types.ObjectId[];
    exp: number;
    height: number;
    weight: number;
    artwork_url: string;
}

const PokemonSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    types: [{ type: Schema.Types.ObjectId, ref: Types }],
    abilities: [{ type: Schema.Types.ObjectId, ref: Abilities }],
    exp: { type: Number, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    artwork_url :{type: String, required: true},
  });
  
  export default mongoose.model<Pokemon>('Pokemon', PokemonSchema);