import User from "../user/store/model.js"
import Contacts from "./contactsModel.js"

export const saveContact = async (email, from) => {
    const contact = await User.findOne({ email })
    console.log("Save contact: ", contact)
    if (contact) {
        const name = contact.name
        Contacts({ name, email, from }).save()
    }
}

export const deleteContac = async ({ contactId }) => {

}


export const enviar = async ({ from, to, amount }) => {

    const rfrom = await User.findOneAndUpdate({ email: from }, { $inc: { balance: -amount } }, { new: true })
    const rto = await User.findOneAndUpdate({ email: to }, { $inc: { balance: amount } }, { new: true })

    return { from: rfrom, to: rto }
}

export const confirm = async ({ from, to, amount }) => {

    //rules
    /* 1 ./ remitenete no existe
    2 ./ receptor no existe
    3 ./ balance insuficiente
    4 ./ balance invalido */


    //obtener el from
    const userFrom = await User.findOne({ email: from })
    if (!userFrom) return { confirm: false, error: 1, message: "Emisor " + from + " no existe" }

    //obtener el to
    const userTo = await User.findOne({ email: to })
    if (!userTo) return { confirm: false, error: 2, message: "Receptor no existe" }

    //el balance del from debe ser superior o igual a amount
    if (userFrom.balance < amount) return { confirm: false, error: 3, message: "Saldo insuficiente" }

    if (amount <= 0) return { confirm: false, error: 4, message: "Monto invalido" }

    if (from === to) return { confirm: false, error: 5, message: "Correo invalido" }


    return { confirm: true, error: 0, message: "Confirmado con exito", userFrom, userTo, amount }


}