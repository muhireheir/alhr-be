import { Router } from 'express'
import { WelcomeController } from '../controllers/welcome.controller'

const router = Router()
router.get('/', (_req, res, _next) => {
  return res.send(WelcomeController.welcome())
})
export default router
