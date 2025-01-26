module.exports = class School {

    constructor({ validators, mongomodels } = {}) {
        this.validators = validators;
        this.SchoolModel = mongomodels.School;
        this.httpExposed = ['post=createSchool', 'put=updateSchool', 'delete=deleteSchool', 'get=getSchool', 'get=getAllSchools'];
    }

    /**
     * Create a new school entry
     * @param {Object} params
     * @param {string} params.name - Name of the school
     * @param {string} params.address - Address of the school
     * @param {string} params.schoolAdminId - SuperAdmin ID associated with the school
     * @param {string} params.contactEmail - Contact email ID
     * @returns {Promise<Object>} - Created school object
     */
    async createSchool({ __token, __superAdmin, name, address, schoolAdminId, contactEmail }) {
        const school = { name, address, schoolAdminId, contactEmail };

        // Validation
        const validationError = await this.validators.School.createSchool(school);  
        if (validationError) return { code: 400, errors: validationError };

        // Creation Logic
        const createdSchool = new this.SchoolModel({
            name,
            address,
            schoolAdminId,
            contactEmail,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await createdSchool.save();

        return {
            code: 201,
            data: createdSchool,
        };
    }

    /**
     * Update an existing school
     * @param {Object} params
     * @param {string} params.id - ID of the school to update
     * @param {Object} params.updates - Fields to update
     * @returns {Promise<Object>} - Updated school object
     */
    async updateSchool({ __token, __superAdmin, id, name, address, schoolAdminId, contactEmail }) {
        const school = { name, address, schoolAdminId, contactEmail };

        // Validation
        const validationError = await this.validators.School.updateSchool({id, ...school});
        if (validationError) return { code: 400, errors: validationError };

        // Update Logic
        const updatedSchool = await this.SchoolModel.findByIdAndUpdate(
            id,
            {
                ...school,
                updatedAt: new Date(),
            },
            { new: true }
        );

        if (!updatedSchool) {
            return {
                code: 404,
                error: 'School not found',
            };
        }

        return {
            data: updatedSchool,
        };
    }

    /**
     * Delete a school by ID
     * @param {Object} params
     * @param {string} params.id - ID of the school to delete
     * @returns {Promise<Object>} - Response object containing status code
     */
    async deleteSchool({ __token, __superAdmin, id }) {
        // Validation
        const validationError = await this.validators.School.deleteSchool({ id });
        if (validationError) return { code: 400, errors: validationError };

        const deletedSchool = await this.SchoolModel.findByIdAndDelete(id);

        if (!deletedSchool) {
            return {
                code: 404,
                error: 'School not found',
            };
        }

        return {
            code: 204
        };
    }

    /**
     * Fetch a single school by ID
     * @param {Object} params
     * @param {string} params.id - ID of the school to fetch
     * @returns {Promise<Object>} - School object
     */
    async getSchool({ __token, __superAdmin, id }) {
        const school = await this.SchoolModel.findById(id);

        if (!school) {
            return {
                code: 404,
                error: 'School not found',
            };
        }

        return {
            data: school,
        };
    }

    /**
     * Fetch all schools
     * @returns {Promise<Array>} - Array of school objects
     */
    async getAllSchools(__token) {
        const schools = await this.SchoolModel.find();
        return {
            data: schools,
        };
    }
};
