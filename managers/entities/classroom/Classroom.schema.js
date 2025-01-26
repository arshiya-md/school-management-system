const classroomSchema = [
    {
        path: 'name',
        model: 'title',
        required: true
    },
    {
        path: 'capacity',
        model: 'number',
        required: true
    },
    {
        path: 'resources',
        model: 'arrayOfStrings',
        required: false
    }
];

const classroomIdSchema = [
    {
        path: 'classroomId',
        model: 'id',
        required: true,
    }
];

const schoolIdSchema = [    
    {
        path: 'schoolId',
        model: 'id',
        required: true,
    }
];

module.exports = {
    createClassroom: [
        ...schoolIdSchema, 
        ...classroomSchema
    ],
    updateClassroom: [
        ...schoolIdSchema,
        ...classroomIdSchema,
        ...classroomSchema,
    ],
    getClassroom: [
        ...schoolIdSchema,
        ...classroomIdSchema
    ],
    deleteClassroom: [
        ...schoolIdSchema,
        ...classroomIdSchema
    ],
};
