import { User } from "../models/User";
import { IMessageResponse, IUserModel } from "../types/common";
import { LoginDto, LoginResponseDto, VerifyAccountResponseDto, createAccountDto } from "../types/dto/auth.dto";
import { appEnv } from "../utils/env";
import { generateToken, verifyToken } from "../utils/jwt";
import { sendEmail } from "../utils/mailer";
import { HttpError } from "../utils/misc/HttpError";
import { generatePassword, passwordsMatch } from "../utils/password";
import UserService from "./user.service";
import { Profile } from "passport";
import { VerifyCallback } from "passport-google-oauth20";

class AuthService {
  public static async signup(userInfo: createAccountDto): Promise<IMessageResponse> {
    const user = await UserService.getUserByEmail(userInfo.email);
    if (user) {
      throw new Error("Email already in use")
    }
    const password = await generatePassword(userInfo.password);
    const createdUser = await User.create({ ...userInfo, password });
    AuthService.sendVerificationEmail(createdUser.email, createdUser._id as unknown as string);
    return { message: "Account created! please check your email for verification" };
  }
  public static async verifyAccount(token: string | undefined): Promise<VerifyAccountResponseDto> {
    if (!token) {
      throw new HttpError(400, "Token is required");
    }
    const accountInfo = await verifyToken(token);
    const user = await User.findById(accountInfo.accountId);
    if (!user) {
      throw new HttpError(400, "Invalid verification link");
    }
    await User.updateOne({ _id: user._id }, { isVerified: true });
    const userToken = await generateToken({ accountId: user._id as unknown as string }, "24h");
    return {
      success: true, token: userToken, message: 'Verified successfuly', firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }
  }
  public static async sendVerificationEmail(email: string, id: string): Promise<void> {
    const token = await generateToken({ accountId: id as unknown as string }, "2h");
    const confirmationLink = `${appEnv.APP_URL}/api/auth/verify?token=${token}`;
    await sendEmail({ receiver: email, templateId: appEnv.VERIFY_EMAIL_TEMPLATE!, templateData: { confirmationLink } })
  }

  public static async login(data: LoginDto): Promise<LoginResponseDto> {
    const user = await UserService.getUserByEmail(data.email);
    if (!user || (user && !await passwordsMatch(data.password, user.password))) {
      throw new Error("Incorrect  email or password")
    }
    if (!user.isVerified) {
      await AuthService.sendVerificationEmail(user.email, user._id as unknown as string);
      throw new Error(" Please check your email for verification instructions")
    }
    const accessToken = await generateToken({ accountId: user._id as unknown as string }, '24h');
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: accessToken
    }
  }
  public static async authenticateWithGoogle(profile: Profile, done: VerifyCallback) {
    const email = profile.emails?.[0].value;
    const user = await UserService.getUserByEmail(email!) as unknown as typeof User;
    if (!user) {
      const createdUser = await User.create({ passwor: null, email, profileId: profile.id, firstName: profile.displayName.split(" ")[0], lastName: profile.displayName.split(" ")[1], isVerified: true, provider: profile.provider });
      return done(null, {
        provider: createdUser.provider,
        profileId: createdUser.profileId,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        email: createdUser.email,
        isVerified: true,
        _id: createdUser._id.toString()
      })
    }
    return done(null, user);
  }
  public static async LoginWithGoogle(email: string): Promise<LoginResponseDto> {
    const user = await UserService.getUserByEmail(email!);
    if (!user) {
      throw new Error("Opps authentication failed")
    }
    const accessToken = await generateToken({ accountId: user._id as unknown as string }, '24h');
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: accessToken
    }
  }
  public static async getMe(data: IUserModel): Promise<LoginResponseDto> {
    const user = await UserService.getUserByEmail(data.email!);
    const accessToken = await generateToken({ accountId: data._id as unknown as string }, '24h');
    if (!user) {
      throw new Error("Opps authentication failed")
    }
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: accessToken
    }
  }
}

export default AuthService;