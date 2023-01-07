import { ITheme } from './theme';
import { IUser } from './user';

export interface IPost {
  likes: string[];
  _id: string;
  text: string;
  userId: IUser;
  themeId: ITheme;
  created_at: string;
  updatedAt: string;
  __v: number;
}

/**
[
 {
    "likes": ["5fa64b162183ce1728ff371d"],
    "_id": "5fa65be82183ce1728ff372d",
    "text": "Angular is the best!",
    "userId": {
             "themes": ["5fa64b6f2183ce1728ff371e","5fa64a9f2183ce1728ff371a"],
              "posts": ["5fa65bc32183ce1728ff372c","5fa65be82183ce1728ff372d"],
              "_id": "5fa65bac2183ce1728ff372b",
              "tel": "+359882224123",
              "email": "Silvester@gmail.com",
              "username": "Silvester",
              "password": "$2b$05$PlUV.7nt88zr0BUJ/S4QouAXupZjCoaSZx20txlCv9/RgA9W5.3MO",
              "created_at": "2020-11-07T08:32:44.590Z",
              "updatedAt": "2020-11-07T08:33:44.801Z",
              "__v": 
            },
   "themeId": {
        "subscribers": ["5fa64a072183ce1728ff3719","5fa64ca72183ce1728ff3726",],
        "posts": ["5fa64a9f2183ce1728ff371b","5fa65be82183ce1728ff372d"],
        "_id": "5fa64a9f2183ce1728ff371a",
        "themeName": "Angular 10",
        "userId": "5fa64a072183ce1728ff3719",
        "created_at": "2020-11-07T07:19:59.933Z",
        "updatedAt": "2020-11-07T08:33:44.801Z",
        "__v": 0
},
"created_at": "2020-11-07T08:33:44.795Z",
"updatedAt": "2020-11-09T12:42:15.935Z",
"__v": 0
},
]

*/
