import * as mongoose from 'mongoose';

class Database {

    public static open(mongoURL) {
        return new Promise((resolve, reject) => {
            console.log('inside open method');
            mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(undefined);
                console.log('connected to database');
            });

        });
    }
    public static disconnect() {
        console.log('Disconnected');
        mongoose.disconnect();
    }
}

export default Database;