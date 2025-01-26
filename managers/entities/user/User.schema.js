const loginSchema = [
    {
        path: "email",
        model: "email",
        required: false,
    },
    {
        path: "password",
        model: "password",
        required: false,
    },
];

const registerSchema = [
    {
        path: "userName",
        model: "username",
        required: true,
    },
    {
        path: "role",
        type: "string",
        regex: /^(super-admin|school-admin)$/
    },
    {
        path: "schoolId",
        model: "id",
        required: false,
    },
];

module.exports = {
    loginUser: loginSchema,
    registerUser: [
        ...loginSchema,
        ...registerSchema,
    ],
};