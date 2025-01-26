module.exports = class Student {
  constructor({ validators, mongomodels } = {}) {
    this.validators = validators.Student;
    this.StudentModel = mongomodels.Student;
    this.httpExposed = ['post=createStudent', 'put=updateStudent', 'delete=deleteStudent', 'get=getStudent', 'get=getAllStudents', 'put=transferStudent'];
  }

  async createStudent({ __token, __schoolAdmin, schoolId, classroomId, firstName, lastName, dateOfBirth, email }) {
    const student = { schoolId, classroomId, firstName, lastName, dateOfBirth, email };

    // Data validation
    const validationError = await this.validators.createStudent(student);
    if (validationError) return { code: 400, errors: validationError };

    // Creation Logic
    const createdStudent = await this.StudentModel.create({
      schoolId,
      classroomId,
      firstName,
      lastName,
      dateOfBirth,
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return { code: 201,
      data: createdStudent
    };
  }

  async updateStudent({ __token, __schoolAdmin, studentId, schoolId, classroomId, firstName, lastName, dateOfBirth, email }) {
    const studentUpdates = { classroomId, firstName, lastName, dateOfBirth, email };
    // Validation
    const validationError = await this.validators.updateStudent({ studentId, schoolId, ...studentUpdates });
    if (validationError) return { code: 400, errors: validationError };

    // Ensure the student belongs to the given schoolId
    const student = await this.StudentModel.findOne({ _id: studentId, schoolId });
    if (!student) {
      return { code: 404, error: 'Student not found or does not belong to the provided school' };
    }

    // Update Logic
    const updatedStudent = await this.StudentModel.findByIdAndUpdate(
      studentId,
      { ...studentUpdates, updatedAt: new Date() },
      { new: true }
    );

    return { data: updatedStudent };
  }

  async transferStudent({ __token, __schoolAdmin, studentId, schoolId, newClassroomId }) {
    // Validation
    const validationError = await this.validators.transferStudent({
      studentId,
      schoolId,
      newClassroomId,
    });
    if (validationError) return { code: 400, errors: validationError };

    // Ensure the student belongs to the given schoolId
    const student = await this.StudentModel.findOne({ _id: studentId, schoolId });
    if (!student) {
      return { code: 404, error: 'Student not found or does not belong to the provided school' };
    }

    // Transfer Logic
    const updatedStudent = await this.StudentModel.findByIdAndUpdate(
      studentId,
      {
        classroomId: newClassroomId,
        transferDate: new Date(),
        updatedAt: new Date(),
      },
      { new: true }
    );

    return { data: updatedStudent };
  }

  async deleteStudent({ __token, __schoolAdmin, studentId, schoolId }) {
    // Validation
    const validationError = await this.validators.deleteStudent({ studentId, schoolId });
    if (validationError) return { code: 400, errors: validationError };

    // Ensure the student belongs to the given schoolId
    const student = await this.StudentModel.findOne({ _id: studentId, schoolId });
    if (!student) {
      return { code:404, error: 'Student not found or does not belong to the provided school' };
    }

    // Delete Logic
    await this.StudentModel.findByIdAndDelete(studentId);

    return { code: 204 };
  }

  /**
   * Fetch a single student by ID
   * @param {Object} params
   * @param {string} params.studentId - ID of the student to fetch
   * @param {string} params.schoolId - ID of the school the student should belong to
   * @returns {Promise<Object>} - Student object
   */
  async getStudent({ __token, __schoolAdmin, studentId, schoolId }) {
    // Ensure the student belongs to the given schoolId
    const student = await this.StudentModel.findOne({ _id: studentId, schoolId });

    if (!student) {
      return { code:404, error: 'Student not found or does not belong to the provided school' };
    }

    return { data: student };
  }

  /**
   * Fetch all students for a specific schoolId
   * @param {string} schoolId - ID of the school
   * @returns {Promise<Array>} - Array of student objects
   */
  async getAllStudents({ __token, __schoolAdmin, schoolId }) {
    // Fetch students that belong to the given schoolId
    const students = await this.StudentModel.find({ schoolId });

    return { data: students };
  }
};
