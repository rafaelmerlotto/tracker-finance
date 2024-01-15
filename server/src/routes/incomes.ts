import express, { Request, Response, Router } from 'express'
import dotenv from "dotenv"
import { Income, User } from '@prisma/client';
import { prisma } from '../utils/prisma';
import { JwtPayload } from 'jsonwebtoken';
import { checkJwt } from '../utils/checkJwt';

dotenv.config();
const income: Router = express.Router()


income.post("/create", async (req:Request, res: Response) => {
    const {name, ammount } = req.body
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
    const income: Income | null = await prisma.income.create({
        data:{
            name:name,
            createdAt: new Date(),
            ammount: Number(ammount),
            userId: user.id
        }
    })
    if(!income){
        return res.status(403).send({ msg: "Cannot create income", valid: false})
    }
    return res.status(200).send({income: income, msg: "Income created", valid: true})
})


income.get("/incomes/user", async(req:Request, res: Response) => {
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
    const income: Income[] | null = await prisma.income.findMany({
        where: {
            userId: user.id
        },
        orderBy:{
          createdAt: 'desc'
        },
        take:7
    })
    if(!income){
        return res.status(403).send({ msg: "Cannot found income", valid: false})
    }
    return res.status(200).send(income)
})

income.get("/getAmmount/", async (req:Request, res:Response) => {
    
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
    const income: Income[] | null = await prisma.income.findMany({
        where:{
            userId: user.id
        }
    })
    if(!income){
        return res.status(403).send({ msg: "Cannot found income", valid: false})
    }
    
    return res.status(200).send(income.map((e) => (
        
         e.ammount
        )))
    
})

income.get("/getIncomeId", async (req: Request, res: Response) => {

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
  const income: Income[] | null = await prisma.income.findMany({
    where: {
      userId: user.id
    }
  })
  if (!income) {
    return res.status(403).send({ msg: "Cannot found income", valid: false })
  }
  return res.status(200).send(income.map((e) => {return  e.id}))
})

income.delete("/deleteIncome/:id", async (req: Request, res: Response) => {
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
    const incomes: Income | null = await prisma.income.delete({
      where: {
        id: id
      }
    })
    if (!incomes) {
      return res.status(403).send({ msg: "Cannot delete income", valid: false })
    }
    return res.status(200).send({ msg: "Income deleted", income:income, valid: false })
  })

export {income}
