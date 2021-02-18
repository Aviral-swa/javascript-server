import * as mongoose from 'mongoose';
import { employeeModel } from './EmployeeModel';
import IEmployeeModel from './IEmployeeModel';

export default class EmployeeRepository {

    public static getUserObjectId() {
        return String(mongoose.Types.ObjectId());
    }

    public async create(data: any): Promise<IEmployeeModel> {
        const id = EmployeeRepository.getUserObjectId();
        if (! data.parent) {
            const model = new employeeModel({
                _id: id,
                ...data,
            });
            return await model.save();
        }
        const parent = await employeeModel.findOne({ name: data.parent });
        const parentAncestors = parent.ancestors;
        parentAncestors.push(data.parent);
        const model = new employeeModel({
            _id: id,
            ancestors: parentAncestors,
            ...data,
        });
        return await model.save();
    }

    public async get(query: any): Promise<IEmployeeModel> {
        return await employeeModel.find(query);
    }

    public count() {
        return employeeModel.countDocuments();
    }
}