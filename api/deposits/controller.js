import Deposit from './depositModel.js';
import Chat from '../chats/model.js';
import validate from '../../services/validate.js';
import { io } from '../../index.js';
import PaymentMethod from '../methods/methodsModel.js';

const saveDeposit = async (deposit, userFrom, method) => {
    try {

        // Validate the deposit object

        validate.required(deposit.userFrom, 'Falta el campo "userFrom" en tu transacción')
        validate.isMongoId(deposit.userFrom, 'from no es un id valido para mongodb')
        validate.required(deposit.method, 'Falta el campo "method" en tu transacción')
        validate.isMongoId(deposit.method, 'method no es un id valido para mongodb')

        validate.required(deposit.amount, 'amount es requerido')

        validate.required(deposit.tasa, 'Falta el campo "tasa" en tu transacción')


        const newDeposit = new Deposit(deposit);

        const savedDeposit = await newDeposit.save();

        const newData = { ...savedDeposit.toObject(), userFrom, method: method.methodId }

        io.emit('newDeposit', newData);

        return savedDeposit;
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

const getDeposit = async (_id) => {
    try {

        const deposit = await Deposit.findOne({ _id })
            .populate('userFrom')   // Cliente
            .populate('method')
            .populate('tasa')
            .populate('agent')
            .exec();

        const depositObj = deposit.toObject()

        if (depositObj?.agent) {
            console.log("si tiene agente");
            const agentMethods = await PaymentMethod.find({ userId: depositObj.agent._id });
            console.log("agentMethods: ", agentMethods);

            // Convertir el documento a objeto plano

            depositObj.agent.methods = agentMethods;
            const agentId = depositObj.agent._id
            const clientId = depositObj.userFrom._id
            let chats = [];


            chats = await Chat.find({
                $or: [
                    { from: clientId, depositId: depositObj._id, to: agentId },
                    { from: agentId, depositId: depositObj._id, to: clientId }
                ]
            }).sort({ createdAt: 1 }); // Orden cronológico


            depositObj.chats = chats


            return depositObj;
        } else {
            console.log("No tiene agente");
            return deposit;
        }

        /* if (deposit?.agent) {
            return deposit.agent.methods = await PaymentMethod.find({ userId: deposit.agent._id })
        } else {
            return deposit
        } */

        /* const clientId = deposit?.userFrom._id;
        const agentId = deposit?.agent; */



        //agregar el metodo de pago del agente a deposit.agent 
        /* console.log("antes de buscar los metodos del agente: _id: ", deposit?.agent._id)
        if (deposit?.agent?._id) {
            const metodosDisponibles = await PaymentMethod.find({ userId: deposit.agent._id });
            const agent = { ...deposit.toObject().agent, metodosDisponibles }
            const newObj = { ...deposit.toObject(), agent }

            console.log("retornamod deposito: ", newObj)
            return { ...newObj, chats };
        } else {
            return { ...deposit.toObject(), chats };
        } */

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
        const updatedDeposit = await deposit.save();
        const enrichedDeposit = await Deposit.findById(updatedDeposit._id)
            .populate('userFrom')
            .populate('method')
            .populate('tasa')
            .populate('agent');

        const depositObject = enrichedDeposit.toObject();

        if (depositObject?.agent?._id) {
            const metodosDisponibles = await PaymentMethod.find({ userId: depositObject.agent._id });
            depositObject.agent.methods = metodosDisponibles;
        }

        io.emit('updateDeposit', depositObject);
        return depositObject;
    } catch (error) {
        throw new Error(`Error al actualizar el deposito: ${error.message}`);
    }
}

export default { saveDeposit, getDeposits, updateDeposit, getDeposit }
