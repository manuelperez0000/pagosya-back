import mongoose from 'mongoose'
import 'dotenv/config';

const DB_URI = process.env.DB_URI

const dbConnect = async () => {
    await mongoose.connect(DB_URI)
    console.log('DB connected')
}

export default dbConnect