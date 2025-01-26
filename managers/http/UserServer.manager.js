const http              = require('http');
const express           = require('express');
const cors              = require('cors');
const app               = express();
const swaggerUi         = require('swagger-ui-express');
const swaggerDocs       = require('../../swagger/swaggerDocs');

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
        
        /** a single middleware to handle all */
        app.all('/api/:moduleName/:fnName', this.userApi.mw);

        /** Redirect root to Swagger UI */
        app.get('/', (req, res) => {
            res.redirect('/api-docs');
        });

        /** Serve Swagger UI */
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

        let server = http.createServer(app);
        server.listen(this.config.dotEnv.PORT, () => {
            console.log(`${(this.config.dotEnv.SERVICE_NAME).toUpperCase()} is running on port: ${this.config.dotEnv.PORT}`);
        });
    }
}
