import express from 'express'
import responser from '../../network/response.js'
import validateToken from '../../midelwares/validateToken.js'
import Deposit from '../deposits/depositModel.js'
import User from '../user/store/model.js'
import { io } from '../../index.js';
import PaymentMethod from '../methods/methodsModel.js'

const router = express.Router()

router.post('/', validateToken, async (req, res) => {
    try {
        const { depositId } = req.body

        const deposit = await Deposit.findById(depositId)
        if (!deposit) {
            throw new Error('El depósito no existe');
        }

        const clientId = deposit.userFrom;
        const agentId = deposit.agent;

        // Agregar saldo al cliente
        const updatedClient = await User.findOneAndUpdate(
            { _id: clientId },
            { $inc: { balance: deposit.result } },
            { new: true }
        );

        // Disminuir saldo al agente
        const updatedAgent = await User.findOneAndUpdate(
            { _id: agentId },
            { $inc: { balance: -deposit.result } },
            { new: true }
        );

        // Actualizar estado del depósito a "finalizado"
        const responseDepositUpdate = await Deposit.findByIdAndUpdate(
            depositId,
            { status: 'finished' },
            { new: true }
        ).populate('userFrom')
            .populate('agent')
            .populate('tasa')
            .populate('method')

        const newObjDeposit = responseDepositUpdate.toObject()
        newObjDeposit.agent.methods = await PaymentMethod.find({ userId: deposit.agent });

        const usersData = { from: updatedClient, to: updatedAgent }

        io.emit('updateDeposit', newObjDeposit);
        io.emit('userData', usersData);



        responser.success({ res, message: "Success", body: newObjDeposit });

    } catch (error) {
        responser.error({ res, message: error?.message || error });
    }
});

export default router;
