import express from 'express'
import responser from '../../network/response.js'
import validateToken from '../../midelwares/validateToken.js'
import { savePaymentMethod } from './methodsController.js';

const router = express.Router()

router.post('/', validateToken, async (req, res) => {
    try {
        const { currencyName, currencyType, abbreviation, exchangeRateToUSD, buyPrice, sellPrice } = req.body

        // Validar que buyPrice sea menor o igual a sellPrice
        if (buyPrice > sellPrice) {
            responser.error({ res, message: 'El precio de compra no puede ser mayor que el precio de venta.' })
        }

        // Crear un nuevo método de pago
        const savedPaymentMethod = await savePaymentMethod({
            currencyName,
            currencyType,
            abbreviation,
            exchangeRateToUSD,
            buyPrice,
            sellPrice,
        })

        responser.success({ res, message: "Success", body: savedPaymentMethod })

    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
});

export default router
