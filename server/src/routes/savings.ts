import express, { Request, Response, Router } from 'express'
import dotenv from "dotenv"
import { Savings, User } from '@prisma/client';
import { prisma } from '../utils/prisma';
import { JwtPayload } from 'jsonwebtoken';
import { checkJwt } from '../utils/checkJwt';

dotenv.config();
const savings: Router = express.Router()

savings.post("/create", async (req: Request, res: Response) => {
    const { ammount } = req.body
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
    const savings: Savings | null = await prisma.savings.create({
      data: {
        createdAt: new Date(),
        ammount: Number(ammount),
        userId: user.id
      }
    })
    if (!savings) {
      return res.status(403).send({ msg: "Cannot create saving", valid: false })
    }
    return res.status(200).send({ savings: savings, msg: "Saving created", valid: true })
  })

  savings.get("/getSavings", async (req: Request, res: Response) => {

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
    const savings: Savings[] | null = await prisma.savings.findMany({
      where: {
        userId: user.id
      }
    })
    if (!savings) {
      return res.status(403).send({ msg: "Cannot found saving", valid: false })
    }
    return res.status(200).send(savings.map((e) => (e.ammount)))
  })


  savings.get("/allSavings/user", async(req:Request, res: Response) => {
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
    const savings: Savings[] | null = await prisma.savings.findMany({
        where: {
            userId: user.id
        },
        orderBy:{
          createdAt: 'desc'
        }
    })
    if(!savings){
        return res.status(403).send({ msg: "Cannot found saving", valid: false})
    }
    return res.status(200).send(savings)
  })



  savings.get("/getAmmount/", async (req:Request, res:Response) => {
    
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
    const savings: Savings[] | null = await prisma.savings.findMany({
        where:{
            userId: user.id
        }
    })
    if(!savings){
        return res.status(403).send({ msg: "Cannot found saving", valid: false})
    }
    
    return res.status(200).send(savings.map((e) => (
        
         e.ammount
        )))
    
})

savings.get("/getSavingId", async (req: Request, res: Response) => {

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
  const savings: Savings[] | null = await prisma.savings.findMany({
    where: {
      userId: user.id
    }
  })
  if (!savings) {
    return res.status(403).send({ msg: "Cannot found saving", valid: false })
  }
  return res.status(200).send(savings.map((e) => {return  e.id}))
})

savings.delete("/deleteSaving/:id", async (req: Request, res: Response) => {
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
    const savings: Savings | null = await prisma.savings.delete({
      where: {
        id: id
      }
    })
    if (!savings) {
      return res.status(403).send({ msg: "Cannot delete saving", valid: false })
    }
    return res.status(200).send({ msg: "Saving deleted", saving:savings, valid: false })
  })


  
  export {savings}