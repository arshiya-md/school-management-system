const schoolSchema = [
    {
        path: "name",
        model: "title",
        required: true,
    },
    {
        path: "address",
        model: "longText",
        required: true,
    },
    {
        path: "schoolAdminId",
        model: "id",
        required: true,
    },
    {
        path: "contactEmail",
        model: "email",
        required: false,
    },
];

const schoolIdSchema = [
    {
      path: "id",
      model: "id",
      required: true,
    },
];

module.exports = {
    createSchool: schoolSchema,
    updateSchool: [
        ...schoolIdSchema,
        ...schoolSchema,
    ],
    deleteSchool: schoolIdSchema,
    getSchool: schoolIdSchema,
};