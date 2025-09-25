import Tasa from "./tasaModel.js";

export const save = async (tasaData) => {
    const tasa = new Tasa(tasaData);
    return await tasa.save();
};

export const find = async (data) => {
    return await Tasa.findOne(data);
}

export const findAll = async () => await Tasa.find();

export const update = async (tasaData) => {
    const { sell, buy, _id } = tasaData;
    return await Tasa.findByIdAndUpdate(_id, { sell, buy }, { new: true });
};

export const findAllWhithMethods = async () => {
    return await Tasa.find().populate('methodId').exec();
}


