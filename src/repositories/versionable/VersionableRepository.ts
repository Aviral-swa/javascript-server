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
    public count(query: any): Query<number> {
        const finalQuery = {deletedAt: undefined, ...query};
        return this.model.count(finalQuery);
    }
    public findOne(query: any): DocumentQuery<D, D> {
        const finalQuery = {deletedAt: undefined, ...query};
        return this.model.findOne(finalQuery);
    }
    public find(query: any, projection: any = {}, options: any = {}): DocumentQuery<D[], D> {
        const finalQuery = {deletedAt: undefined, ...query};
        return this.model.find(finalQuery, projection, options);
    }
    public async delete(id: string): Promise<D> {
        const previous = await this.findOne({ originalId: id, deletedAt: undefined});
        if (previous) {
            return await this.invalidate(id);
        }
    }
    public invalidate(id: string): DocumentQuery<D, D> {
        const query: any = {originalId: id, deletedAt: undefined};
        const data: any = {deletedAt: Date.now()};
        return this.model.updateMany(query , data);
    }
    public invalidateUpdate(id: string): DocumentQuery<D, D> {
        const query: any = {originalId: id, deletedAt: undefined, updatedAt: undefined};
        const data: any = {deletedAt: Date.now(), updatedAt: Date.now()};
        return this.model.updateMany(query , data);
    }
    public async update(data: any): Promise<D> {
        const previous = await this.findOne({ originalId: data.originalId, deletedAt: undefined});
        if (previous) {
            await this.invalidateUpdate(data.originalId);
        }
        else {
            return undefined;
        }
        const newData = Object.assign(JSON.parse(JSON.stringify(previous)), data);
        newData._id = VersionableRepository.generateObjectId();
        delete newData.deletedAt;
        newData.updatedAt = Date.now();
        const model = new this.model(newData);
        return model.save();
    }
}