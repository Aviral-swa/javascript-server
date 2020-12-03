export default interface IEntity {
    _id: string;
    createdAt?: Date;
    originalId?: string;
    updatedAt?: Date;
    deletedAt?: Date;
    __v?: number;
}
