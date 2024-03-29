import dotenv from 'dotenv'
dotenv.config()

export const appEnv = {
  PORT: process.env.PORT ?? 8765
}
