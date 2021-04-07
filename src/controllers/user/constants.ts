export const payload = {
    'iss': 'successive technologies',
    'sub': 'profile setup',
    'email': undefined
};

export default {
    errorMessages: {
        BAD_RESQUEST: 'bad request',
        ERROR_STATUS: 400,
        NO_TRAINEES: 'No more trainees',
        NOT_REGISTERED: 'Email is not registered',
        INVALID_ID: 'invalid originalId',
        UNAUTHORIZED: 'Unauthorized Access',
        INCORRECT_PASSWORD: 'Password is incorrect',
    },
    successMessages: {
        SUCCESSFULLY_FETCHED: 'user fethed successfully',
        SUCCESSFULLY_CREATED: 'token created successfully',
        SUCCESS_STATUS: 'success',
    },
    notRegisteredData: {
        email: 'wrong@something.com',
        password: 'Qwertyuiop',
    },
    incorrectPassData: {
        email: 'test@ss.tt',
        password: 'Qwertyuiop',
    },
    testData: {
        email: 'test@ss.tt',
        password: 'Qwerty@123',
    },
};