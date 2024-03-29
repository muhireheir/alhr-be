import { Router } from 'express'
import { WelcomeController } from '../controllers/welcome.controller'
import apiRouter from './api/index.routes'

const router = Router()
router.get('/', (_req, res, _next) => {
  return res.send(WelcomeController.welcome())
})
router.use('/api', apiRouter)
export default router
