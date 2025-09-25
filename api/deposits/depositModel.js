import mongoose from 'mongoose'
const { Schema } = mongoose

//valid status
//pending , taken, canceled, finished

const depositSchema = new Schema({
    userFrom: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    agent: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    method: { type: Schema.Types.ObjectId, ref: 'PaymentMethod', required: true },
    tasa: { type: Schema.Types.ObjectId, ref: 'Tasa', required: true },
    amount: { type: Number, required: true },
    result: { type: Number, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'taken', 'canceled', 'finished'] },
    description: { type: String, required: false },
}, { timestamps: true })


const Deposit = mongoose.model('Deposit', depositSchema)

export default Deposit