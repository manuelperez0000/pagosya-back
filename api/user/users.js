import express from 'express'
import { findAllUsers, changeUserLevel } from './store/controller.js';
import responser from '../../network/response.js'
import onlySuperAdmin from '../../midelwares/onlySuperAdmin.js'

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await findAllUsers();
        responser.success({ res, message: 'Users retrieved successfully', body: users });
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
});

router.put('/', onlySuperAdmin, async (req, res) => {
    try {
        const { level, _id } = req.body;
        const userId = req.user._id;
        if (userId == _id) return responser.error({ res, message: 'No puedes cambiar tu propio nivel' });

        const body = await changeUserLevel({ level, _id });
        responser.success({ res, message: 'User updated successfully', body });
    } catch (error) {
        responser.error({ res, message: error?.message || error })
    }
});



export default router;
