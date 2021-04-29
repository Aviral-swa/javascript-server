
import * as mongoose from 'mongoose';

export default interface IEmployeeModel extends mongoose.Document {
    id: string;
    name: string;
    parent: string;
    role: string;
    ancestors: [];
}