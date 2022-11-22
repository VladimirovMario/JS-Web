import { IUser } from './user';

export interface ITheme {
  subscribers: string[];
  posts: string[];
  themeName: string;
  userId: IUser;
  
  created_at: string;
  updatedAt: string;
  __v: number;
}

/*
 [
    {
        "subscribers": ["5fa64a072183ce1728ff3719","5fa64ca72183ce1728ff3726",],
        "posts": ["5fa64a9f2183ce1728ff371b","5fa65be82183ce1728ff372d"],
        "_id": "5fa64a9f2183ce1728ff371a",
        "themeName": "Angular 10",
        "userId": {},
        "created_at": "2020-11-07T07:19:59.933Z",
        "updatedAt": "2020-11-07T08:33:44.801Z",
        "__v": 0
    },
] 
*/
