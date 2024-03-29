import bcrypt from 'bcrypt';
import { appEnv } from './env';

export const generatePassword = async (plainPassword: string): Promise<string> => {
  return (await bcrypt.hash(plainPassword, appEnv.SALT_ROUNDS));
}

export const passwordsMatch = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return (await bcrypt.compare(plainPassword, hashedPassword));
}