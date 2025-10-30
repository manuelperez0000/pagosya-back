import Retirar from '../retirar/retirarModel.js'

export const getWithdrawalsByID = async (userId) => {

    return await Retirar.find({ $or: [{ agent: userId }, { status: 'pending' }] })
        .populate('method')
        .populate('tasa')
        .populate('agent')
        .populate('userFrom')
}   