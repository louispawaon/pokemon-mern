import mongoose, {Schema, Document} from "mongoose";

interface Pokemon extends Document {
    name: string,
    types: Schema.Types.ObjectId[];
    abilities: Schema.Types.ObjectId[];
    exp: number;
    height: number;
    weight: number;
}

const PokemonSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    types: [{ type: Schema.Types.ObjectId, ref: 'Type' }],
    abilities: [{ type: Schema.Types.ObjectId, ref: 'Ability' }],
    exp: { type: Number, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
  });
  
  export default mongoose.model<Pokemon>('Pokemon', PokemonSchema);