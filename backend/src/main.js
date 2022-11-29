import App from './app.js';
import serverConfig from './configs/server.config.js';
import mongoConfig from './configs/mongo.config.js';
import { MongoDB } from './services/mongo.js';

(async () => {
    console.clear();
    try {
        await MongoDB.connect(mongoConfig.db.uri)
        console.log('Connect to database server  !!');
        const app = App();

        app.listen(serverConfig.port, () => {
            console.log('Server running on ' + 'http://localhost:' + serverConfig.port);
        });
    } catch (error) {
        console.log('Unable to connect to the database:\n', error);
    }

})();