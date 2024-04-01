import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Route,
  Security,
  Tags,
  Path,
  Delete,
  Patch
} from 'tsoa'
import { IUserModel } from '../types/common'
import { IJobPost, UpdateJobPostDto, createJobDto } from '../types/dto/jobpost'
import JobPostService from '../services/jobsPosts.service'
@Tags('Job posts')
@Route('api/jobPosts')
@Security("jwtAuth")
export class JobPostsController extends Controller {
  @Post('/')
  public static async createJobPost(@Body() jobPost: createJobDto, @Inject() user: IUserModel): Promise<IJobPost> {
    return JobPostService.createJobPost(jobPost, user);
  }
  @Get('/')
  public static async getAllJobPost(): Promise<IJobPost[]> {
    return JobPostService.getJobPosts()
  }
  @Get('/{id}')
  public static async getJobPost(@Path() id: string): Promise<IJobPost> {
    return JobPostService.getJobPost(id)
  }

  @Delete('/{id}')
  public static async deleteJobPost(@Path() id: string): Promise<IJobPost> {
    return JobPostService.deleteJobPost(id)
  }
  @Patch('/{id}')
  public static async updateJobPost(@Path() id: string, @Body() jobPost: UpdateJobPostDto): Promise<IJobPost> {
    return JobPostService.updateJobPost(id, jobPost)
  }
}
