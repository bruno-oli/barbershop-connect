import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from '../users.service';
import jwt from 'jsonwebtoken';

@Injectable()
class UserAuthenticationMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const [, token] = req.headers.authorization?.split(' ') ?? [];
    const secret = process.env.JWT_SECRET;

    if (!token) {
      return res.json({ message: 'Não autorizado' }).status(401).send();
    }

    try {
      const decoded = jwt.verify(token, secret) as { id: string };

      const user = await this.usersService.findOneById(decoded.id);

      if (!user) {
        return res.json({ message: 'Não autorizado' }).status(401).send();
      }

      return next();
    } catch (error) {
      return res.json({ message: 'Não autorizado' }).status(401).send();
    }
  }
}

export { UserAuthenticationMiddleware };
