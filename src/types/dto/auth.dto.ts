import { IUser } from "../common";

export interface createAccountDto extends IUser {
  password: string;
  confirmPassword: string
}

export interface LoginResponseDto {
  token: string | null,
  firstName: string;
  lastName: string;
  email: string
}
export interface LoginDto {
  email: string;
  password: string;
}
export interface VerifyAccountResponseDto extends LoginResponseDto {
  success: boolean;
  message: string
}
