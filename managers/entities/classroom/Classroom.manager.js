module.exports = class Classroom {
  constructor({ validators, mongomodels } = {}) {
    this.validators = validators.Classroom;
    this.ClassroomModel = mongomodels.Classroom;
    this.httpExposed = ['post=createClassroom', 'put=updateClassroom', 'delete=deleteClassroom', 'get=getClassroom', 'get=getAllClassrooms'];
  }

  async createClassroom({ __token, __schoolAdmin, schoolId, name, capacity, resources }) {
    const classroom = { schoolId, name, capacity, resources };

    // Data validation
    const validationError = await this.validators.createClassroom(classroom);
    if (validationError) return { code: 400, errors: validationError };

    // Creation Logic
    const createdClassroom = await this.ClassroomModel.create({
      schoolId,
      name,
      capacity,
      resources,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return {
      code: 201,
      data: createdClassroom
    };
  }

  async updateClassroom({ __token, __schoolAdmin, classroomId, schoolId, name, capacity, resources }) {
    const classroomInput = { name, capacity, resources };

    // Validation
    const validationError = await this.validators.updateClassroom({ classroomId, schoolId, ...classroomInput });
    if (validationError) return { code: 400, errors: validationError };

    // Ensure the classroom belongs to the given schoolId
    const classroom = await this.ClassroomModel.findOne({ _id: classroomId, schoolId });
    if (!classroom) {
      return { 
        code: 404,
        error: 'Classroom not found or does not belong to the provided school' };
    }

    // Update Logic
    const updatedClassroom = await this.ClassroomModel.findByIdAndUpdate(
      classroomId,
      { ...classroomInput, updatedAt: new Date() },
      { new: true }
    );

    return { data: updatedClassroom };
  }

  async deleteClassroom({ __token, __schoolAdmin, classroomId, schoolId }) {
    // Validation
    const validationError = await this.validators.deleteClassroom({ classroomId, schoolId });
    if (validationError) return { code: 400, errors: validationError };

    // Ensure the classroom belongs to the given schoolId
    const classroom = await this.ClassroomModel.findOne({ _id: classroomId, schoolId });
    if (!classroom) {
      return { code: 404,
        error: 'Classroom not found or does not belong to the provided school' 
      };
    }

    // Delete Logic
    await this.ClassroomModel.findByIdAndDelete(classroomId);

    return { code: 204 };
  }

  /**
   * Fetch a single classroom by ID
   * @param {Object} params
   * @param {string} params.classroomId - ID of the classroom to fetch
   * @param {string} params.schoolId - ID of the school the classroom should belong to
   * @returns {Promise<Object>} - Classroom object
   */
  async getClassroom({ __token, __schoolAdmin, classroomId, schoolId }) {
    // Ensure the classroom belongs to the given schoolId
    const classroom = await this.ClassroomModel.findOne({ _id: classroomId, schoolId });

    if (!classroom) {
      return { 
        code: 404,
        error: 'Classroom not found or does not belong to the provided school' 
      };
    }

    return { data: classroom };
  }

  /**
   * Fetch all classrooms for a specific schoolId
   * @param {string} schoolId - ID of the school
   * @returns {Promise<Array>} - Array of classroom objects
   */
  async getAllClassrooms({ __token, __schoolAdmin, schoolId }) {
    // Fetch classrooms that belong to the given schoolId
    const classrooms = await this.ClassroomModel.find({ schoolId });

    return { data: classrooms };
  }
};
