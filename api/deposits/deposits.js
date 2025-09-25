import express from 'express'
import responser from '../../network/response.js'
import validateToken from '../../midelwares/validateToken.js'
import controller from './controller.js'
const router = express.Router()

router.get('/client', validateToken, async (req, res) => {
    //get all deposits of the user
    try {
        const userId = req.user._id;
        const deposits = await controller.getDeposits({ userFrom: userId });
        responser.success({ res, message: "User deposits retrieved successfully", body: deposits });
    } catch (error) {
        responser.error({ res, message: error?.message || error });
    }
});

router.get('/client/:id', validateToken, async (req, res) => {
    //get a deposit by id
    try {
        const { id } = req.params
        const deposit = await controller.getDeposit({ _id: id})
        responser.success({ res, message: "Deposit retrieved successfully", body: deposit })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

router.get('/:status', validateToken, async (req, res) => {
    //get all deposits whit status pending
    try {
        const { status } = req.params
        const deposits = await controller.getDeposits({ status })
        responser.success({ res, message: "Deposits retrieved successfully", body: deposits })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

router.put('/attend/:id', validateToken, async (req, res) => {
    //attend a deposit changing its status to taken
    try {
        const { id } = req.params
        const deposit = await controller.getDeposits({ _id: id })
        if (!deposit) {
            return responser.error({ res, message: "Deposit not found", status: 404 })
        }
        //create new chat
        deposit.status = 'taken'
        deposit.agent = req.user._id
        deposit.client = 
        await controller.updateDeposit(id, deposit)
        responser.success({ res, message: "Deposit attended successfully", body: deposit })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

router.post('/', validateToken, async (req, res) => {

    try {

        const {
            method,
            amount,
            result,
            tasa
        } = req.body

        const userFrom = req.user._id

        const deposit = {
            userFrom,
            method: method.methodId._id,
            amount,
            result,
            tasa,
            status: 'pending'
        }

        //STATUS
        //pending , taken, canceled, finished

        //save the deposit to the database
        try {
            const resDeposit = await controller.saveDeposit(deposit)
            responser.success({ res, message: "Deposit created successfully", body: resDeposit })
        } catch (error) {
            console.error(error);
            responser.error({ res, message: "Error al crear el deposito", status: 400, body: deposit })
        }

    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})



export default router