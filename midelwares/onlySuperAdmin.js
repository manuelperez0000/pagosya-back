import jwt from 'jsonwebtoken'
import responser from '../network/response.js'

const validateToken = (req, res, next) => {

    const DATA_TOKEN = process.env.JWT_SECRET
    const authorization = req.headers.authorization || ''
    const token = authorization.slice(7)
    try {
        jwt.verify(token, DATA_TOKEN, (err, decoded) => {
            if (err) {
                throw 'Error de validacion del token del super admin'
            } else {
                req.user = decoded
                req.token = token

                if(req.user.email != 'manuelperez.0000@gmail.com' || req.user._id != '68a23dc5644248458ffc03c1'){
                    throw 'Error, no es super admin.'
                }
                next()
                
            }
        })
    } catch (error) {
        responser.error({ res, message: error?.message || 'Error, No es super admin' })
    }
}

export default validateToken