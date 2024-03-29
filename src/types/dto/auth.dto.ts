import { IUser } from "../common";

export interface createAccountDto extends IUser {
  password: string;
  confirmPassword: string
}

export interface LoginResponseDto {
  token: string | null
}
export interface VerifyAccountResponseDto extends LoginResponseDto {
  success: boolean;
  message: string
}