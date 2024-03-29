import express, { Request, Response, Router } from 'express'
import dotenv from "dotenv"
import { Incomes, User } from '@prisma/client';
import { prisma } from '../utils/prisma';
import { JwtPayload } from 'jsonwebtoken';
import { checkJwt } from '../utils/checkJwt';

dotenv.config();
const incomes: Router = express.Router()


incomes.post("/create", async (req:Request, res: Response) => {
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
    const incomes: Incomes | null = await prisma.incomes.create({
        data:{
            name:name,
            createdAt: new Date(),
            ammount: Number(ammount),
            userId: user.id
        }
    })
    if(!incomes){
        return res.status(403).send({ msg: "Cannot create income", valid: false})
    }
    return res.status(200).send({income: incomes, msg: "Income created", valid: true})
})


incomes.get("/incomes/user", async(req:Request, res: Response) => {
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
    const incomes: Incomes[] | null = await prisma.incomes.findMany({
        where: {
            userId: user.id
        },
        orderBy:{
          createdAt: 'desc'
        },
        take:7
    })
    if(!incomes){
        return res.status(403).send({ msg: "Cannot found income", valid: false})
    }
    return res.status(200).send(incomes)
})


incomes.get("/allIncomes/user", async(req:Request, res: Response) => {
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
  const incomes: Incomes[] | null = await prisma.incomes.findMany({
      where: {
          userId: user.id
      },
      orderBy:{
        createdAt: 'desc'
      }
  })
  if(!incomes){
      return res.status(403).send({ msg: "Cannot found income", valid: false})
  }
  return res.status(200).send(incomes)
})

incomes.get("/getAmmount/", async (req:Request, res:Response) => {
    
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
    const incomes: Incomes[] | null = await prisma.incomes.findMany({
        where:{
            userId: user.id
        }
    })
    if(!incomes){
        return res.status(403).send({ msg: "Cannot found income", valid: false})
    }
    
    return res.status(200).send(incomes.map((e) => (
        
         e.ammount
        )))
    
})

incomes.get("/getIncomeId", async (req: Request, res: Response) => {

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
  const incomes: Incomes[] | null = await prisma.incomes.findMany({
    where: {
      userId: user.id
    }
  })
  if (!incomes) {
    return res.status(403).send({ msg: "Cannot found income", valid: false })
  }
  return res.status(200).send(incomes.map((e) => {return  e.id}))
})

incomes.delete("/deleteIncome/:id", async (req: Request, res: Response) => {
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
    const incomes: Incomes | null = await prisma.incomes.delete({
      where: {
        id: id
      }
    })
    if (!incomes) {
      return res.status(403).send({ msg: "Cannot delete income", valid: false })
    }
    return res.status(200).send({ msg: "Income deleted", income:incomes, valid: false })
  })

export {incomes}
