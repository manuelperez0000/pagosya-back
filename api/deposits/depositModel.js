import mongoose from 'mongoose'
const { Schema } = mongoose

const depositSchema = new Schema({
    from: { type: Schema.Types.ObjectId, required: true },
    to: { type: Schema.Types.ObjectId, required: false },
    fromCurrency: { type: Schema.Types.ObjectId, required: true },
    toCurrency: { type: Schema.Types.ObjectId, required: true },
    amountFrom: { type: Number, required: true },
    amountTo: { type: Number, required: true },
    status: { type: String, default: 'pending' },
}, { timestamps: true })

const Deposit = mongoose.model('Deposit', depositSchema)

export default Deposit