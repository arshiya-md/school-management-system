const bcrypt = require('bcrypt');
module.exports = class User { 

    constructor({utils, cache, config, cortex, managers, validators, mongomodels }={}){
        this.config              = config;
        this.cortex              = cortex;
        this.validators          = validators.User; 
        this.userModel           = mongomodels.User;
        this.tokenManager        = managers.token;
        this.usersCollection     = "users";
        this.httpExposed         = ['post=registerUser','get=loginUser'];
    }

    async registerUser({userName, email, password, role, schoolId}){
        const user = {userName, email, password, role, schoolId};

        // Data validation
        let result = await this.validators.registerUser(user);
        if(result) return result;

        // Check if user already exists
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            return {
                error: 'User already exists'
            };
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const createdUser = await this.userModel.create({
            email,
            password: hashedPassword,
            userName,
            role,
            schoolId
        });

        // Generate token
        let longToken = this.tokenManager.genLongToken({userId: createdUser._id, userRole: createdUser.role, schoolId: createdUser.schoolId });
        
        return {
            user: createdUser, 
            longToken 
        };     

    }

    async loginUser({ email, password }) {

            const user = await this.userModel.findOne({ email });

            if (!user) {
                return {
                    error: 'User not found'
                };
            }

            // Verify password
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return {
                    error: 'Invalid password'
                };
            }

            // Generate token
            let longToken = this.tokenManager.genLongToken({ userId: user._id, userRole: user.role, schoolId: user.schoolId });
            
            return {
                longToken 
            };

    }

}
