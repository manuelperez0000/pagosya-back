import Deposit from './depositModel.js';
import validate from '../../services/validate.js';
const saveDeposit = async (deposit) => {
    try {

        // Validate the deposit object
       
        validate.required(deposit.userFrom,'Falta el campo "userFrom" en tu transacción')
        validate.isMongoId(deposit.userFrom,'from no es un id valido para mongodb')

        validate.required(deposit.fromCurrency,'Falta el campo "fromCurrency" en tu transacción')
        validate.isMongoId(deposit.fromCurrency)

        validate.required(deposit.toCurrency,'Falta el campo "toCurrency" en tu transacción')
        validate.isMongoId(deposit.toCurrency)

        validate.required(deposit.amountFrom,'amountFrom es requerido')
        validate.number(deposit.amountFrom)

        validate.required(deposit.amountTo,'amountTo es requerido')
        validate.number(deposit.amountTo)

        const newDeposit = new Deposit(deposit);
        return await newDeposit.save();
    } catch (error) {
        throw new Error(`Error al guardar el deposito: ${error.message}`);
    }
}

export default { saveDeposit }