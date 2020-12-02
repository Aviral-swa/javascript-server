import IEntity from './IEntity';

export default interface IUser extends IEntity {
    name: string;
    role: string;
    email: string;
    password: string;
}
