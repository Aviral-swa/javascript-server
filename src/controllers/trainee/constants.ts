export default {
    errorMessages: {
        BAD_RESQUEST: 'bad request',
        ERROR_STATUS: 400,
        NO_TRAINEES: 'No more trainees',
        NOT_FOUND: 'trainee not found ',
        INVALID_ID: 'invalid originalId',
        DUPLICATE_REQUEST: 'Duplicate request',
        DUPLICATE_REQUEST_MESSAGE: 'Trainee already exists',
    },
    successMessages: {
        SUCCESSFULL_UPDATE: 'trainees updated successfully',
        SUCCESSFULLY_FETCHED: 'trainees fethed successfully',
        SUCCESSFULLY_CREATED: 'trainee created successfully',
        SUCCESSFULLY_DELETED: 'trainee deleted successfully',
        SUCCESS_STATUS: 'success',
    },
    getQueryOptions: {
        searchString: 'trainee.2@ss.tt'
    },
    getOptions: {
        searchString: 'trainee.2@ss.tt',
        skip: 55,
    },
    badGetOptions: {
        sortOrder: '0',
    },
    createTestData: {
        'name': 'Test 1',
        'email': 'test.1@ss.tt',
        'role': 'trainee',
        'password': 'Qwerty@123'
    },
    wrongUpdateTestData: {
        'originalId': 'u28397482749823974',
        dataToUpdate: {
            'email': 'test.1@ss.tt',
        }
    },
    updateTestData: {
        'originalId': '6066a24ab43ee57a891f34dc',
        dataToUpdate: {
            'name': 'test',
        }
    },
    passUpdateTestData: {
        'originalId': '6066a24ab43ee57a891f34dc',
        dataToUpdate: {
            'password': 'Test@123',
        }
    },
    badTestData: {
        name: {},
    }
};