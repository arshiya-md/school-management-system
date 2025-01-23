module.exports = class Student {
  constructor({ utils, cache, config, cortex, managers, validators, mongomodels } = {}) {
    this.config = config;
    // this.cortex = cortex;
    this.validators = validators.Student;
    this.StudentModel = mongomodels.Student;
    this.httpExposed = ['post=createStudent', 'put=updateStudent', 'delete=deleteStudent', 'get=getStudent', 'get=getAllStudents', 'put=transferStudent'];
  }

  async createStudent({ __token, __schoolAdmin, schoolId, classroomId, firstName, lastName, dateOfBirth, email }) {
    const student = { schoolId, classroomId, firstName, lastName, dateOfBirth, email };

    // Data validation
    const validationError = await this.validators.createStudent(student);
    if (validationError) return validationError;

    // Creation Logic
    const createdStudent = await this.StudentModel.create({
      schoolId,
      classroomId,
      firstName,
      lastName,
      dateOfBirth,
      email,
      status: 'enrolled',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return { student: createdStudent };
  }

  async updateStudent({ __token, __schoolAdmin, studentId, schoolId, updates }) {
    // Validation
    const validationError = await this.validators.updateStudent({ studentId, updates });
    if (validationError) return validationError;

    // Ensure the student belongs to the given schoolId
    const student = await this.StudentModel.findOne({ _id: studentId, schoolId });
    if (!student) {
      return { error: 'Student not found or does not belong to the provided school' };
    }

    // Update Logic
    const updatedStudent = await this.StudentModel.findByIdAndUpdate(
      studentId,
      { ...updates, updatedAt: new Date() },
      { new: true }
    );

    return { student: updatedStudent };
  }

  async transferStudent({ __token, __schoolAdmin, studentId, schoolId, newClassroomId }) {
    // Validation
    const validationError = await this.validators.transferStudent({
      studentId,
      newClassroomId,
    });
    if (validationError) return validationError;

    // Ensure the student belongs to the given schoolId
    const student = await this.StudentModel.findOne({ _id: studentId, schoolId });
    if (!student) {
      return { error: 'Student not found or does not belong to the provided school' };
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

    return { student: updatedStudent, message: 'Student transferred successfully' };
  }

  async deleteStudent({ __token, __schoolAdmin, studentId, schoolId }) {
    // Validation
    const validationError = await this.validators.deleteStudent({ studentId });
    if (validationError) return validationError;

    // Ensure the student belongs to the given schoolId
    const student = await this.StudentModel.findOne({ _id: studentId, schoolId });
    if (!student) {
      return { error: 'Student not found or does not belong to the provided school' };
    }

    // Delete Logic
    await this.StudentModel.findByIdAndDelete(studentId);

    return { success: true, message: 'Student deleted successfully' };
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
      return { error: 'Student not found or does not belong to the provided school' };
    }

    return { student };
  }

  /**
   * Fetch all students for a specific schoolId
   * @param {string} schoolId - ID of the school
   * @returns {Promise<Array>} - Array of student objects
   */
  async getAllStudents({ __token, __schoolAdmin, schoolId }) {
    // Fetch students that belong to the given schoolId
    const students = await this.StudentModel.find({ schoolId });

    return { students };
  }
};
