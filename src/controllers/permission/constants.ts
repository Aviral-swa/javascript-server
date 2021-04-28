export default {
    errorMessages: {
        BAD_RESQUEST: 'bad request',
        ERROR_STATUS: 400,
        NOT_FOUND: 'Cannot find Permission',
    },
    successMessages: {
        SUCCESSFULL_UPDATE: 'Permission updated successfully',
        SUCCESS_STATUS: 'success',
        SUCCESSFULLY_FETCHED: 'Permissions fethed successfully',
    },
    testData: {
        originalId: '6066a24ab43ee57a891f34dd',
        resources: {
            'trainee': [
                'create',
                'read',
                'update'
            ],
            'employee': [
                'create',
                'read'
            ],
            'permissions': [
                'read'
            ]
        },
    },
    wrongTestData: {
        originalId: '6066a24ab43ee57a891f34ddsaaa',
        resources: {
            'trainee': [
                'create',
                'read',
                'update'
            ],
            'employee': [
                'create',
                'read'
            ],
            'permissions': [
                'read'
            ]
        },
    },
    badTestData: {
        originalId: {},
        resources: {},
    }
};