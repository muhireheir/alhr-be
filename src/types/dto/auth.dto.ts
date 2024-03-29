import { IUser } from "../common";

export interface createAccountDto extends IUser {
  password: string;
  confirmPassword: string
}