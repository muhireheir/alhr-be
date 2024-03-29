import { User } from "../models/User";
import { IUserModel } from "../types/common";
class UserService {
  public static async getUserByEmail(email: string): Promise<IUserModel | null> {
    return await (User.findOne({ email }));
  }
}

export default UserService;