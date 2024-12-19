import express from 'express'
import responser from '../../network/response.js'
import { saveUser } from './store/controller.js'

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const { email, password, name, phone, ci } = req.body

        const resSaveUser = await saveUser({ email, ci, password, name, phone })

        if (!resSaveUser.errorResponse) return responser.success({ res, message: "Success", body: resSaveUser })

        const code = resSaveUser.code
        const keyName = Object.keys(resSaveUser.keyValue)

        const replace = (val) => val === 'email' ? 'Este correo ya se encuentra registrado' : val === 'ci' ? 'Esta cedula ya se encuentra registrada' : 'Este Usuario'

        if (code === 11000) responser.error({ res, message: replace(keyName[0]), status: 400 })


    } catch (error) {
 
        responser.error({ res, message: error?.message || error })
    }
})

export default router