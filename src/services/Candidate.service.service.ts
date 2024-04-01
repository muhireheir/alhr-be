import { jobPost } from '../models/JobPost';
import { HttpError } from '../utils/misc/HttpError';
import { IAddCandidateDto, ICandidateModel, UpdateCandidateDto } from '../types/dto/candidate';
import { Candidate } from '../models/Candidate';

class CandidateService {
  public static async add(data: IAddCandidateDto): Promise<ICandidateModel> {
    const candidate = await Candidate.findOne({ email: data.email });
    if (candidate) {
      throw new HttpError(409, "Candidate with that email exists")
    }
    return (await Candidate.create(data)) as unknown as ICandidateModel;
  }
  public static async getAll(): Promise<ICandidateModel[]> {
    return (await Candidate.find()) as unknown as ICandidateModel[];
  }

  public static async getOne(id: string): Promise<ICandidateModel> {
    return (await Candidate.findById(id)) as unknown as ICandidateModel;
  }

  public static async delete(id: string): Promise<ICandidateModel> {
    const exists = await Candidate.findById(id);
    if (!exists) {
      throw new HttpError(401, "Resource not found")
    }
    return (await Candidate.findByIdAndDelete(id)) as unknown as ICandidateModel;
  }

  public static async update(id: string, data: UpdateCandidateDto): Promise<ICandidateModel> {
    const exists = await Candidate.findById(id);
    if (!exists) {
      throw new HttpError(400, "Resource not found");
    }
    return (await Candidate.findOneAndUpdate({ _id: id }, { ...data }, { new: true })) as unknown as ICandidateModel
  }
}

export default CandidateService;