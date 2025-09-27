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
  accountType: {
    type: String,
    required: false,
    enum: ['ahorro', 'corriente'],
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
  accountNumber: {
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
  methodId: {
    type: Number,
    required: true
  }
}, {
  timestamps: true,
});

const PaymentMethod = mongoose.model('PaymentMethod', PaymentMethodSchema);

export default PaymentMethod