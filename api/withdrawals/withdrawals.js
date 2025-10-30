import express from 'express'
import responser from '../../network/response.js'
import validateToken from '../../midelwares/validateToken.js'
import { getWithdrawalsByID } from './controller.js'

const router = express.Router()

router.get('/', validateToken, async (req, res) => {
    try {
        const withdrawals = await getWithdrawalsByID(req.user._id)
        responser.success({ res, message: "Withdrawals retrieved successfully", body: withdrawals })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})


export default router
