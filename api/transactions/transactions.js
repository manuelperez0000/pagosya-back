import express from 'express'
import responser from '../../network/response.js'
import validateToken from '../../midelwares/validateToken.js'
/* import { getTransactionsByeEmail } from '../transactions/transactionController.js' */

const router = express.Router()

router.get('/', validateToken, async (req, res) => {
    /* try {

        const transactions = await getTransactionsByeEmail({ email: req.user.email })

        responser.success({ res, message: "Success", body: transactions })

    } catch (error) {
        responser.error({ res, message: error?.message || error })
    } */

        responser.success({ res, message: "Success", body:{} })


})

export default router