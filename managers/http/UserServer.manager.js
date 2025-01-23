const http              = require('http');
const express           = require('express');
const cors              = require('cors');
const app               = express();
// const swaggerUi      = require('swagger-ui-express');
// const swaggerDocs    = require('./../../swaggerdocs.js');
const path              = require('path');
const fs                = require('fs');
const { marked }        = require('marked');

module.exports = class UserServer {
    constructor({config, managers}){
        this.config        = config;
        this.userApi       = managers.userApi;
    }
    
    /** for injecting middlewares */
    use(args){
        app.use(args);
    }

    /** server configs */
    run(){
        app.use(cors({origin: '*'}));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true}));
        app.use('/static', express.static('public'));

        /** an error handler */
        app.use((err, req, res, next) => {
            console.error(err.stack)
            res.status(500).send('Something broke!')
        });

        app.get('/', (req, res) => {
            const filePath = path.join(__dirname, '../../readme.md');

            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    res.status(500).send('Error reading markdown file');
                    return;
                }
                res.send(marked(data));  // Convert markdown to HTML and send
            });
        });
        
        /** a single middleware to handle all */
        app.all('/api/:moduleName/:fnName', this.userApi.mw);

        // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

        let server = http.createServer(app);
        server.listen(this.config.dotEnv.PORT, () => {
            console.log(`${(this.config.dotEnv.SERVICE_NAME).toUpperCase()} is running on port: ${this.config.dotEnv.PORT}`);
        });
    }
}