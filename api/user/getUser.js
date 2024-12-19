import express from 'express'
import responser from '../../network/response.js'
import { findUserByEmail, findUserById } from './store/controller.js'
import { isMongoId, isEmail } from '../../services/dataType.js'

const router = express.Router()

router.get('/:emailOrId', async (req, res) => {
    try {
        const { emailOrId } = req.params

        if (isMongoId(emailOrId)) {
            const response = await findUserById(emailOrId)
            if (!response) return responser.error({ res, message: "Id no encontrado", status: 400 })
            return responser.success({ res, message: "Success", body: response })
        }

        if (isEmail(emailOrId)) {
            const response = await findUserByEmail(emailOrId)
            if (!response) return responser.error({ res, message: "Email no encontrado", status: 400 })
            return responser.success({ res, message: "Success", body: response })
        }

        responser.error({ res, message: "Usuario no encontrado", status: 400 })

    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

export default router
