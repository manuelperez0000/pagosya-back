import express from 'express'
import responser from '../../network/response.js'
import validateToken from '../../midelwares/validateToken.js'

const router = express.Router()

router.post('/deleteUser', validateToken, async (req, res) => {
    try {
        

        responser.success({ res, message: "Success", body:{} })

    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
});

export default router
