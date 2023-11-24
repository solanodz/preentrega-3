import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String, unique: true },
    age: { type: Number },
    password: { type: String },
    role: { type: String, enum: ['usuario', 'admin'], default: 'usuario' }
}, { timestamps: true })

export default mongoose.model('User', userSchema)