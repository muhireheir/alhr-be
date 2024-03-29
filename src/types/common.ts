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