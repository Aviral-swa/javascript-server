import * as mongoose from 'mongoose';
import EmployeeSchema from './EmployeeSchema';
import IEmployeeModel from './IEmployeeModel';

export const employeeSchema = new EmployeeSchema({
    collection: 'Employee',
});

export const employeeModel: mongoose.Model<IEmployeeModel> = mongoose.model<IEmployeeModel>(
    'Employee',
    employeeSchema,
    'Employee',
    true,
);