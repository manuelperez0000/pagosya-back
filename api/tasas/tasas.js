import express from 'express'
import responser from '../../network/response.js'
import onlySuperAdmin from '../../midelwares/onlySuperAdmin.js'
import { save, find, findAll, update,findAllWhithMethods } from './tasaController.js'

const router = express.Router()

router.get('/', async (_, res) => {
    try {
        const tasas = await findAll();
        responser.success({ res, message: "Tasas obtenidas", body: tasas });
    } catch (error) {
        responser.error({ res, message: error?.message || error });
    }
});

router.get('/methods', async (_, res) => {
    try {
        const tasas = await findAllWhithMethods();
        responser.success({ res, message: "Métodos obtenidos", body: tasas });
    } catch (error) {
        responser.error({ res, message: error?.message || error });
    }
});

router.post('/', onlySuperAdmin, async (req, res) => {
    try {

        const tasa = {
            methodId: req.body.methodId,
            buy: req.body.buy,
            sell: req.body.sell,
            name: req.body.name,
        }

        const existingTasa = await find({ methodId: tasa.methodId })
        
        if (existingTasa) {
            existingTasa.buy = tasa.buy;
            existingTasa.sell = tasa.sell;
            await update(existingTasa);

            responser.success({ res, message: "Tasa actualizada" })

        } else {
            await save(tasa)
            responser.success({ res, message: "Tasa creada" })
        }

    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})



export default router
