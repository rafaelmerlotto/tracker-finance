import express from 'express';
import dotenv from 'dotenv';
import { auth } from './routes/auth'
import { incomes } from './routes/incomes'
import { expenses } from './routes/expenses'
import cors from 'cors'
import { savings } from './routes/savings';
import path from 'path';

dotenv.config();
const server = express();

server.use(cors())
server.use(express.json())
server.use('/auth', auth)
server.use('/incomes', incomes)
server.use('/expenses', expenses)
server.use('/savings', savings
)

const _dirname = path.dirname("")
const buildPath = path.join(_dirname  , "../client/build");

server.use(express.static(buildPath))

server.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../client/build/index.html"),
        function (err) {
            res.status(500).send(err);
        }
    )
})

// server.get("/", async (req, res) => {
//     return res.status(200).send("Server is running 🚀")
// })

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`server started at 🚀 http://localhost:${PORT}`)
})


