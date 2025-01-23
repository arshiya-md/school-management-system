module.exports = {
    createClassroom: {
        schoolId: {
            type: 'String',
            length: { min: 1, max: 24 },
            required: true
        },
        name: {
            type: 'String',
            length: { min: 2, max: 50 },
            required: true
        },
        capacity: {
            type: 'Number',
            min: 1,
            required: true
        },
        resources: {
            type: 'Array',
            required: false,
            items: {
                type: 'String'
            }
        }
    },
    updateClassroom: {
        classroomId: {
            type: 'String',
            length: { min: 1, max: 24 },
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
                name: {
                    type: 'String',
                    length: { min: 2, max: 50 },
                    required: false
                },
                capacity: {
                    type: 'Number',
                    min: 1,
                    required: false
                },
                resources: {
                    type: 'Array',
                    required: false,
                    items: {
                        type: 'String'
                    }
                }
            }
        }
    },
    deleteClassroom: {
        classroomId: {
            type: 'String',
            length: { min: 1, max: 24 },
            required: true
        },
        schoolId: {
            type: 'String',
            length: { min: 1, max: 24 },
            required: true
        },
    }
};
