import { NextFunction, Router, Request, Response } from 'express'
import validate from '../../middlewares/validator';
import { addCandidateSchema, updateCandidateSchema } from '../../utils/schemas/candidate.schemas';
import { CandidatesController } from '../../controllers/candidates.controller';

const candidatesRouter = Router()

candidatesRouter.post("/", validate(addCandidateSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await CandidatesController.add(req.body);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
})

candidatesRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await CandidatesController.getAll();
    return res.json(response);
  } catch (error) {
    return next(error);
  }
})
candidatesRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await CandidatesController.getOne(req.params.id);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
})
candidatesRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await CandidatesController.delete(req.params.id);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
})
candidatesRouter.patch("/:id", validate(updateCandidateSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await CandidatesController.update(req.params.id, req.body);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
})

export default candidatesRouter
