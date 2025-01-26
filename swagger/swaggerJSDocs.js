/**
 * @swagger
 * /api/user/registerUser:
 *   post:
 *     tags:
 *       - User
 *     summary: Register a new user
 *     description: Create a new user account with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - email
 *               - password
 *               - role
 *             properties:
 *               userName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum:
 *                   - super-admin
 *                   - school-admin
 *               schoolId:
 *                 type: string
 *                 nullable: true
 *           example:
 *             userName: "John Doe"
 *             email: "john.doe@example.com"
 *             password: "strongPassword123"
 *             role: "school-admin"
 *             schoolId: "61a8b06f2e9b56b8e8d90f7a"
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                 longToken:
 *                   type: string
 *             example:
 *               user:
 *                 userName: "John Doe"
 *                 email: "john.doe@example.com"
 *                 role: "super-admin"
 *                 schoolId: "61a8b06f2e9b56b8e8d90f7a"
 *               longToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Validation error or user already exists.
 */

/**
 * @swagger
 * /api/user/loginUser:
 *   get:
 *     tags:
 *       - User
 *     summary: Log in a user
 *     description: Authenticate a user and generate a long token for session management.
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         example: "john.doe@example.com"
 *       - in: query
 *         name: password
 *         required: true
 *         schema:
 *           type: string
 *         example: "strongPassword123"
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 longToken:
 *                   type: string
 *             example:
 *               longToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Invalid credentials.
 *       404:
 *         description: User not found.
 */

/**
 * @swagger
 * /api/school/createSchool:
 *   post:
 *     tags:
 *       - School
 *     summary: Create a new school entry
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Greenwood High School"
 *               address:
 *                 type: string
 *                 example: "123 Main St, Springfield"
 *               schoolAdminId:
 *                 type: string
 *                 example: "61a8b06f2e9b56b8e8d90f7b"
 *               contactEmail:
 *                 type: string
 *                 example: "contact@greenwood.edu"
 *     responses:
 *       201:
 *         description: Created school object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 code: 201
 *                 data:
 *                   id: "61a8b06f2e9b56b8e8d90f7a"
 *                   name: "Greenwood High School"
 *                   address: "123 Main St, Springfield"
 *                   schoolAdminId: "61a8b06f2e9b56b8e8d90f7b"
 *                   contactEmail: "contact@greenwood.edu"
 *                   createdAt: "2025-01-01T10:00:00Z"
 *                   updatedAt: "2025-01-01T10:00:00Z"
 */

/**
 * @swagger
 * /api/school/updateSchool:
 *   put:
 *     tags:
 *       - School
 *     summary: Update an existing school
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "61a8b06f2e9b56b8e8d90f7a"
 *               name:
 *                 type: string
 *                 example: "Greenwood High School Updated"
 *               address:
 *                 type: string
 *                 example: "456 Elm St, Springfield"
 *               schoolAdminId:
 *                 type: string
 *                 example: "61a8b06f2e9b56b8e8d90f7b"
 *               contactEmail:
 *                 type: string
 *                 example: "newcontact@greenwood.edu"
 *     responses:
 *       200:
 *         description: Updated school object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 data:
 *                   id: "61a8b06f2e9b56b8e8d90f7a"
 *                   name: "Greenwood High School Updated"
 *                   address: "456 Elm St, Springfield"
 *                   schoolAdminId: "61a8b06f2e9b56b8e8d90f7b"
 *                   contactEmail: "newcontact@greenwood.edu"
 *                   updatedAt: "2025-01-01T12:00:00Z"
 */

/**
 * @swagger
 * /api/school/deleteSchool:
 *   delete:
 *     tags:
 *       - School
 *     summary: Delete a school by ID
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           example: "61a8b06f2e9b56b8e8d90f7a"
 *     responses:
 *       204:
 *         description: School deleted successfully
 *       404:
 *         description: School not found
 */

/**
 * @swagger
 * /api/school/getSchool:
 *   get:
 *     tags:
 *       - School
 *     summary: Fetch a single school by ID
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           example: "61a8b06f2e9b56b8e8d90f7a"
 *     responses:
 *       200:
 *         description: School object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 data:
 *                   id: "61a8b06f2e9b56b8e8d90f7a"
 *                   name: "Greenwood High School"
 *                   address: "123 Main St, Springfield"
 *                   schoolAdminId: "61a8b06f2e9b56b8e8d90f7b"
 *                   contactEmail: "contact@greenwood.edu"
 *                   createdAt: "2025-01-01T10:00:00Z"
 *                   updatedAt: "2025-01-01T10:00:00Z"
 *       404:
 *         description: School not found
 */

/**
 * @swagger
 * /api/school/getAllSchools:
 *   get:
 *     tags:
 *       - School
 *     summary: Fetch all schools
 *     security:
 *       - tokenAuth: []
 *     responses:
 *       200:
 *         description: Array of school objects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 data:
 *                   - id: "61a8b06f2e9b56b8e8d90f7a"
 *                     name: "Greenwood High School"
 *                     address: "123 Main St, Springfield"
 *                     schoolAdminId: "61a8b06f2e9b56b8e8d90f7b"
 *                     contactEmail: "contact@greenwood.edu"
 *                     createdAt: "2025-01-01T10:00:00Z"
 *                     updatedAt: "2025-01-01T10:00:00Z"
 *                   - id: "61a8b06f2e9b56b8e8d90f7c"
 *                     name: "Blue Valley School"
 *                     address: "789 Pine St, Springfield"
 *                     schoolAdminId: "61a8b06f2e9b56b8e8d90f7b"
 *                     contactEmail: "contact@bluevalley.edu"
 *                     createdAt: "2025-01-02T10:00:00Z"
 *                     updatedAt: "2025-01-02T10:00:00Z"
 */
/**
 * @swagger
 * /api/classroom/createClassroom:
 *   post:
 *     tags:
 *       - Classroom
 *     summary: Create a new classroom
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               schoolId:
 *                 type: string
 *                 example: "64d10e1234567890abcd1234"
 *               name:
 *                 type: string
 *                 example: "Physics Lab"
 *               capacity:
 *                 type: number
 *                 example: 40
 *               resources:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Projector", "Whiteboard"]
 *     responses:
 *       201:
 *         description: Classroom created successfully
 */

/**
 * @swagger
 * /api/classroom/updateClassroom:
 *   put:
 *     tags:
 *       - Classroom
 *     summary: Update an existing classroom
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               classroomId:
 *                 type: string
 *                 example: "64d10e1234567890abcd5678"
 *               schoolId:
 *                 type: string
 *                 example: "64d10e1234567890abcd1234"
 *               name:
 *                 type: string
 *                 example: "Updated Physics Lab"
 *               capacity:
 *                 type: number
 *                 example: 50
 *               resources:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Smartboard", "3D Printer"]
 *     responses:
 *       200:
 *         description: Classroom updated successfully
 */

/**
 * @swagger
 * /api/classroom/deleteClassroom:
 *   delete:
 *     tags:
 *       - Classroom
 *     summary: Delete a classroom
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: query
 *         name: classroomId
 *         required: true
 *         schema:
 *           type: string
 *           example: "64d10e1234567890abcd5678"
 *       - in: query
 *         name: schoolId
 *         required: true
 *         schema:
 *           type: string
 *           example: "64d10e1234567890abcd1234"
 *     responses:
 *       204:
 *         description: Classroom deleted successfully
 */

/**
 * @swagger
 * /api/classroom/getClassroom:
 *   get:
 *     tags:
 *       - Classroom
 *     summary: Fetch a classroom by ID
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: query
 *         name: classroomId
 *         required: true
 *         schema:
 *           type: string
 *           example: "64d10e1234567890abcd5678"
 *       - in: query
 *         name: schoolId
 *         required: true
 *         schema:
 *           type: string
 *           example: "64d10e1234567890abcd1234"
 *     responses:
 *       200:
 *         description: Classroom fetched successfully
 */

/**
 * @swagger
 * /api/classroom/getAllClassrooms:
 *   get:
 *     tags:
 *       - Classroom
 *     summary: Fetch all classrooms for a specific school
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: query
 *         name: schoolId
 *         required: true
 *         schema:
 *           type: string
 *           example: "64d10e1234567890abcd1234"
 *     responses:
 *       200:
 *         description: Classrooms fetched successfully
 */

/**
 * @swagger
 * /api/student/createStudent:
 *   post:
 *     tags:
 *       - Student
 *     summary: Create a new student
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               schoolId:
 *                 type: string
 *                 example: "64d10e1234567890abcd1234"
 *               classroomId:
 *                 type: string
 *                 example: "64d10e1234567890abcd5678"
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: "2005-08-15"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *     responses:
 *       201:
 *         description: Student created successfully
 */

/**
 * @swagger
 * /api/student/updateStudent:
 *   put:
 *     tags:
 *       - Student
 *     summary: Update an existing student
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *                 example: "64d10e1234567890abcd9012"
 *               schoolId:
 *                 type: string
 *                 example: "64d10e1234567890abcd1234"
 *               classroomId:
 *                 type: string
 *                 example: "64d10e1234567890abcd5678"
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Smith"
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: "2005-08-15"
 *               email:
 *                 type: string
 *                 example: "john.smith@example.com"
 *     responses:
 *       200:
 *         description: Student updated successfully
 */

/**
 * @swagger
 * /api/student/transferStudent:
 *   put:
 *     tags:
 *       - Student
 *     summary: Transfer a student to a new classroom
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *                 example: "64d10e1234567890abcd9012"
 *               schoolId:
 *                 type: string
 *                 example: "64d10e1234567890abcd1234"
 *               newClassroomId:
 *                 type: string
 *                 example: "64d10e1234567890abcd6789"
 *     responses:
 *       200:
 *         description: Student transferred successfully
 */

/**
 * @swagger
 * /api/student/deleteStudent:
 *   delete:
 *     tags:
 *       - Student
 *     summary: Delete a student
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: query
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *           example: "64d10e1234567890abcd9012"
 *       - in: query
 *         name: schoolId
 *         required: true
 *         schema:
 *           type: string
 *           example: "64d10e1234567890abcd1234"
 *     responses:
 *       204:
 *         description: Student deleted successfully
 */

/**
 * @swagger
 * /api/student/getStudent:
 *   get:
 *     tags:
 *       - Student
 *     summary: Fetch a student by ID
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: query
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *           example: "64d10e1234567890abcd9012"
 *       - in: query
 *         name: schoolId
 *         required: true
 *         schema:
 *           type: string
 *           example: "64d10e1234567890abcd1234"
 *     responses:
 *       200:
 *         description: Student fetched successfully
 */

/**
 * @swagger
 * /api/student/getAllStudents:
 *   get:
 *     tags:
 *       - Student
 *     summary: Fetch all students for a specific school
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: query
 *         name: schoolId
 *         required: true
 *         schema:
 *           type: string
 *           example: "64d10e1234567890abcd1234"
 *     responses:
 *       200:
 *         description: Students fetched successfully
 */
