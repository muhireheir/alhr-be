import { Request, Router } from 'express'
import { AuthController } from '../../controllers/auth.controller'
import validate from '../../middlewares/validator';
import createAccountSchema, { loginSchema } from '../../utils/schemas/auth.schemas';
import { IUserModel } from '../../types/common';
import { checkBearerToken } from '../../middlewares/auth';
import { appEnv } from '../../utils/env';
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
    const url = `${appEnv.FRONTEND_URL}/auth/redirect?token=${result.token}`;
    return res.redirect(url);
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
