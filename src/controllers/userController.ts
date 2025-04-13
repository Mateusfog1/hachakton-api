import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'; 

const prisma = new PrismaClient(); 

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body

  try {
    const user = await prisma.uSER.create({
      data: {
        name,
        email,
        password,
        role // opcional: se não mandar, vira 'CIDADAO'
      }
    })
    return res.status(201).json(user)
  } catch (error: any) {
    console.error(error)
    return res.status(500).json({ error: error.message })
  }
}
