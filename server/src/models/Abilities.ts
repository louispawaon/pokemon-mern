import mongoose, { Schema, Document } from 'mongoose';

interface Abilities extends Document {
  name: string;
}

const AbilitiesSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
});

export default mongoose.model<Abilities>('Ability', AbilitiesSchema);