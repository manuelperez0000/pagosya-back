import express from 'express'
import cors from 'cors'
import login from './api/user/login.js'
import register from './api/user/register.js'
import getUser from './api/user/getUser.js'
import enviar from './api/enviar/enviar.js'
import transactions from './api/transactions/transactions.js'
import paymentMethods from './api/methods/methods.js'

const route = express.Router()

const router = (app) => {

    app.use(cors())
    app.use('/api/v1', route)
    route.use('/user/login', login)
    route.use('/user/register', register)
    route.use('/user/getUser', getUser)
    route.use('/enviar', enviar)
    route.use('/transactions', transactions)
    route.use('/paymentMethods', paymentMethods)


}

export default router