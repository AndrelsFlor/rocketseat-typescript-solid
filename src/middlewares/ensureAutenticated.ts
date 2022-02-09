import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { UserRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(request: Request, response: Response,
  next: NextFunction): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    // "as" força o tipo do retorno
    const { sub: user_id } = verify(token, 'allonsy') as IPayload;

    const usersRepository = new UserRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new Error('User does not exists!');
    }

    next();
  } catch (err) {
    throw new Error('Invalid token');
  }
}
