import * as mongoose from 'mongoose';
import PermissionsSchema from './PermissionsSchema';
import IPermissionsModel from './IPermissionsModel';

export const permissionsSchema = new PermissionsSchema({
    collection: 'Permissions',
});

export const permissionsModel: mongoose.Model<IPermissionsModel> = mongoose.model<IPermissionsModel>(
    'Permissions',
    permissionsSchema,
    'Permissions',
    true,
);
