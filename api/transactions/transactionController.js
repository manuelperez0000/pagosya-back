import TransactionModel from "./transactionModel.js"

export const saveTransaction = async ({ fromId, toId, fromEmail, toEmail, amount }) => {

    /* const data = { fromId, toId, fromEmail, toEmail, amount }

    return await TransactionModel(data).save() */

    return true
}

export const getTransactionsByeEmail = async ({ email }) => {
    return true

    /* return await TransactionModel.find({ $or: [{ fromEmail: email }, { toEmail: email }] }).sort({ createdAt: -1 }) */
}