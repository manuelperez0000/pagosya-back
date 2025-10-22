import PaymentMethod from '../methods/methodsModel.js'

export const save = async (req) => {
    const adminMethod = req.body
    const userId = req.user._id
    const userName = req.user.name
    const data = {
        currencyName: adminMethod?.currencyName,
        currencyType: adminMethod?.currencyType,
        abbreviation: adminMethod?.abbreviation,
        accountType: adminMethod?.accountType,
        userId,
        userName,
        phone: adminMethod?.phone,
        accountNumber: adminMethod?.accountNumber,
        document: adminMethod?.document,
        bank: adminMethod?.bank,
        email: adminMethod?.email,
        methodId: adminMethod?.methodId
    }

    try {
        const newMethod = new PaymentMethod(data)
        await newMethod.save()
        return {
            message: 'Admin method saved successfully',
            body: newMethod
        }
    } catch (error) {
        console.error('Error saving admin method:', error)
        throw new Error('Error saving admin method')
    }
}

export const get = async () => {
    const MASTER_USER = process.env.MASTER_USER
    const MASTER_ID = process.env.MASTER_ID
    try {
        const methods = await PaymentMethod.find({ userName: MASTER_USER, userId: MASTER_ID })
        return {
            message: 'Admin methods retrieved successfully',
            body: methods
        }
    } catch (error) {
        console.error('Error retrieving admin methods:', error)
        throw new Error('Error retrieving admin methods')
    }
}

export const remove = async (id) => {
    try {
        const removed = await PaymentMethod.findByIdAndDelete(id)
        return {
            message: 'Admin method deleted successfully',
            body: removed
        }
    } catch (error) {
        console.error('Error deleting admin method:', error)
        throw new Error('Error deleting admin method')
    }
}   
