import PaymentMethod from "./methodsModel.js"
import validate from "../../services/validate.js"
export const savePaymentMethod = async ({
    currencyName,
    currencyType,
    abbreviation,
    exchangeRateToUSD,
    buyPrice,
    sellPrice,
    userName,
    phone,
    acountNumber,
    document,
    bank,
    email,
    methodId,
    userId
}) => {
    // Aquí puedes agregar la lógica para validar los datos antes de guardarlos
    /* if (buyPrice > sellPrice) {
        throw new Error('El precio de compra no puede ser mayor que el precio de venta.')
    } */

    validate.string(currencyName,"Falta el nombre o no es un string")
    validate.string(currencyType,"Falta el tipo de moneda o no es un string")
    validate.string(abbreviation,"Falta la abreviatura o no es un string")
    validate.number(exchangeRateToUSD,"El tipo de cambio a USD no es un número")
    validate.number(buyPrice,"El precio de compra no es un número")
    validate.number(sellPrice,"El precio de venta no es un número")

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
        metodo,
        exchangeRateToUSD,
        buyPrice,
        sellPrice,
        userId
    })

    await newPaymentMethod.save()

    return newPaymentMethod
}

