import * as jwt from 'jsonwebtoken';

export function verify(token: string) {
  const jwtSecret = process.env.JWT_SECRET || 'mysecret';

  return jwt.verify(token, jwtSecret);
}
