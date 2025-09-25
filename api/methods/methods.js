import express from 'express'
import responser from '../../network/response.js'
import validateToken from '../../midelwares/validateToken.js'
import { savePaymentMethod } from './methodsController.js';
import onlySuperAdmin from '../../midelwares/onlySuperAdmin.js'

const router = express.Router()

router.post('/', validateToken, async (req, res) => {
    try {
        const { currencyName,
            currencyType,
            abbreviation,
            userName,
            phone,
            acountNumber,
            document,
            bank,
            email,
            metodo,
            exchangeRateToUSD,
            buyPrice,
            sellPrice,
            userId } = req.body

        // Validar que buyPrice sea menor o igual a sellPrice
        /* if (buyPrice > sellPrice) {
            responser.error({ res, message: 'El precio de compra no puede ser mayor que el precio de venta.' })
        } */

        // Crear un nuevo método de pago
        /* const savedPaymentMethod = await savePaymentMethod({
            currencyName,
            currencyType,
            abbreviation,
            userName,
            phone,
            acountNumber,
            document,
            bank,
            email,
            metodo,
            exchangeRateToUSD,
            buyPrice,
            sellPrice,
            userId: req.user._id,
        })

        responser.success({ res, message: "Success", body: savedPaymentMethod }) */

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
