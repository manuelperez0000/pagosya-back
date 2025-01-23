import mongoose from 'mongoose'
const { Schema } = mongoose

const Contacts = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: false,
        required: true
    },
    from: {
        type: String,
        unique: false,
        required: true
    }
}, { timestamps: true })

export default mongoose.model('Contacts', Contacts)