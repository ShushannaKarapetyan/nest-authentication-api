import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import config from '../config/configuration';

// verify jwt token
export function verify(token: string) {
  return jwt.verify(token, config().jwtSecret);
}

// compare password
export async function comparePassword(
  password: string,
  userPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, userPassword);
}

export async function hashPassword(password: string): Promise<string> {
  const saltOrRounds = parseInt(config().jwtSalt);
  const salt = await bcrypt.genSalt(saltOrRounds);

  return await bcrypt.hash(password, salt);
}
