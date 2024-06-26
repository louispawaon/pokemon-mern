import mongoose, {Schema, Document} from "mongoose";
import Types from "./Types";

// Pokemon Model Schema
interface Pokemon extends Document {
    name: string,
    types: Schema.Types.ObjectId[];
    abilities: string[];
    exp: number;
    height: number;
    weight: number;
    artwork_url: string;
}

const PokemonSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    types: [{ type: Schema.Types.ObjectId, ref: Types }],
    abilities: [{ type: String, required: true }],
    exp: { type: Number, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    artwork_url :{type: String, required: true},
  });
  
  export default mongoose.model<Pokemon>('Pokemon', PokemonSchema);