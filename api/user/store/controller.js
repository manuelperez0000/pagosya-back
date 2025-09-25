import User from './model.js'
import Contacts from '../../enviar/contactsModel.js'
import PaymentMethod from '../../methods/methodsModel.js'

export const saveUser = async (userData) => {
    try {
        return await User(userData).save()
    } catch (error) {
        return error
    }
}

export const findUserByEmail = async (email) => {
    return await User.findOne({ email })
}

export const findUserById = async (_id) => {
    return await User.findById({ _id })
}

export const login = async ({ email, password }) => {
    return await User.find({ email, password })
}

export const findContacts = async (email) => {
    const response = await Contacts.find({ from: email })
    return response
}

export const getUserIdFromEmail = async ({ email }) => {
    const response = await User.findOne({ email })
    return response
}

export const findPaymentMethods = async (userId) => {
    const response = await PaymentMethod.find({ userId })
    return response
}

export const findAllUsers = async () => {
    const response = await User.find()
    return response
}

export const changeUserLevel = async ({ level, _id }) => {
    try {
        const user = await User.findByIdAndUpdate(_id, { level }, { new: true });
        return user;
    } catch (error) {
        return error;
    }
}
