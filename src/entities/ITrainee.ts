import IEntity from './IEntity';

export default interface ITrainee extends IEntity {
    name: string;
    role: string;
    email: string;
    password: string;
}
