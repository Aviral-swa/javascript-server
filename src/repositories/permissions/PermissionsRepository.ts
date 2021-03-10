import * as mongoose from 'mongoose';
import { permissionsModel } from './PermissionsModel';
import IPermissionsModel from './IPermissionsModel';
import IPermissions from '../../entities/IPermissions';
import VersionableRepository from '../versionable/VersionableRepository';

export default class PermissionsRepository extends VersionableRepository<IPermissionsModel, mongoose.Model<IPermissionsModel>> {
    constructor() {
        super(permissionsModel);
    }

    public static getUserObjectId() {
        return String(mongoose.Types.ObjectId());
    }

    public create(data: IPermissions): Promise<IPermissionsModel> {
        return super.create(data);
    }

    public get(query: any, options: any): Promise<IPermissionsModel[]> {
        return super.get(query, options);
    }

    public count() {
        return permissionsModel.countDocuments();
    }
}
