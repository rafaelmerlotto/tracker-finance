import express, { Request, Response, Router } from 'express'
import dotenv from "dotenv"
import { Expenses, User } from '@prisma/client';
import { prisma } from '../utils/prisma';
import { JwtPayload } from 'jsonwebtoken';
import { checkJwt } from '../utils/checkJwt';

dotenv.config();
const expenses: Router = express.Router()


expenses.post("/create", async (req: Request, res: Response) => {
  const { name, ammount } = req.body
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
  const expenses: Expenses | null = await prisma.expenses.create({
    data: {
      name: name,
      createdAt: new Date(),
      ammount: Number(ammount),
      userId: user.id
    }
  })
  if (!expenses) {
    return res.status(403).send({ msg: "Cannot create expense", valid: false })
  }
  return res.status(200).send({ expenses: expenses, msg: "expense created", valid: true })
})

expenses.get("/expenses/user", async (req: Request, res: Response) => {
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
  const expenses: Expenses[] | null = await prisma.expenses.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 7
  })
  if (!expenses) {
    return res.status(403).send({ msg: "Cannot found income", valid: false })
  }
  return res.status(200).send(expenses)
})

expenses.get("/getExpenses/", async (req: Request, res: Response) => {

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
  const expenses: Expenses[] | null = await prisma.expenses.findMany({
    where: {
      userId: user.id
    }
  })
  if (!expenses) {
    return res.status(403).send({ msg: "Cannot found expenses", valid: false })
  }
  return res.status(200).send(expenses.map((e) => (e.ammount)))
})


expenses.get("/getExpenseId", async (req: Request, res: Response) => {

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
  const expenses: Expenses[] | null = await prisma.expenses.findMany({
    where: {
      userId: user.id
    }
  })
  if (!expenses) {
    return res.status(403).send({ msg: "Cannot found expenses", valid: false })
  }
  return res.status(200).send(expenses.map((e) => {return  e.id}))
})

expenses.delete("/deleteExpense/:id", async (req: Request, res: Response) => {
const {id} = req.params
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
  const expenses: Expenses | null = await prisma.expenses.delete({
    where: {
      id: id
    }
  })
  if (!expenses) {
    return res.status(403).send({ msg: "Cannot delete expense", valid: false })
  }
  return res.status(200).send({ msg: "Expense deleted", expenses:expenses, valid: false })
})

export { expenses }