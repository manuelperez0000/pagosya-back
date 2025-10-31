import express from 'express'
import dbConnect from './db/conection.js'
import 'dotenv/config';
import cors from 'cors'
import router from './router.js'
import morgan from 'morgan';
import { Server } from 'socket.io';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const PORT = process.env.PORT || 3000
const app = express()
const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use(express.json())

app.use(morgan('dev'))

app.use(cors())

app.use(express.static(path.join(__dirname, 'dist')))

dbConnect()

app.get('/', (req, res) => { res.send('Welcom to PagosYa') })

router(app)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
  /* console.log("servidor corriendo") */
});

export { io }
