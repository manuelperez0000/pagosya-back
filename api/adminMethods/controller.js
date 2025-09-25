import PaymentMethod from '../methods/methodsModel.js'

export const save = async (req) => {
    const adminMethod = req.body
    const userId = req.user._id
    const userName = req.user.name
    //68a296883f97d6b517166e73

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
    try {
        const methods = await PaymentMethod.find()
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
