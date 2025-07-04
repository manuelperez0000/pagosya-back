import Deposit from './depositModel.js';

export default async function saveDeposit(deposit) {
    try {
        // Validate the deposit object
        if (!deposit.from || !deposit.fromCurrency || !deposit.toCurrency || !deposit.amountFrom || !deposit.amountTo) {
            throw new Error('Faltaron algunos datos en tu transaccion');
        }
        const newDeposit = new Deposit(deposit);
        await newDeposit.save();
        return newDeposit;
    } catch (error) {
        throw new Error(`Error saving deposit: ${error.message}`);
    }
}