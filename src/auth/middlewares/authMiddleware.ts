import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { verify } from '../../utils/auth';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      res.writeHead(401, { 'content-type': 'application/json' });
      res.write(
        JSON.stringify({
          message: 'Authorization is required.',
        }),
      );

      res.end();
    } else {
      const token = req.headers.authorization.replace('Bearer ', '').trim();

      // Other requests using this middleware can get the parsed value in the parameter
      req.body._validated = verify(token);
    }

    next();
  }
}
