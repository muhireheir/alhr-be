import {
  Controller,
  Get,
  Route,
  Tags
} from 'tsoa'
import { IWelcomeResponse } from '../types/common'
@Tags('welcome')
@Route('')
export class WelcomeController extends Controller {
  @Get('/')
  public static welcome(): IWelcomeResponse {
    return { message: 'welcome!' }
  }
}
