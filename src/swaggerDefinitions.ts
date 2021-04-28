import * as swaggerdocs from 'swagger-jsdoc';

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            swagger: '2.0',
            description: 'An Express app that Uses mongoose/mongoDB as Database and creates users after authentication then performs CRUD opertsions using various technological operations like pagination, sorting, search etc.',
            version: '1.0.0',
            title: 'Express App',
            contact: {
                email: 'aviral.swarnkar@successive.tech'
            },
            server: ['https://localhost:9000/']
        },
        components: {},
        basePath: '/api'
    },
    apis: ['dist/**/*.js']
};


export default swaggerdocs(swaggerOptions);