import { User } from "../models/User";
import { createAccountDto } from "../types/dto/auth.dto";
import { generatePassword } from "../utils/password";
import UserService from "./user.service";

class AuthService {
  public static async signup(userInfo: createAccountDto): Promise<string> {
    const user = await UserService.getUserByEmail(userInfo.email);
    if (user) {
      throw new Error("Email already in use")
    }
    const password = generatePassword(userInfo.password);
    await User.create({ ...userInfo, password });
    return "Account created! please check your email for verification";
  }
}

export default AuthService;