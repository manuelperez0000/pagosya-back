import Deposit from './depositModel.js';
import Chat from '../chats/model.js';
import validate from '../../services/validate.js';
const saveDeposit = async (deposit) => {
    try {

        // Validate the deposit object

        validate.required(deposit.userFrom, 'Falta el campo "userFrom" en tu transacción')
        validate.isMongoId(deposit.userFrom, 'from no es un id valido para mongodb')
        validate.required(deposit.method, 'Falta el campo "method" en tu transacción')
        validate.isMongoId(deposit.method, 'method no es un id valido para mongodb')

        validate.required(deposit.amount, 'amount es requerido')

        validate.required(deposit.tasa, 'Falta el campo "tasa" en tu transacción')


        const newDeposit = new Deposit(deposit);
        return await newDeposit.save();
    } catch (error) {
        throw new Error(`Error al guardar el deposito: ${error.message}`);
    }
}

const getDeposits = async (filter) => {
    try {
        return await Deposit.find(filter).populate('userFrom').populate('method').populate('tasa').exec();
    } catch (error) {
        throw new Error(`Error al obtener los depositos: ${error.message}`);
    }
}

const getDeposit = async (filter) => {
    try {
        const deposit = await Deposit.findOne(filter)
            .populate('userFrom')   // Cliente
            .populate('method')
            .populate('tasa')
            .exec();



        if (!deposit || !deposit.userFrom) {
            throw new Error('Depósito o usuario no encontrado');
        }

        const clientId = deposit.userFrom._id;
        const agentId = deposit.agent;

        let chats = [];

        if (agentId) {
            chats = await Chat.find({
                $or: [
                    { from: clientId, to: agentId },
                    { from: agentId, to: clientId }
                ]
            }).sort({ createdAt: 1 }); // Orden cronológico
        }

        return { ...deposit.toObject(), chats };
    } catch (error) {
        throw new Error(`Error al obtener el depósito: ${error.message}`);
    }
}


const updateDeposit = async (id, update) => {
    try {
        validate.required(id, 'El id es requerido');
        validate.isMongoId(id, 'El id no es un id valido para mongodb');
        const deposit = await Deposit.findById(id);
        if (!deposit) {
            throw new Error('El deposito no existe');
        }
        Object.assign(deposit, update);
        return await deposit.save();
    } catch (error) {
        throw new Error(`Error al actualizar el deposito: ${error.message}`);
    }
}

export default { saveDeposit, getDeposits, updateDeposit, getDeposit }