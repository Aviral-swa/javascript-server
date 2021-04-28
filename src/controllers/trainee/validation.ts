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
            required: true,
            string: true,
            in: ['body'],
            regex: /[a-z]+/i,
        },
        role: {
            required: false,
            string: true,
            in: ['body'],
            default: 'trainee'
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
            string: true,
            default: 'descending',
            in: ['query'],
            errorMessage: 'sortOrder is invalid',
        },
        searchString: {
            required: false,
            string: true,
            in: ['query'],
        }
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
