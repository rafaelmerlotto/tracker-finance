import express, { Request, Response, Router } from 'express'
import { JwtKey, User } from '@prisma/client'
import { getToken } from '../utils/key';
import bcrypt, { compareSync } from 'bcryptjs'
import dotenv from "dotenv"
import { prisma } from '../utils/prisma';
import { JwtPayload } from 'jsonwebtoken';
import { checkJwt } from '../utils/checkJwt';


dotenv.config();
const auth: Router = express.Router()


async function verifyUser(email: string, password: string): Promise<User | false> {
    const user: User | null = await prisma.user.findUnique({
        where: {
            email: email,
        },
        include: {
            jwt: true
        }
    })
    if (!user) {
        return false
    }
    if (!compareSync(password, user.password)) {
        return false
    }
    return user
}

async function generateJwt(user: User): Promise<string> {
    const jwtKeys: JwtKey = await getToken(user);
    return jwtKeys.accessToken;
}




auth.post('/register', async (req: Request, res: Response) => {
    const { email, password, fullName } = req.body;
    const passwordHash: string = bcrypt.hashSync(password, 5)
    const user: User | null = await prisma.user.create({
        data: {
            email: email,
            password: passwordHash,
            fulName: fullName
        }
    })
    if (!user) {
        return res.status(400).send({ msg: 'Cannot create User', valid: false })
    }
    return res.status(201).send({ user: user, msg: 'User created!', valid: true })
})


auth.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user: User | false = await verifyUser(email, password)
    if (!user) {
        return res.status(400).send({ msg: 'Authentication not valid', valid: false })
    }
    if (!compareSync(password, user.password)) {
        return null
    }
    const token: string = await generateJwt(user)
    return res.status(200).send({ msg: `Hello `, accessToken: token, valid: true })
})

auth.post('/ammount', async (req: Request, res: Response) => {
    const { mainAccount } = req.body
    const accessToken = req.headers.authorization
    const payload: JwtPayload | null = checkJwt(accessToken!);
    if (!payload) {
        return res.status(401).send({ msg: "Token not valid", valid: false });
    }

    const userId: string = payload.userId
    const user: User | null = await prisma.user.findUnique({
        where: {
            id: userId,
        }
    })
    if (!user) {
        return res.status(401).send({ msg: "User not valid", valid: false });
    }
    const ammountUser: User | null = await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            mainAccount: mainAccount
        },
        include: {
            expenses: true,
            incomes: true,
            savings: true
        }
    })
    if (!ammountUser) {
        return res.status(404).send({ msg: "Cannot found income", valid: false })
    }
    return res.status(200).send({ mgs: "Ammount user found", ammount: ammountUser.mainAccount, valid: true })
})


auth.post('/getUsername', async (req: Request, res: Response) => {
    const { fullName } = req.body
    const accessToken = req.headers.authorization
    const payload: JwtPayload | null = checkJwt(accessToken!);
    if (!payload) {
        return res.status(401).send({ msg: "Token not valid", valid: false });
    }

    const userId: string = payload.userId
    const user: User | null = await prisma.user.findUnique({
        where: {
            id: userId,
        }
    })
    if (!user) {
        return res.status(401).send({ msg: "User not valid", valid: false });
    }
    const username: User | null = await prisma.user.findUnique({
        where: {
            id: user.id,
        }
    })
    if (!username) {
        return res.status(404).send({ msg: "Cannot found username", valid: false })
    }
    return res.status(200).send({ mgs: "Username found", username: user.fulName, email: user.email, valid: true })
})



auth.delete('/deleteAccount', async (req: Request, res: Response) => {
    const accessToken = req.headers.authorization
    const payload: JwtPayload | null = checkJwt(accessToken!);
    if (!payload) {
        return res.status(401).send({ msg: "Token not valid", valid: false });
    }
    const userId: string = payload.userId;
    const user: User | null = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });
    if (!user) {
        return res.status(401).send({ msg: "User not valid", valid: false });
    }
    await prisma.jwtKey.deleteMany({
        where: {
            userId: user.id
        }
    })
    await prisma.incomes.deleteMany({
        where: {
            userId: user.id
        }
    })
    await prisma.expenses.deleteMany({
        where: {
            userId: user.id
        }
    })
    await prisma.savings.deleteMany({
        where: {
            userId: user.id
        }
    })
    const deleteUser: User | null = await prisma.user.delete({
        where: {
            id: user.id
        }
    })
    if (!deleteUser) {
        return res.status(500).send({ msg: "Internal server error.", valid: false });
    }
    return res.status(200).send({ msg: "Account deleted correctly.", valid: true });
})

export { auth }