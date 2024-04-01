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

import { IAddCandidateDto, ICandidateModel, UpdateCandidateDto } from '../types/dto/candidate';
import CandidateService from '../services/Candidate.service.service';
@Tags('Candidates')
@Route('api/candidates')
@Security("jwtAuth")
export class CandidatesController extends Controller {
  @Post('/')
  public static async add(@Body() candidate: IAddCandidateDto): Promise<ICandidateModel> {
    return CandidateService.add(candidate);
  }
  @Get('/')
  public static async getAll(): Promise<ICandidateModel[]> {
    return CandidateService.getAll()
  }
  @Get('/{id}')
  public static async getOne(@Path() id: string): Promise<ICandidateModel> {
    return CandidateService.getOne(id)
  }

  @Delete('/{id}')
  public static async delete(@Path() id: string): Promise<ICandidateModel> {
    return CandidateService.delete(id)
  }
  @Patch('/{id}')
  public static async update(@Path() id: string, @Body() candidateData: UpdateCandidateDto): Promise<ICandidateModel> {
    return CandidateService.update(id, candidateData)
  }
}
