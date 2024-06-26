import mongoose, { Schema, Document } from 'mongoose';

// Users Model Schema
interface Users extends Document {
    username: string;
    password: string;
}

const UsersSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });

export default mongoose.model<Users>('Users', UsersSchema);