import express from 'express'
/* import router from './router.js' */
import dbConnect from './db/conection.js'
import 'dotenv/config';
import cors from 'cors'

const PORT = process.env.PORT || 3000
const app = express()
app.use(express.json())

/* 
app.use(cors()) */
/* dbConnect() */

app.get('/', (req, res) => { res.send('Welcom to PagosYa') })

/* router(app) */

app.listen(PORT, () => {
  /* console.log(`Servidor corriendo en http://localhost:${PORT}`) */
  console.log("servidor corriendo")
});
