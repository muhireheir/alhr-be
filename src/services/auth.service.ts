import { User } from "../models/User";
import { IMessageResponse } from "../types/common";
import { VerifyAccountResponseDto, createAccountDto } from "../types/dto/auth.dto";
import { appEnv } from "../utils/env";
import { generateToken, verifyToken } from "../utils/jwt";
import { sendEmail } from "../utils/mailer";
import { generatePassword } from "../utils/password";
import UserService from "./user.service";

class AuthService {
  public static async signup(userInfo: createAccountDto): Promise<IMessageResponse> {
    const user = await UserService.getUserByEmail(userInfo.email);
    if (user) {
      throw new Error("Email already in use")
    }
    const password = await generatePassword(userInfo.password);
    const createdUser = await User.create({ ...userInfo, password });
    const token = await generateToken({ accountId: createdUser._id as unknown as string }, "2h");
    const confirmationLink = `${appEnv.APP_URL}/api/auth/verify?token=${token}`;
    await sendEmail({ receiver: createdUser.email, templateId: appEnv.VERIFY_EMAIL_TEMPLATE!, templateData: { confirmationLink } })
    return { message: "Account created! please check your email for verification" };
  }
  public static async verifyAccount(token: string | undefined): Promise<VerifyAccountResponseDto> {
    if (!token) {
      return { success: false, token: null, message: "Token is required" }
    }
    const accountInfo = await verifyToken(token);
    const user = await User.findById(accountInfo.accountId);
    if (!user) {
      return { success: false, token: null, message: "Invalid verification link" }
    }
    await User.updateOne({ _id: user._id }, { isVerified: true });
    const userToken = await generateToken({ accountId: user._id as unknown as string }, "24h");
    return { success: true, token: userToken, message: 'Verified successfuly' }
  }
}

export default AuthService;