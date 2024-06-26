import mongoose, { Schema, Document } from 'mongoose';

//Token Blacklist Model Schema - an approach responsible for storing the JWT tokens to avoid being used repetitively in requests
interface TokenBlacklist extends Document {
    token: string;
    expiry: Date;
}

const TokenBlacklistSchema: Schema = new Schema({
    token: { type: String, required: true, unique: true },
    expiry: { type: Date, required: true },
});

export default mongoose.model<TokenBlacklist>('TokenBlacklist', TokenBlacklistSchema);
