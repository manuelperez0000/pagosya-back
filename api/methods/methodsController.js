import PaymentMethod from "./methodsModel.js"

export const savePaymentMethod = async ({
    currencyName,
    currencyType,
    abbreviation,
    exchangeRateToUSD,
    buyPrice,
    sellPrice,
}) => {
    const newPaymentMethod = new PaymentMethod({
        currencyName,
        currencyType,
        abbreviation,
        exchangeRateToUSD,
        buyPrice,
        sellPrice,
    })

    await newPaymentMethod.save()

    return newPaymentMethod
}

