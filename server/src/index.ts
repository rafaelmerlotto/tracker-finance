import express from 'express';
import dotenv from 'dotenv';
import {auth} from './routes/auth'
import {incomes} from './routes/incomes'
import {expenses} from './routes/expenses'
import cors from 'cors'
import { savings } from './routes/savings';

dotenv.config();
const server = express();

server.use(cors())
server.use(express.json())
server.use('/auth', auth)
server.use('/incomes', incomes)
server.use('/expenses', expenses)
server.use('/savings', savings
)



const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`server started at 🚀 http://localhost:${PORT}`)
})


