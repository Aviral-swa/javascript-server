import * as mongoose from 'mongoose';
import seedData from './seedData';

class Database {

    public static open(mongoURL) {
        return new Promise((resolve, reject) => {
            const options = {
                useNewUrlParser: true,
                useUnifiedTopology: true
            };
            mongoose.connect(mongoURL, options, (err) => {
                if (err) {
                    return reject(err);
                }
                seedData();
                resolve();
                console.log('Connected to database');
            });

        });
    }
    public static disconnect() {
        mongoose.disconnect();
        console.log('Disconnected');
    }
}

export default Database;
