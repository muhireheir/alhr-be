import { IUserModel } from './../types/common';
import { IJobPost, UpdateJobPostDto, createJobDto } from "../types/dto/jobpost";
import { jobPost } from '../models/JobPost';
import { HttpError } from '../utils/misc/HttpError';

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

  public static async deleteJobPost(id: string): Promise<IJobPost> {
    const getPost = await jobPost.findById(id);
    if (!getPost) {
      throw new HttpError(400, "Job post not found")
    }
    const removePostResult = await jobPost.findByIdAndDelete(id) as unknown as IJobPost;
    return removePostResult;
  }

  public static async updateJobPost(id: string, data: UpdateJobPostDto): Promise<IJobPost> {
    const getPost = await jobPost.findById(id);
    if (!getPost) {
      throw new HttpError(400, "Job post not found")
    }
    const updatedPost = await jobPost.findOneAndUpdate({ _id: id }, { ...data }, { new: true })
    return updatedPost as unknown as IJobPost
  }
}

export default JobPostService;