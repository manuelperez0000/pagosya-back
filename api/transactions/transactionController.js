import TransactionModel from "./transactionModel.js"

export const saveTransaction = async ({ fromId, toId, fromEmail, toEmail, amount }) => {

    const data = { fromId, toId, fromEmail, toEmail, amount }

    return await TransactionModel(data).save()
}

export const getTransactionsByeEmail = async ({ email }) => {

    return await TransactionModel.find({ $or: [{ fromEmail: email }, { toEmail: email }] }).sort({ createdAt: -1 })
}