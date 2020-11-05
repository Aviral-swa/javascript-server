import * as mongoose from 'mongoose';
import { userModel } from './UserModel';
import IUserModel from './IUserModel';

export default class UserRepository {

    public static getuserObjectId() {
        return String(mongoose.Types.ObjectId());
    }

    public create(data: any): Promise<IUserModel> {
        const id = UserRepository.getuserObjectId();
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