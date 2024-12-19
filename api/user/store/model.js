import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const { Schema } = mongoose;

const User = new Schema({
    ci: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        default: 3
    },
    balance: {
        type: Number,
        default: 0
    },
    block: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


// Encriptar la contraseña antes de guardar
User.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Comparar contraseña
User.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export default mongoose.model('User', User)