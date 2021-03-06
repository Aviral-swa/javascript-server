import { Request } from 'express';

export interface IPermissions {
    getUsers: GetUsers;
    getProduct: GetProduct;
}
type GetUsers = {
    all: string[];
    read: string[];
    write: string[];
    delete: string[];
};

type GetProduct = {
    all: string[];
    read: string[];
    write: string[];
    delete: string[];
};

export interface IRequest extends Request {
    user: User;
}

type User = {
    _id?: string;
    name: string;
    email: string;
    role: string;
    password: string;
};

export interface ICreate {
    name: string;
    email: string;
    role: string;
    password: string;
}

export interface IUpdate {
    originalId: string;
    dataToUpdate: updateData;
}
type updateData = {
    name?: string;
    email?: string;
    role?: string;
    password?: string;
};

export interface IQuery {
    name?: string;
    email?: string;
    role?: string;
    password?: string;
    deletedAt?: Date;
    updatedAt?: Date;
    originalId?: string;
}