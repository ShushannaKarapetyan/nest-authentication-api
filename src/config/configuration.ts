import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  port: process.env.PORT || 3001,
  host: process.env.DB_HOST,
  schema: process.env.DB_SCHEMA,
  jwtSecret: process.env.JWT_SECRET || 'mysecret',
  jwtSalt: process.env.JWT_SALT || '10',
  tokenLife: process.env.TOKEN_LIFE || '3600',
}));
