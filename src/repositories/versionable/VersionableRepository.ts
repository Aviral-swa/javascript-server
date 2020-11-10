import * as mongoose from 'mongoose';
import { DocumentQuery, Query } from 'mongoose';
import { ICreate } from '../../libs/interfaces';

export default class VersionableRepository <D extends mongoose.Document, M extends mongoose.Model<D>> {
    public static generateObjectId() {
        return String(mongoose.Types.ObjectId());
    }

    private model: M;

    constructor(model) {
        this.model = model;
    }
    public async createUsers(data: ICreate): Promise<D> {
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
    // ERROR
    // public invalidate(id: string): DocumentQuery<D, D> {
    //     return this.model.updateMany({}, { deletedAt: Date.now() } );
    // }
    public async update(data: any): Promise<D> {
        const previous = await this.findOne({ originalId: data.originalId, deletedAt: undefined});
        console.log('previous: ', previous);
        if (previous) {
            await this.invalidate(data.originalId);
        }
        else {
            return undefined;
        }
        const newData = Object.assign(JSON.parse(JSON.stringify(previous)), data);
        newData._id = VersionableRepository.generateObjectId();
        delete newData.deletedAt;
        const model = new this.model(newData);
        return model.save();
    }
}