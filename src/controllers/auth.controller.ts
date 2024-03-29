import {
  Controller,
  Post,
  Route,
  Tags,
  Body
} from 'tsoa'
import { createAccountDto } from '../types/dto/auth.dto'
import AuthService from '../services/auth.service';
import { IMessageResponse } from '../types/common';
@Tags('Authentication')
@Route('api/auth')
export class AuthController extends Controller {
  @Post('/signup')
  public static async signup(@Body() user: createAccountDto): Promise<IMessageResponse> {
    return { message: await AuthService.signup(user) };
  }
}
