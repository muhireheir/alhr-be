import { IUserModel } from './../types/common';
import { IJobPost, createJobDto } from "../types/dto/jobpost";
import { jobPost } from '../models/JobPost';

class JobPostService {
  public static async createJobPost(data: createJobDto, user: IUserModel): Promise<IJobPost> {
    const createdJobPost = await jobPost.create({ ...data, postedBy: user._id });
    return (await jobPost.findById(createdJobPost._id).populate({
      path: 'postedBy',
      select: '_id firstName lastName email'
    })) as unknown as IJobPost;
  }
  public static async getJobPosts(): Promise<IJobPost[]> {
    return (await jobPost.find().populate({
      path: 'postedBy',
      select: '_id firstName lastName email'
    })) as unknown as IJobPost[];
  }

  public static async getJobPost(id: string): Promise<IJobPost> {
    return (await jobPost.findById(id).populate({
      path: 'postedBy',
      select: '_id firstName lastName email'
    })) as unknown as IJobPost;
  }

}

export default JobPostService;