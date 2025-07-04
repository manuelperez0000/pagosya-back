import express from 'express'
import responser from '../../network/response.js'
import validateToken from '../../midelwares/validateToken.js'
const router = express.Router()
import controller from './controller.js'

router.post('/', validateToken, async (req, res) => {

    try {

        const {
            fromCurrency,
            toCurrency,
            amountFrom,
            amountTo
        } = req.body

        const from = req.user.email
        const message = "Deposit created successfully"
        const deposit = {
            from,
            fromCurrency,
            toCurrency,
            amountFrom,
            amountTo,
            status: 'pending'
        }
        //save the deposit to the database
        controller.saveDeposit(deposit)

        if (true) {
            responser.success({ res, message, body: deposit })
        } else {
            responser.error({ res, message, status: 400, body: deposit })
        }


    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

export default router