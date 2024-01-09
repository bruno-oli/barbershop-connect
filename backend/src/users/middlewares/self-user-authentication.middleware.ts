import { Injectable, NestMiddleware } from '@nestjs/common';
import { UsersService } from '../users.service';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

@Injectable()
class SelfUserAuthenticationMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const [, token] = req.headers.authorization?.split(' ') ?? [];

    const secret = process.env.JWT_SECRET;

    if (!token) {
      return res.json({ message: 'Não autorizado' }).status(401).send();
    }

    const user = await this.usersService.findOneById(id);

    if (!user) {
      return res.json({ message: 'Não autorizado' }).status(401).send();
    }

    try {
      const decoded = jwt.verify(token, secret) as { id: string };

      if (user.id !== decoded.id) {
        return res.json({ message: 'Não autorizado' }).status(401).send();
      }

      return next();
    } catch (error) {
      return res.json({ message: 'Não autorizado' }).status(401).send();
    }
  }
}

export { SelfUserAuthenticationMiddleware };
