import express from 'express'
import responser from '../../network/response.js'
import validateToken from '../../midelwares/validateToken.js'
import controller from './controller.js'
const router = express.Router()

router.post('/', validateToken, async (req, res) => {

    try {

        const {
            fromCurrency,
            toCurrency,
            amountFrom,
            amountTo
        } = req.body

        const userFrom = req.user._id
        const deposit = {
            userFrom,
            fromCurrency,
            toCurrency,
            amountFrom,
            amountTo,
            status: 'pending'
        }

        //save the deposit to the database
        const resDeposit = await controller.saveDeposit(deposit)

        if (resDeposit) {
            responser.success({ res, message: "Deposit created successfully", body: deposit })
        } else {
            responser.error({ res, message: "Error al crear el deposito", status: 400, body: deposit })
        }


    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})



export default router