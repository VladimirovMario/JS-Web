import { IUser } from './user';

export interface IGame{
    _id: string,
    title: string,
    description: string,
    imageUrl: string,
    genre: string,
    price: number,
    userId: IUser;
    createdAt: string,
    owner: string,    
}
