import { NextFunction, Router, Request, Response } from 'express'
import { JobPostsController } from '../../controllers/jobPosts.controller';
import { IUserModel } from '../../types/common';
import validate from '../../middlewares/validator';
import { jobPostSchema } from '../../utils/schemas/jobPost.schemas';

const jobPostsRouter = Router()

jobPostsRouter.post("/", validate(jobPostSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobPost = await JobPostsController.createJobPost(req.body, req.user as IUserModel);
    return res.json(jobPost);
  } catch (error) {
    return next(error);
  }
})
jobPostsRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobPosts = await JobPostsController.getAllJobPost();
    return res.json(jobPosts);
  } catch (error) {
    return next(error);
  }
})
jobPostsRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobPost = await JobPostsController.getJobPost(req.params.id);
    return res.json(jobPost);
  } catch (error) {
    return next(error);
  }
})
jobPostsRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobPost = await JobPostsController.deleteJobPost(req.params.id);
    return res.json(jobPost);
  } catch (error) {
    return next(error);
  }
})
jobPostsRouter.patch("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobPost = await JobPostsController.updateJobPost(req.params.id, req.body);
    return res.json(jobPost);
  } catch (error) {
    return next(error);
  }
})

export default jobPostsRouter
