import * as mongoose from 'mongoose';

export default class VersionableRepository <D extends mongoose.Document, M extends mongoose.Model<D>> {
    public static generateObjectId() {
        return String(mongoose.Types.ObjectId());
    }

    private model: M;

    constructor(model) {
        this.model = model;
    }
    public async count(query: any): Promise<number> {
        const finalQuery = {deletedAt: undefined, ...query};
        return this.model.countDocuments(finalQuery);
    }
    public async create(data: any): Promise<D> {
        const id = VersionableRepository.generateObjectId();
        const model = new this.model({
            ...data,
            _id: id,
            originalId: id,
        });
        return model.save();
    }
    public async findOne(query: any): Promise<D> {
        const finalQuery = {deletedAt: undefined, ...query};
        return this.model.findOne(finalQuery);
    }
    public async get(query: any, options: any): Promise<D[]> {
        const finalQuery = {deletedAt: undefined, ...query};
        return this.model.find(finalQuery, {}, options);
    }
    public async delete(id: string): Promise<D> {
        const previous = await this.findOne({ originalId: id, deletedAt: undefined});
        if (previous) {
            return this.invalidate(id);
        }
    }
    public async invalidate(id: string): Promise<D> {
        const query: any = {originalId: id, deletedAt: undefined};
        const data: any = {deletedAt: Date.now()};
        return this.model.updateOne(query , data);
    }
    public async update(data: any): Promise<D> {
        const previous = await this.findOne({ originalId: data.originalId, deletedAt: undefined});
        if (previous) {
            await this.invalidate(data.originalId);
        }
        else {
            return undefined;
        }
        const newData = Object.assign(JSON.parse(JSON.stringify(previous)), data.dataToUpdate);
        newData._id = VersionableRepository.generateObjectId();
        delete newData.deletedAt;
        newData.updatedAt = Date.now();
        const model = new this.model(newData);
        return model.save();
    }
}
