import passport from 'passport';
import { NextFunction, Router } from 'express'
import authRouter from './auth.routes'
import jobPostsRouter from './jobPost.routes';
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { appEnv } from '../../utils/env';
import { checkBearerToken } from '../../middlewares/auth';


const apiRouter = Router()
apiRouter.use('/auth', authRouter);
apiRouter.use('/jobPosts', checkBearerToken, jobPostsRouter)

export default apiRouter

