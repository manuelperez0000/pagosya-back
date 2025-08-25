import mongoose, { Schema } from 'mongoose'

// Definir el esquema para los métodos de pago
const PaymentMethodSchema = new mongoose.Schema({
  currencyName: {
    type: String,
    required: true,
    trim: true,
  },
  currencyType: {
    type: String,
    required: true,
    enum: ['fiat', 'crypto'],
  },
  abbreviation: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    maxlength: 20,
  },
  exchangeRateToUSD: {
    type: Number,
    required: true,
    min: 0, // No puede ser negativo
  },
  accountType: {
    type: String,
    required: true,
    enum: ['ahorro', 'corriente'],
  },
  buyPrice: {
    type: Number,
    required: true,
    min: 0, // No puede ser negativo
  },
  sellPrice: {
    type: Number,
    required: true,
    min: 0, // No puede ser negativo
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  userName: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  acountNumber: {
    type: String,
    required: false
  },
  document: {
    type: Number,
    required: false
  },
  bank: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  metodo: {
    type: Number,
    required: true
  }
}, {
  timestamps: true, // Incluye createdAt y updatedAt
});

const PaymentMethod = mongoose.model('PaymentMethod', PaymentMethodSchema);

export default PaymentMethod