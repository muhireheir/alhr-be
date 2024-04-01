import express, { NextFunction, Response, Request } from 'express'
import swaggerUi from 'swagger-ui-express'
import router from './routes/index.routes'
import cors from 'cors'
import { appEnv } from './utils/env'
import dbConnection from './config/db'
import session from 'express-session';
import { HttpError } from './utils/misc/HttpError'
const app = express()
app.use(express.json())
app.use(cors())
app.use(session({
  secret: appEnv.JWT_SECRET_KEY!,
  saveUninitialized: false,
  resave: false
}))
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
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message });
  }
  return res.status(500).json({ error: err.message });
})
void dbConnection().then(() => {
  app.listen(appEnv.PORT)
  console.log(`App is running on port ${appEnv.PORT}`)
}).catch(error => {
  console.log(error)
})
