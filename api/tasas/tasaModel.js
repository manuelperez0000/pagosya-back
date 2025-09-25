import mongoose, { Schema } from 'mongoose'

const tasaSchema = new Schema({
    methodId: { type: Schema.Types.ObjectId, ref: 'PaymentMethod', required: true },
    name: { type: String, required: true },
    buy: { type: Number, required: true },
    sell: { type: Number, required: true },
}, { timestamps: true }
)

const Tasa = mongoose.model('Tasa', tasaSchema)

export default Tasa
