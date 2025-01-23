module.exports = {
    createStudent: {
        schoolId: {
            type: 'String',
            length: { min: 1, max: 50 },
            required: true
        },
        classroomId: {
            type: 'String',
            length: { min: 1, max: 50 },
            required: true
        },
        firstName: {
            type: 'String',
            length: { min: 2, max: 50 },
            required: true
        },
        lastName: {
            type: 'String',
            length: { min: 2, max: 50 },
            required: true
        },
        dateOfBirth: {
            type: 'Date',
            required: true
        },
        email: {
            type: 'String',
            regex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            required: false
        },
    },
    updateStudent: {
        studentId: {
            type: 'String',
            length: { min: 1, max: 50 },
            required: true
        },
        schoolId: {
            type: 'String',
            length: { min: 1, max: 24 },
            required: true
        },
        updates: {
            type: 'Object',
            required: true,
            schema: {
                firstName: {
                    type: 'String',
                    length: { min: 2, max: 50 },
                    required: false
                },
                lastName: {
                    type: 'String',
                    length: { min: 2, max: 50 },
                    required: false
                },
                dateOfBirth: {
                    type: 'Date',
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
    transferStudent: {
        studentId: {
            type: 'String',
            length: { min: 1, max: 50 },
            required: true
        },
        schoolId: {
            type: 'String',
            length: { min: 1, max: 24 },
            required: true
        },
        newClassroomId: {
            type: 'String',
            length: { min: 1, max: 50 },
            required: true
        }
    },
    deleteStudent: {
        studentId: {
            type: 'String',
            length: { min: 1, max: 50 },
            required: true
        },
        schoolId: {
            type: 'String',
            length: { min: 1, max: 24 },
            required: true
        }
    }
}