import PaymentMethod from "./methodsModel.js"
import validate from "../../services/validate.js"
export const savePaymentMethod = async ({
    currencyName,
    currencyType,
    abbreviation,
    userName,
    phone,
    acountNumber,
    document,
    bank,
    email,
    methodId,
    userId
}) => {

    validate.string(currencyName,"Falta el nombre o no es un string")
    validate.string(currencyType,"Falta el tipo de moneda o no es un string")
    validate.string(abbreviation,"Falta la abreviatura o no es un string")

    const newPaymentMethod = new PaymentMethod({
        currencyName,
        currencyType,
        abbreviation,
        userName,
        phone,
        acountNumber,
        document,
        bank,
        email,
        methodId,
        userId
    })

    const responseDb = await newPaymentMethod.save()

    return responseDb
}

export const getMethodsById = async (userId)=>{
    const response = await PaymentMethod.find({userId})
    return response
}

export const deleteMethod = async (id) => {
    const response = await PaymentMethod.findByIdAndDelete(id)
    console.log("delete: ",response)
    return response
}
