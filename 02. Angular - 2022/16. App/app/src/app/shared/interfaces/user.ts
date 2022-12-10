import { IGame } from "./game";

export interface IUser {
  _id: string;
  email: string;
  username: string;
  password: string;
  tel: string;
  liked: IGame
  created_at: string;
}
