import bcrypt from 'bcrypt';
import { appEnv } from './env';

export const generatePassword = (plainPassword: string): string => {
  return bcrypt.hashSync(plainPassword, appEnv.SALT_ROUNDS);
}