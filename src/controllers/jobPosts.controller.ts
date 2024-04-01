import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Route,
  Security,
  Tags
} from 'tsoa'
import { IUserModel } from '../types/common'
import { IJobPost, createJobDto } from '../types/dto/jobpost'
import JobPostService from '../services/jobsPosts.service'
@Tags('Job posts')
@Route('api/jobPosts')
@Security("jwtAuth")
export class JobPostsController extends Controller {
  @Post('/')
  public static async createJobPost(@Body() jobPost: createJobDto, @Inject() user: IUserModel): Promise<IJobPost> {
    return JobPostService.createJobPost(jobPost, user);
  }
}
