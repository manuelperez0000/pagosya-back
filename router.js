import express from 'express'
import cors from 'cors'
import login from './api/user/login.js'
import getUser from './api/user/getUser.js'
import register from './api/user/register.js'
import paymentMethods from './api/methods/methods.js'
import transactions from './api/transactions/transactions.js'
import deposit from './api/deposits/deposits.js'
import enviar from './api/enviar/enviar.js' //el problema
import perfil from './api/perfil/perfil.js'
import response from './network/response.js'
import tasas from './api/tasas/tasas.js'
import users from './api/user/users.js'
import adminMethods from './api/adminMethods/adminMethods.js'
import chats from './api/chats/chats.js'
import releaseMoney from './api/releaseMoney/releaseMoney.js'
import retirar from './api/retirar/retirar.js'
import withdrawals from './api/withdrawals/withdrawals.js'

const route = express.Router();

const router = (app) => {

    app.use('/api/v1', route);
    route.use('/user/login', login);

    app.use(cors());

    route.use('/user/register', register);
    route.use('/user/getUser', getUser);
    route.use('/enviar', enviar);
    route.use('/transactions', transactions);
    route.use('/paymentMethods', paymentMethods);
    route.use('/deposit', deposit);
    route.use('/perfil', perfil);
    route.use('/withdrawal',retirar)
    route.use('/withdrawals',withdrawals)

    route.use('/tasas', tasas);
    route.use('/users', users);
    route.use('/adminMethods', adminMethods);
    route.use('/chats', chats);
    route.use('/releaseMoney', releaseMoney)

    route.use('*', (_, res) => response.error({ res, message: '404 Not Found' }));
}

export default router
