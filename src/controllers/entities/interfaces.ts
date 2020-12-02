interface IEntity {
    _id?: string;
    originalId?: string;
    updatedAt?: Date;
    deletedAt?: Date;
    __v?: number;
}

export interface ITrainee extends IEntity {
    name: string;
    role: string;
    email: string;
    password: string;
}

export interface IUser extends IEntity {
    name: string;
    role: string;
    email: string;
    password: string;
}
