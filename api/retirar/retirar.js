import express from 'express'
import responser from '../../network/response.js'
import validateToken from '../../midelwares/validateToken.js'
import controller from './retirarController.js'
import { io } from '../../index.js'

const router = express.Router()

router.post('/', validateToken, async (req, res) => {
    try {
        const { amount, tasa, method } = req.body
        const userFrom = req.user._id

        if (amount === 0 || !amount) {
            return responser.error({ res, message: "Debe ingresar un monto valido", status: 400 })
        }

        if (!tasa || !method) {
            return responser.error({ res, message: 'All fields are required', status: 400 })
        }

        const data = { userFrom, amount, tasa, method }
        const newRetiro = await controller.addRetiro(data)

        const pendingRetiros = await controller.getPendingRetiros()
        io.emit('new-retiro', pendingRetiros)

        responser.success({ res, message: "Withdrawal request created successfully", body: newRetiro })
    } catch (error) {
        console.log(error)
        responser.error({ res, message: error?.message || error })
    }
})

router.get('/pending', validateToken, async (req, res) => {
    try {
        const pendingRetiros = await controller.getPendingRetiros()
        responser.success({ res, message: "Pending withdrawals retrieved successfully", body: pendingRetiros })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

router.get('/:id', validateToken, async (req, res) => {
    try {
        const { id } = req.params
        const retiro = await controller.getRetiro(id)
        if (!retiro) {
            return responser.error({ res, message: "Withdrawal not found", status: 404 })
        }
        responser.success({ res, message: "Withdrawal retrieved successfully", body: retiro })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

router.get('/', validateToken, async (req, res) => {
    try {
        const retiros = await controller.getRetirosByUser(req.user._id)
        responser.success({ res, message: "Withdrawals retrieved successfully", body: retiros })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

router.put('/attend/:id', validateToken, async (req, res) => {
    try {
        const { id } = req.params
        const agent = req.user._id
        const resultAttend = await controller.attend(id, agent)
        responser.success({ res, message: "Withdrawals attend successfully", body: resultAttend })
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
})

export default router
