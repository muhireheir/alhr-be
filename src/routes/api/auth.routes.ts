import { Router } from 'express'
import { AuthController } from '../../controllers/auth.controller'
import validate from '../../middlewares/validator';
import createAccountSchema from '../../utils/schemas/auth.schemas';
const authRouter = Router()
authRouter.post('/signup', validate(createAccountSchema), async (req, res, next) => {
  try {
    const result = await AuthController.signup(req.body);
    return res.json(result);
  } catch (error) {
    return next(error)
  }
})
export default authRouter
