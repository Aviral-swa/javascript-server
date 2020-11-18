import { config } from 'dotenv';
config();
const configuration: IConfig = {
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
    secret_key: process.env.SECRET_KEY,
    mongo_url: process.env.MONGO_URL,
    traineePassword: process.env.TRAINEE_PASSWORD,
    trainerPassword: process.env.TRAINER_PASSWORD
};
Object.freeze(configuration);
console.log('config is', configuration);
console.log(`config object is frozen: ${Object.isFrozen(configuration)}`);
export default configuration;
