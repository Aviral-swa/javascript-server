import * as mongoose from 'mongoose';
import { DocumentQuery, Query } from 'mongoose';

export default class VersionableRepository <D extends mongoose.Document, M extends mongoose.Model<D>> {
    public static generateObjectId() {
        return String(mongoose.Types.ObjectId());
    }

    private model: M;

    constructor(model) {
        this.model = model;
    }
    public async create(data: any): Promise<D> {
        const id = VersionableRepository.generateObjectId();
        const model = new this.model({
            ...data,
            _id: id,
            originalId: id,
        });
        return await model.save();
    }
    public async findOne(query: any): Promise<D> {
        const finalQuery = {deletedAt: undefined, ...query};
        return await this.model.findOne(finalQuery);
    }
    public async get(query: any, sort: string, skip: number, limit: number): Promise<D[]> {
        const finalQuery = {deletedAt: undefined, ...query};
        return await this.model.find(finalQuery).sort(sort).skip(skip).limit(limit);
    }
    public async delete(id: string): Promise<D> {
        const previous = await this.findOne({ originalId: id, deletedAt: undefined});
        if (previous) {
            return await this.invalidate(id);
        }
    }
    public async invalidate(id: string): Promise<D> {
        const query: any = {originalId: id, deletedAt: undefined};
        const data: any = {deletedAt: Date.now()};
        return await this.model.updateOne(query , data);
    }
    public async invalidateUpdate(id: string): Promise<D> {
        const query: any = {originalId: id, deletedAt: undefined, updatedAt: undefined};
        const data: any = {deletedAt: Date.now(), updatedAt: Date.now()};
        return await this.model.updateOne(query , data);
    }
    public async update(data: any): Promise<D> {
        const previous = await this.findOne({ originalId: data.originalId, deletedAt: undefined});
        if (previous) {
            await this.invalidateUpdate(data.originalId);
        }
        else {
            return undefined;
        }
        const newData = Object.assign(JSON.parse(JSON.stringify(previous)), data.dataToUpdate);
        newData._id = VersionableRepository.generateObjectId();
        delete newData.deletedAt;
        newData.updatedAt = Date.now();
        const model = new this.model(newData);
        return await model.save();
    }
}
