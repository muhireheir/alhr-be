
import { IUser } from "../common";

export interface IJobPost {
  _id: string;
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  location: string;
  employmentType: string;
  applicationDeadline: string;
  postedBy: IUser
}

type CreateJobType = Omit<IJobPost, 'postedBy' | '_id'>
export interface createJobDto extends CreateJobType { }
export type UpdateJobPostDto = Partial<createJobDto>