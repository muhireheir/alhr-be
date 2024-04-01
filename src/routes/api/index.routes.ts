import { Router } from 'express'
import authRouter from './auth.routes'
import jobPostsRouter from './jobPost.routes';
import { checkBearerToken } from '../../middlewares/auth';
import candidatesRouter from './candidates.routes';


const apiRouter = Router()
apiRouter.use('/auth', authRouter);
apiRouter.use('/jobPosts', checkBearerToken, jobPostsRouter);
apiRouter.use('/candidates', checkBearerToken, candidatesRouter)

export default apiRouter

