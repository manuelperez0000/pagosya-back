import express from 'express'
import responser from '../../network/response.js'
import onlySuperAdmin from '../../midelwares/onlySuperAdmin.js'
import { save, get, remove } from './controller.js'
const router = express.Router()

router.post('/saveAdminMethod', onlySuperAdmin, async (req, res) => {

    try {
        const stored = await save(req)
        responser.success({ res, message: stored.message, body: stored.body })

    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

router.get('/', async (_, res) => {

    try {
        const methods = await get()
        responser.success({ res, message: methods.message, body: methods.body })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }

})

router.delete('/:id', onlySuperAdmin, async (req, res) => {

    try {
        const id = req.params.id
        const removed = await remove(id)
        responser.success({ res, message: removed.message, body: removed.body })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})



export default router