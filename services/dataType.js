const regex = /^[0-9a-fA-F]{24}$/
export const isMongoId = (id2) => regex.test(id2)

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const isEmail = (email) => emailRegex.test(email)