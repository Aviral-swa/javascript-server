import * as express from 'express';
import * as bodyParser from 'body-parser';
import { errorHandler, notFoundRoute } from './libs/routes';
import routes from './router';
import Database from './libs/database';
import * as swaggerUi from 'swagger-ui-express';
import swaggerDocuments from './swaggerDefinitions';
import * as cors from 'cors';

class Server {
    private app: any;
    constructor(private configuration: IConfig) {
        this.app = express();
    }

    public corsParser() {
        const corsOptions = {
            origin: '*',
            optionsSuccessStatus: 200
          };
        this.app.use(cors(corsOptions));
    }

    public bootstrap() {
        this.corsParser();
        this.initBodyParser();
        this.setupRoutes();
        return this.app;
    }

    public setupRoutes() {
        const { app } = this;

        app.use('/health-check', (req, res) => {
            res.send('I am OK');
        });

        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocuments));

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
