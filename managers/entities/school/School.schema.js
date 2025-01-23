module.exports = {
    createSchool: {
        name: {
            type: 'String',
            length: { min: 3, max: 100 },
            required: true
        },
        address: {
            type: 'String',
            length: { min: 5, max: 250 },
            required: true
        },
        adminId: {
            type: 'String',
            length: { min: 1, max: 50 },
            required: true
        },
        email: {
            type: 'String',
            regex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            required: false
        },
    },
    updateSchool: {
        schoolId: {
            type: 'String',
            length: { min: 1, max: 50 },
            required: true
        },
        updates: {
            type: 'Object',
            required: true,
            schema: {
                name: {
                    type: 'String',
                    length: { min: 3, max: 100 },
                    required: false
                },
                address: {
                    type: 'String',
                    length: { min: 5, max: 250 },
                    required: false
                },
                email: {
                    type: 'String',
                    regex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    required: false
                },
            }
        }
    },
    deleteSchool: {
        schoolId: {
            type: 'String',
            length: { min: 1, max: 50 },
            required: true
        }
    }
}