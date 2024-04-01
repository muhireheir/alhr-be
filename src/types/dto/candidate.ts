import { Document } from "mongoose";

export interface ICandidateModel {
  _id: string;
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  dateOfBirth: Date

}

type AddCandidate = Omit<ICandidateModel, '_id'>
export interface IAddCandidateDto extends AddCandidate { }
export type UpdateCandidateDto = Partial<IAddCandidateDto>