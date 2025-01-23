module.exports = class School {

    constructor({ utils, cache, config, cortex, managers, validators, mongomodels } = {}) {
        this.config = config;
        // this.cortex = cortex;
        this.validators = validators;
        this.mongomodels = mongomodels;
        this.SchoolModel = this.mongomodels.School;
        this.httpExposed = ['post=createSchool', 'put=updateSchool', 'delete=deleteSchool', 'get=getSchool', 'get=getAllSchools'];
    }

    /**
     * Create a new school entry
     * @param {Object} params
     * @param {string} params.name - Name of the school
     * @param {string} params.address - Address of the school
     * @param {string} params.adminId - Admin ID associated with the school
     * @param {string} params.email - Email ID
     * @returns {Promise<Object>} - Created school object
     */
    async createSchool({ __token, __superAdmin, name, address, adminId, email }) {
        const school = { name, address, adminId, email };

        // Data validation
        const validationError = await this.validators.School.createSchool(school);
        if (validationError) return validationError;

        // Creation Logic
        const createdSchool = new this.SchoolModel({
            name,
            address,
            adminId,
            email,
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await createdSchool.save();

        return {
            school: createdSchool,
        };
    }

    /**
     * Update an existing school
     * @param {Object} params
     * @param {string} params.schoolId - ID of the school to update
     * @param {Object} params.updates - Fields to update
     * @returns {Promise<Object>} - Updated school object
     */
    async updateSchool({ __token, __superAdmin, schoolId, updates }) {
        // Validation
        const validationError = await this.validators.School.updateSchool({ schoolId, updates });
        if (validationError) return validationError;

        // Update Logic
        const updatedSchool = await this.SchoolModel.findByIdAndUpdate(
            schoolId,
            {
                ...updates,
                updatedAt: new Date(),
            },
            { new: true }
        );

        if (!updatedSchool) {
            return {
                error: 'School not found',
            };
        }

        return {
            school: updatedSchool,
        };
    }

    /**
     * Delete a school by ID
     * @param {Object} params
     * @param {string} params.schoolId - ID of the school to delete
     * @returns {Promise<Object>} - Success message
     */
    async deleteSchool({ __token, __superAdmin, schoolId }) {
        // Validation
        const validationError = await this.validators.School.deleteSchool({ schoolId });
        if (validationError) return validationError;

        const deletedSchool = await this.SchoolModel.findByIdAndDelete(schoolId);
        if (!deletedSchool) {
            return {
                error: 'School not found',
            };
        }

        return {
            success: true,
            message: 'School deleted successfully',
        };
    }

    /**
     * Fetch a single school by ID
     * @param {Object} params
     * @param {string} params.schoolId - ID of the school to fetch
     * @returns {Promise<Object>} - School object
     */
    async getSchool({ __token, __superAdmin, schoolId }) {
        const school = await this.SchoolModel.findById(schoolId);

        if (!school) {
            return {
                error: 'School not found',
            };
        }

        return {
            school,
        };
    }

    /**
     * Fetch all schools
     * @returns {Promise<Array>} - Array of school objects
     */
    async getAllSchools(__token, __superAdmin) {
        const schools = await this.SchoolModel.find();
        return {
            schools,
        };
    }
};
