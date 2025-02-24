import mongoose from 'mongoose'
/* import bcrypt from 'bcryptjs' */
const { Schema } = mongoose;

const TransactionModel = new Schema({
    fromId: {
        type: Schema.ObjectId,
        required: true
    },
    toId: {
        type: Schema.ObjectId,
        required: true
    },
    fromEmail: {
        type: String,
        required: true
    },
    toEmail: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }

}, { timestamps: true })

export default mongoose.model('TransactionModel', TransactionModel)