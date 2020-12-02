export default interface IEntity {
    _id: string;
    originalId?: string;
    updatedAt?: Date;
    deletedAt?: Date;
    __v?: number;
}
