export interface IMessageResponse {
  message: string
}

export interface IUser {
  firstName: string,
  lastName: string,
  email: string,

}

export interface IUserModel extends IUser {
  _id: string;
  password: string;
  provider: string;
  profileId: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date
}

export interface IEmail {
  receiver: string;
  templateId: string;
  templateData: Record<string, string>
}
export interface ITokenData {
  accountId: string
}