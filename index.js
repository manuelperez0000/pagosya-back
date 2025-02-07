import express from 'express'
import router from './router.js'
import dbConnect from './db/conection.js'
import morgan from 'morgan'
import 'dotenv/config';

const PORT = process.env.PORT || 3000
const app = express()
app.use(express.json())

app.use(morgan('dev'))

dbConnect()

app.get('/', (req, res) => { res.send('Welcom to PagosYa') })

router(app)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
});
