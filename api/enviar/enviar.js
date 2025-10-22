import express from 'express'
import responser from '../../network/response.js'
import validateToken from '../../midelwares/validateToken.js'
import { enviar, confirm, saveContact } from './controller.js'
import validate from '../../services/validate.js'
import { io } from '../../index.js';
import { saveTransaction } from '../transactions/transactionController.js' //el problema
import { getUserIdFromEmail } from '../user/store/controller.js'

const router = express.Router()

router.post('/', validateToken, async (req, res) => {
    try {
        const { to, amount, checked } = req.body

        const from = req.user.email

        const response = await enviar({ from, to, amount })
        const fromId = await getUserIdFromEmail({ email: from })
        const toId = await getUserIdFromEmail({ email: to })

        await saveTransaction({
            fromId, toId, fromEmail: from, toEmail: to, amount
        })

        if (checked) saveContact(to, from)

        if (response.from && response.to) {

            io.emit('userData', response)

            responser.success({ res, message: "Enviado con exito", body: { from, to, amount, info: response, status: true } })
        } else {
            throw 'Error al realizar el envio'
        }

    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

router.post('/confirm', validateToken, async (req, res) => {

    try {
        const { to, amount } = req.body

        validate.required([to, amount])
        validate.number(amount, "Monto invalido")
        validate.email(to, "formato de correo invalido")

        const from = req.user.email

        const response = await confirm({ from, to, amount })

        const { message } = response

        if (response.confirm) {
            responser.success({ res, message, body: response })
            return
        } else {
            responser.error({ res, message, status: 400, body: response })
            return
        }

    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

export default router