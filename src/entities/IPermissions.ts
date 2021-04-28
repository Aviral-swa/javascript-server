import IEntity from './IEntity';

export default interface IPermissions extends IEntity {
    _id?: string;
    email: string;
    resources: {};
    __v?: number;
}
