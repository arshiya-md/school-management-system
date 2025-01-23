module.exports = {
    registerUser: {
        userName: {
            required: true,
            type: 'string',
            length: { min: 3, max: 20 },
            custom: 'username'
        },
        email: {
            required: true,
            type: 'string',
            length: { min: 3, max: 100 },
            regex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        },
        password: {
            required: true,
            type: 'string',
            length: { min: 8, max: 100 }
        },
        role: {
            required: true,
            type: 'string',
            regex: /^(super-admin|school-admin)$/
        },
        schoolId: {
            type: 'String',
            length: { min: 1, max: 50 },
            required: false
        }
    },

    loginUser: {
        email: {
            required: true,
            type: 'string',
            length: { min: 3, max: 100 },
            regex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        },
        password: {
            required: true,
            type: 'string',
            length: { min: 8, max: 100 }
        }
    },
}
