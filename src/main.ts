import express, { NextFunction, Response, Request } from 'express'
import swaggerUi from 'swagger-ui-express'
import router from './routes/index.routes'
import cors from 'cors'
import { appEnv } from './utils/env'
import dbConnection from './config/db'

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.use(
  '/api/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json'
    }
  })
)
app.use(router)
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  return res.status(500).json({ error: err.message });
})
void dbConnection().then(() => {
  app.listen(appEnv.PORT)
  console.log(`App is running on port ${appEnv.PORT}`)
}).catch(error => {
  console.log(error)
})
