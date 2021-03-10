import VersionableSchema from '../versionable/VersionableSchema';

export default class PermissionsSchema extends VersionableSchema {

    constructor(collections: any) {
        const baseSchema  = Object.assign({
            _id: String,
            email: {
                type: String,
                lowercase: true
            },
            resources: {
                type: Object
            }
        });

        super(baseSchema, collections);
    }

}
