import express from 'express';
import dotenv from 'dotenv';
import {auth} from './routes/auth'

dotenv.config();

const server = express();


server.use(express.json())
server.use('/auth', auth)



const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`server started at 🚀 http://localhost:${PORT}`)
})
