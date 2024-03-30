import dotenv from 'dotenv'
dotenv.config()

export const appEnv = {
  PORT: process.env.PORT ?? 8765,
  DATABASE_URL: process.env.DB_CONNECTION_STRING,
  SALT_ROUNDS: 10,
  SENDGRID_KEY: process.env.SENDGRID_API_KEY,
  SENDGRID_EMAIL: process.env.SENDGRID_SENDER_EMAIL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  APP_URL: process.env.APP_URL,
  VERIFY_EMAIL_TEMPLATE: process.env.VERIFY_EMAIL_TEMPLATE,
  GOOGLE_AUTH_CLIENT_ID: process.env.GOOGLE_AUTH_CLIENT_ID,
  GOOGLE_AUTH_SECRET_ID: process.env.GOOGLE_AUTH_SECRET_ID
}
