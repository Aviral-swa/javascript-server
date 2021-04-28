const config = {
    post: {
        email: {
            required: true,
            string: true,
            regex: /\w+@successive.tech$/i,
            in: ['body'],
            errorMessage: 'Email is required',
        },
        password: {
            required: true,
            string: true,
            in: ['body'],
            errorMessage: 'password is required',
        },
    },

    delete: {
        id: {
            required: true,
            errorMessage: 'Id is required',
            in: ['params'],
        },
    },
    get: {
        skip: {
            required: false,
            default: 0,
            number: true,
            in: ['query'],
            errorMessage: 'Skip is invalid',
        },
        limit: {
            required: false,
            default: 10,
            number: true,
            in: ['query'],
            errorMessage: 'Limit is invalid',
        },
    },
    put: {
        id: {
            required: true,
            string: true,
            in: ['body']
        },
        dataToUpdate: {
            in: ['body'],
            required: true,
            isObject: true,
            custom(dataToUpdate) {
                console.log();
            },
        },
    },
};

export default config;
