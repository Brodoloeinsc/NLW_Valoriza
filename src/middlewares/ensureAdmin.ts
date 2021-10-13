import { Request, Response, NextFunction } from 'express'
import { getCustomRepository } from 'typeorm';
import { UserRepositories } from '../repositories/UserRepositories';

export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
  
  const { user_id } = req;
  console.log(user_id)
  
  const usersRepositories = getCustomRepository(UserRepositories)

  const { admin } = await usersRepositories.findOne(user_id)

  // Verificar se é usuário adm

  if(admin){
    return next();
  }

  return res.status(401).json({
    error: "Unauthorized",
  });
}