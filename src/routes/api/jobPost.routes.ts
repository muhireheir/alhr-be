import { NextFunction, Router, Request, Response } from 'express'
import { JobPostsController } from '../../controllers/jobPosts.controller';
import { IUserModel } from '../../types/common';
import validate from '../../middlewares/validator';
import { jobPostSchema } from '../../utils/schemas/jobPost.schemas';

const jobPostsRouter = Router()

jobPostsRouter.post("/", validate(jobPostSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobPosts = await JobPostsController.createJobPost(req.body, req.user as IUserModel);
    return res.json(jobPosts);
  } catch (error) {
    return next(error);
  }

})

export default jobPostsRouter
