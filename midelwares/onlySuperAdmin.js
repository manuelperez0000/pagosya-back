import jwt from 'jsonwebtoken'
import responser from '../network/response.js'
import { findUserById } from '../api/user/store/controller.js'
const validateToken = (req, res, next) => {

    const DATA_TOKEN = process.env.JWT_SECRET
    const authorization = req.headers.authorization || ''
    const token = authorization.slice(7)

    try {
        jwt.verify(token, DATA_TOKEN, async (err, decoded) => {
            if (err) {

                responser.error({ res, message: 'Error de validacion del token ' + err.message });
            } else {
                req.user = await findUserById(decoded._id)
                req.token = token
                if (req.user.level != 1) {
                    responser.error({ res, message: 'Error, no es super admin.' });
                } else {
                    next()
                }
            }
        })
    } catch (error) {
        console.log(error)
        responser.error({ res, message: error?.message || 'Error al verificar el token del super admin' })
    }
}

export default validateToken