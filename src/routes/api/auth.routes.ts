import { Request, Router } from 'express'
import { AuthController } from '../../controllers/auth.controller'
import validate from '../../middlewares/validator';
import createAccountSchema, { loginSchema } from '../../utils/schemas/auth.schemas';
import { IUserModel } from '../../types/common';
import { checkBearerToken } from '../../middlewares/auth';
const authRouter = Router()
authRouter.post('/signup', validate(createAccountSchema), async (req, res, next) => {
  try {
    const result = await AuthController.signup(req.body);
    return res.json(result);
  } catch (error) {
    return next(error)
  }
})
authRouter.get('/verify', async (req: Request, res, next) => {
  try {
    const result = await AuthController.verifyAccount(req.query.token as string);
    return res.json(result);
  } catch (error) {
    return next(error)
  }
})
authRouter.post('/login', validate(loginSchema), async (req: Request, res, next) => {
  try {
    const result = await AuthController.login(req.body);
    return res.json(result);
  } catch (error) {
    return next(error)
  }
})

authRouter.get('/me', checkBearerToken, async (req: Request, res, next) => {
  try {
    const result = await AuthController.profile(req.user as IUserModel);
    return res.json(result);
  } catch (error) {
    return next(error)
  }
})
export default authRouter
