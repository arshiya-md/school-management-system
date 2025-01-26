const studentSchema = [
        {
            path: "classroomId",
            model: "id",
            required: true
        },
        {
            path: "firstName",
            model: "text",
            required: true
        },
        {
            path: "lastName",
            model: "text",
            required: true
        },
        {
            path: "dateOfBirth",
            model: "date",
            required: true
        },
        {
            path: "email",
            model: "email",
            required: true
        },
];

const schoolIdSchema = [
    {
        path: "schoolId",
        model: "id",
        required: true
    },
];
const studentIdSchema = [
    {
        path: "studentId",
        model: "id",
        required: true
    },
];

const newClassroomIdSchema = [
    {
        path: "newClassroomId",
        model: "id",
        required: true
    },
];

module.exports = {
    createStudent: [
        ...schoolIdSchema,
        ...studentSchema
    ],
    updateStudent: [
        ...schoolIdSchema,
        ...studentIdSchema,
        ...studentSchema,
    ],
    transferStudent: [
        ...schoolIdSchema,
        ...studentIdSchema,
        ...newClassroomIdSchema,
    ],
    deleteStudent: [
        ...schoolIdSchema,
        ...studentIdSchema
    ],
    getStudent:  [
        ...schoolIdSchema,
        ...studentIdSchema
    ]
};
