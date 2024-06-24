import mongoose, { Schema, Document } from 'mongoose';

interface TokenBlacklist extends Document {
    token: string;
    expiry: Date;
}

const TokenBlacklistSchema: Schema = new Schema({
    token: { type: String, required: true, unique: true },
    expiry: { type: Date, required: true },
});

export default mongoose.model<TokenBlacklist>('TokenBlacklist', TokenBlacklistSchema);
