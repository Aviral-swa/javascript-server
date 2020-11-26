const config = {
    create: {
        password: {
            required: true,
            string: true,
            in: ['body'],
            errorMessage: 'password is required'
        },
        email: {
            required: true,
            string: true,
            regex: /\w+@successive.tech$/i,
            in: ['body'],
            errorMessage: 'email is required',
        },
        name: {
            required: false,
            string: true,
            in: ['body'],
            regex: /[a-z]+/i,
            errorMessage: 'must be string'
        },
        role: {
            required: false,
            string: true,
            in: ['body'],
            errorMessage: 'must be string'
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
        sort: {
            required: false,
            string: true,
            default: 'originalId',
            in: ['query'],
            errorMessage: 'sort is invalid',
        },
        sortOrder: {
            required: false,
            number: true,
            default: -1,
            in: ['query'],
            errorMessage: 'sortOrder is invalid',
        },
    },
    update: {
        originalId: {
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
