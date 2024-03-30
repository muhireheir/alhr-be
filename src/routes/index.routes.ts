import { Router } from 'express'
import { WelcomeController } from '../controllers/welcome.controller'
import apiRouter from './api/index.routes'
import socialAuthRouter from './googleAuth/auth.routes'

const router = Router()
router.get('/', (_req, res, _next) => {
  return res.send(WelcomeController.welcome())
})
router.use('/api', apiRouter)
router.use('/auth', socialAuthRouter)
export default router
