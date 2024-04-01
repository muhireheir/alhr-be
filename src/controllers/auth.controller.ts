import {
  Controller,
  Post,
  Route,
  Tags,
  Body,
  Get,
  Query,
  Inject
} from 'tsoa'
import { LoginDto, LoginResponseDto, VerifyAccountResponseDto, createAccountDto } from '../types/dto/auth.dto'
import AuthService from '../services/auth.service';
import { IMessageResponse, IUserModel } from '../types/common';
interface Ic {
  name: string
}
@Tags('Authentication')
@Route('api/auth')
export class AuthController extends Controller {
  @Post('/signup')
  public static async signup(@Body() user: createAccountDto): Promise<IMessageResponse> {
    return (await AuthService.signup(user));
  }
  @Get("/verify")
  public static async verifyAccount(@Query('token') token: string | undefined): Promise<VerifyAccountResponseDto> {
    return (await AuthService.verifyAccount(token));
  }

  @Post("/login")
  public static async login(@Body() data: LoginDto): Promise<LoginResponseDto> {
    return (await AuthService.login(data))
  }
  @Get("/me")
  public static async profile(@Inject() user: IUserModel): Promise<LoginResponseDto> {
    return (await AuthService.getMe(user))
  }
}
