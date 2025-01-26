const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'School Management System API',
            version: '1.0.0',
            description: 'An API for managing school system',
        },
        components: {
            securitySchemes: {
                tokenAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'token',
                    description: 'JWT authorization token',
                },
            },
        },
        // security: [
        //     {
        //         tokenAuth: [],
        //     },
        // ],
    },
    apis: ['./swagger/swaggerJSDocs.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerDocs;
