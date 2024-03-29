import { ITokenData } from '../types/common';
import { appEnv } from './env';
import jwt from 'jsonwebtoken';

export const generateToken = async (data: ITokenData, expiresIn: string | number): Promise<string> => {
  return (jwt.sign(data, appEnv.JWT_SECRET_KEY!, { expiresIn }))
}

export const verifyToken = async (token: string): Promise<ITokenData> => {
  return (jwt.verify(token, appEnv.JWT_SECRET_KEY!)) as ITokenData;
}