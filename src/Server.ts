import * as express from 'express';

class Server {
    private app: any;
    constructor(private configuration: IConfig) {
        this.app = express();
    }

    bootstrap() {
        this.setupRoutes();
        return this;
    }

    setupRoutes() {
        this.app.get('/health-check', (req, res, next) => {
            res.send('I am OK');
        });
        return this;
    }

    run() {
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
