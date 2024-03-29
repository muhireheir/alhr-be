import mongoose from 'mongoose'
import { appEnv } from '../utils/env'

const dbConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(appEnv.DATABASE_URL!)
  } catch (error) {
    console.log(error)
  }
}
export default dbConnection
