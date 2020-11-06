import * as mongoose from 'mongoose';
import { userModel } from './UserModel';
import IUserModel from './IUserModel';

export default class UserRepository {

    public static getUserObjectId() {
        return String(mongoose.Types.ObjectId());
    }

    public create(data: any): Promise<IUserModel> {
        const id = UserRepository.getUserObjectId();
        const model = new userModel({
            _id: id,
            ...data,
        });
        return model.save();
    }

    public count() {
        return userModel.countDocuments();
    }
}
