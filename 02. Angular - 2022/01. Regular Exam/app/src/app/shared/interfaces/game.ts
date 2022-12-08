import { IUser } from './user';

export interface IGames{
    _id: string,
    title: string,
    description: string,
    imageUrl: string,
    genre: string,
    price: string,
    userId: IUser;
    createdAt: string,
    owner: string,
    
}

/*
__v: 0
_id: "636513d5ea641720f0f9c62e"
createdAt: "11.04.2022"
description: "Monkey is..."
imageUrl: "http://localhost:3000/static/img/animal.jpg"
genre: "Animal"
location: "North America"
owner: "63651314ea641720f0f9c62c"
title: "Two golden snub-nosed monkeys"
users: Array []
usersCount: 0
*/