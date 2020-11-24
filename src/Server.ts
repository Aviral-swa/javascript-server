import * as express from 'express';
import * as bodyParser from 'body-parser';
import { errorHandler, notFoundRoute } from './libs/routes';
import routes from './router';
import Database from './libs/database';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerdocs from 'swagger-jsdoc';
const swaggerdoc = require('../swaggerOptions');



// const swaggerOptions = {
//     swaggerDefinition: {
//         info: {
//             openapi: '3.0.0',
//             description: 'An Express app that Uses mongoose/mongoDB as Database and creates users after authentication then performs CRUD opertsions using various technological operations like pagination, sorting, search etc.',
//             version: '1.0.0',
//             title: 'Express App',
//             contact: {
//                 email: 'aviral.swarnkar@successive.tech'
//             },
//             server: ['https://localhost:9000/'],
//             tags: {
//                 name: 'trainee',
//                 description: 'Performs CRUD operations on trainees',
//                 // name: 'user',
//                 // description: Authorization and Authentication
//             }
//         }
//     },
//     apis: ['server.ts']
// };


// const swaggerDocumentes = swaggerdocs(swaggerOptions);
// console.log(swaggerDocumentes);

class Server {
    private app: any;
    constructor(private configuration: IConfig) {
        this.app = express();
    }

    public bootstrap() {
        this.initBodyParser();
        this.setupRoutes();
        return this.app;
    }

    public setupRoutes() {
        const { app } = this;

        app.use('/health-check', (req, res) => {
            res.send('I am OK');
        });

        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerdoc));

        app.use('/api', routes);

        app.use(notFoundRoute);

        app.use(errorHandler);

    }

    public initBodyParser() {
        const { app } = this;
        app.use(bodyParser.json());
    }

    public run() {
        const { port, mongo_url} = this.configuration;
        Database.open(mongo_url)
            .then((res) => {
                this.app.listen(port, err => {
                    if (err) {
                        console.log(`Error: app failed  ${err}`);
                    }
                    console.log(`app is running on port ${port}`);
                });
            })
            .catch((err) => {
            console.log(err);
            });


        return this;
    }

}
export default Server;
