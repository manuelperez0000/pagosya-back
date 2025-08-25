import express from 'express'
import responser from '../../network/response.js'
import { findUserByEmail, findUserById, findContacts, findPaymentMethods } from './store/controller.js'
import { isMongoId, isEmail } from '../../services/dataType.js'
import validateToken from '../../midelwares/validateToken.js'

const router = express.Router()

router.get('/', validateToken, async (req, res) => {
    try {
        /* console.log(req.user) */
        const user = await findUserById(req.user._id)

        const contacts = await findContacts(user?.email)

        const methods = await findPaymentMethods(user?._id)

        responser.success({ res, message: "Success", body: { user, token: req.token, contacts, methods } })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

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
