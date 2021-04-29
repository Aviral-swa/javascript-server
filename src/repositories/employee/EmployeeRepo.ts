import * as mongoose from 'mongoose';
import { employeeModel } from './EmployeeModel';
import IEmployeeModel from './IEmployeeModel';
import IEmployee from '../../entities/IEmployee';

export default class EmployeeRepository {

    public static getUserObjectId() {
        return String(mongoose.Types.ObjectId());
    }

    public async create(data: IEmployee): Promise<IEmployeeModel> {
        const id = EmployeeRepository.getUserObjectId();
        if (! data.parent) {
            const model = new employeeModel({
                _id: id,
                ...data,
            });
            return model.save();
        }
        const parent = await employeeModel.findOne({
            name: {
                $regex: new RegExp('^' + data.parent + '$', 'i')
            }
        });
        if (!parent) return undefined;
        const parentAncestors = parent.ancestors;
        parentAncestors.push(data.parent);
        const eModel = new employeeModel({
            _id: id,
            ancestors: parentAncestors,
            ...data,
        });
        return eModel.save();
    }

    public async get(query: any): Promise<IEmployeeModel[]> {
        return employeeModel.find(query);
    }

    public count() {
        return employeeModel.countDocuments();
    }
}