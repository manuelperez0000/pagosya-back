import User from './model.js'
import Contacts from '../../enviar/contactsModel.js'

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