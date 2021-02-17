import * as mongoose from 'mongoose';

export default class EmployeeSchema extends mongoose.Schema {

    constructor(collections: any) {
        const baseSchema  = Object.assign({
            _id: String,
            name: String,
            role: String,
            parent: String,
            ancestors: []
        });

        super(baseSchema, collections);
    }

}