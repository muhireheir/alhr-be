import {
  Controller,
  Get,
  Route,
  Tags
} from 'tsoa'
import { IMessageResponse } from '../types/common'
@Tags('welcome')
@Route('')
export class WelcomeController extends Controller {
  @Get('/')
  public static welcome(): IMessageResponse {
    return { message: 'welcome!' }
  }
}
