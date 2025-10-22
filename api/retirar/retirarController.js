import Retirar from './retirarModel.js'
import Tasa from '../tasas/tasaModel.js'

const addRetiro = async (data) => {

    const { tasa, amount } = data

    const tasaInfo = await Tasa.findById(tasa)

    const result = tasaInfo.buy * amount

    const newRetiro = new Retirar({ ...data, result })
    const retiroSaved = await newRetiro.save()
    const resposeRetiro = await getRetiro(retiroSaved._id)
    return resposeRetiro
}

const getRetiro = async (id) => {
    return await Retirar.findById(id)
        .populate('userFrom', 'name email')
        .populate('method')
        .populate('tasa')
}

const getPendingRetiros = async () => {
    return await Retirar.find({ status: 'pending' })
        .populate('userFrom', 'name email')
        .populate('method')
        .populate('tasa')
}

const getRetirosByUser = async (userId) => {
    return await Retirar.find({
        $or: [
            { userFrom: userId },
            { agent: userId }
        ]
    })
        .populate('userFrom', 'name email')
        .populate('agent', 'name email')
        .populate('method')
        .populate('tasa')
}

const attend = async (id, agent) => {
    //cambiar el agent y el status
    return Retirar.findByIdAndUpdate(
        id, { agent, status: 'taken' }, { new: true }
    ).populate('userFrom')
        .populate('agent')
        .populate('method')
        .populate('tasa')
}

export default {
    addRetiro,
    getRetiro,
    getPendingRetiros,
    getRetirosByUser,
    attend
}
