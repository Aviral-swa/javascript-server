import * as express from 'express';
import * as bodyParser from 'body-parser';
import { errorHandler, notFoundRoute } from './libs/routes';

class Server {
    private app: any;
    constructor(private configuration: IConfig) {
        this.app = express();
    }

    public bootstrap() {
        this.initBodyParser();
        this.setupRoutes();
        return this;
    }

    public setupRoutes() {
        this.app.use('/health-check', (req, res) => {
            res.send('I am OK');
        });

        this.app.use(notFoundRoute);

        this.app.use(errorHandler);

        return this;
    }

    public initBodyParser() {
        this.app.use(bodyParser.json());
    }

    public run() {
        const { port } = this.configuration;
        this.app.listen(port, err => {
            if (err) {
                console.log(`Error: app failed  ${err}`);
            }
            console.log(`app is running on port ${port}`);
        });
        return this;
    }

}
export default Server;
