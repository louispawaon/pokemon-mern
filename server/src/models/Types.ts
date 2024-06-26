import mongoose, {Schema, Document} from "mongoose";

// Types Model Schema
interface Types extends Document{
    name: string;
}

const TypesSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
  });

export default mongoose.model<Types>('Types', TypesSchema);
