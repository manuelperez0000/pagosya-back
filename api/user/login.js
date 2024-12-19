import express from 'express'
import responser from '../../network/response.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { findUserByEmail } from './store/controller.js'

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await findUserByEmail(email)
        if (!user) {
            return responser.error({ res, status: 400, message: "Usuario no registrados" })
        }

        // Comparamos las contraseñas
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return responser.error({ res, status: 400, message: "Contraseña incorrecta" })
        }

        // Si la contraseña es correcta, generamos un token JWT
        const token = jwt.sign(
            { _id: user._id, name: user.name, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '10h' }
        )

        user.password = undefined

        responser.success({ res, message: "Success", body: { user, token } })

    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

export default router