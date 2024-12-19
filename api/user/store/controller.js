import User from './model.js'

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
