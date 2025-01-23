import mongoose from 'mongoose'

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
    maxlength: 5,
  },
  exchangeRateToUSD: {
    type: Number,
    required: true,
    min: 0, // No puede ser negativo
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
}, {
  timestamps: true, // Incluye createdAt y updatedAt
});

const PaymentMethod = mongoose.model('PaymentMethod', PaymentMethodSchema);

export default PaymentMethod