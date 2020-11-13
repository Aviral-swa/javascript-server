import { config } from 'dotenv';
config();
const configuration: IConfig = {
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
    secret_key: process.env.SECRET_KEY,
    mongo_url: process.env.MONGO_URL,
    userPassword1: process.env.USER_PASSWORD_1,
    userPassword2: process.env.USER_PASSWORD_2
};
Object.freeze(configuration);
console.log('config is', configuration);
console.log(`config object is frozen: ${Object.isFrozen(configuration)}`);
export default configuration;
