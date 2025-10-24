import express from 'express'
import responser from '../../network/response.js'
import validateToken from '../../midelwares/validateToken.js'
import { savePaymentMethod, getMethodsById, deleteMethod } from './methodsController.js';
import onlySuperAdmin from '../../midelwares/onlySuperAdmin.js'

const router = express.Router()

router.delete('/:methodId', validateToken, async (req, res) => {
    try {
        const methodId = req.params.methodId
        console.log(methodId)
        const response = await deleteMethod(methodId)
        responser.success({ res, message: "Deleted successfully", body: response })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

router.get('/:userId', validateToken, async (req, res) => {
    const userId = req.params.userId
    try {
        const response = await getMethodsById(userId)
        responser.success({ res, message: "success getting user methods", body: response })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

router.post('/', validateToken, async (req, res) => {

    try {
        const method = req.body.methodId
        const reqBody = req.body

        const objToSave = {
            userId: req.user._id,
            currencyName: method.currencyName,
            currencyType: method.currencyType,
            abbreviation: method.abbreviation,
            methodId: method.methodId,
            email: reqBody?.email || null,
            phone: reqBody?.phone || null,
            accountNumber: reqBody?.accountNumber || null,
            document: reqBody?.document || null,
            bank: reqBody?.bank || null,
            userName: reqBody?.nombre || null,
            accountType: reqBody?.tipoCuenta || null
        }

        console.log("objToSave: ", objToSave)
        const savedPaymentMethod = await savePaymentMethod(objToSave)

        responser.success({ res, message: "Success", body: savedPaymentMethod })

    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
});

router.post('/newMethods', onlySuperAdmin, async (req, res) => {
    try {

        const method = {
            currencyName: req.body.currencyName,
            currencyType: req.body.currencyType,
            abbreviation: req.body.abbreviation,
            exchangeRateToUSD: req.body.exchangeRateToUSD,
            buyPrice: req.body.buyPrice,
            sellPrice: req.body.sellPrice,
        }

        // Aquí puedes agregar la lógica para guardar el nuevo método de pago
        const savedMethod = await savePaymentMethod(method)
        responser.success({ res, message: "Método de pago creado", body: savedMethod })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

router.post('/save', validateToken, async (req, res) => {
    try {
        console.log(req.body);
        const body = req.body
        responser.success({ res, message: "Success", body: req.body })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})



export default router
