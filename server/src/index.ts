import express from 'express';
import dotenv from 'dotenv';
import {auth} from './routes/auth'
import {income} from './routes/incomes'
import {expenses} from './routes/expenses'
import cors from 'cors'

dotenv.config();
const server = express();

server.use(cors())
server.use(express.json())
server.use('/auth', auth)
server.use('/incomes', income)
server.use('/expenses', expenses)



const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`server started at 🚀 http://localhost:${PORT}`)
})
