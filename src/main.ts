import express from 'express'
import swaggerUi from 'swagger-ui-express'
import router from './routes/index.route'
import cors from 'cors'
import { appEnv } from './utils/env'

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
app.listen(appEnv.PORT, () => {
  console.log(`App is running on port ${appEnv.PORT}`)
})
