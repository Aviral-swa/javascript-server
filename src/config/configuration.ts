import { config } from 'dotenv';
config();
const configuration: IConfig = {
    port: process.env.port,
    node_env: process.env.node_env,
    secret_key: process.env.secret_key
};
Object.freeze(configuration);
console.log('config is', configuration);
console.log(`config object is frozen: ${Object.isFrozen(configuration)}`);
export default configuration;
